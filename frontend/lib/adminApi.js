const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const TOKEN_KEY = 'admin_token';
export const REFRESH_TOKEN_KEY = 'admin_refresh_token';

export function getToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

// SÉCURITÉ: l'access token (courte durée de vie, 30 min) et le refresh token
// (rotatif, révocable côté serveur au logout) sont stockés ensemble — voir
// lib/adminApi.js plus bas pour le rafraîchissement automatique. Un cookie
// httpOnly serait plus robuste face au XSS, mais backend (o2switch) et frontend
// (Vercel) sont sur des domaines différents : un cookie cross-site fiable
// demanderait SameSite=None + Secure partout, plus fragile à mal configurer
// qu'un token à courte durée de vie + rotation. Ce compromis limite la fenêtre
// d'exploitation d'un vol de token à 30 min max pour l'access token.
export function setTokens(token, refreshToken) {
    window.localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
        window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
}

export function setToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// SÉCURITÉ: une seule requête de rafraîchissement à la fois — si plusieurs appels
// API échouent en 401 en même temps (ex: plusieurs widgets du dashboard), ils
// partagent la même promesse au lieu de déclencher plusieurs rotations concurrentes
// du refresh token (qui s'invalideraient mutuellement, l'un des deux perdant la course).
let refreshPromise = null;

async function attemptRefresh() {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return false;

        try {
            const res = await fetch(`${API_URL}/admin/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (!res.ok) return false;

            const data = await res.json();
            setTokens(data.token, data.refresh_token);
            return true;
        } catch {
            return false;
        }
    })();

    try {
        return await refreshPromise;
    } finally {
        refreshPromise = null;
    }
}

function redirectToLogin() {
    clearToken();
    if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
    }
}

async function rawFetch(path, options) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${path}`, { ...options, headers });
}

export async function adminFetch(path, options = {}) {
    let res = await rawFetch(path, options);

    // SÉCURITÉ: un 401 déclenche une tentative de rafraîchissement transparent via
    // le refresh token avant de considérer la session comme morte — évite de
    // déconnecter l'utilisateur toutes les 30 min pendant qu'il travaille activement.
    if (res.status === 401) {
        const refreshed = await attemptRefresh();
        if (refreshed) {
            res = await rawFetch(path, options);
        }
    }

    if (res.status === 401) {
        redirectToLogin();
        throw new Error('Non autorisé');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
    }

    return data;
}

export async function adminUploadFile(file, dir) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dir', dir);

    async function attempt() {
        const token = getToken();
        return fetch(`${API_URL}/admin/uploads`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
        });
    }

    let res = await attempt();

    if (res.status === 401) {
        const refreshed = await attemptRefresh();
        if (refreshed) {
            res = await attempt();
        }
    }

    if (res.status === 401) {
        redirectToLogin();
        throw new Error('Non autorisé');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.error || "Échec de l'upload");
    }

    return data;
}

export async function adminDeleteFile(path) {
    if (!path) return;
    try {
        await adminFetch('/admin/uploads', {
            method: 'DELETE',
            body: JSON.stringify({ path }),
        });
    } catch {
        // Le fichier n'existait peut-être déjà plus côté serveur — jamais bloquant pour l'UI.
    }
}

// SÉCURITÉ: logout réel — révoque les refresh tokens côté serveur (voir
// backend AuthController::logout) au lieu de se contenter d'effacer le
// stockage local, qui laisserait le refresh token utilisable par quiconque
// l'aurait déjà exfiltré.
export async function logout() {
    try {
        await adminFetch('/admin/logout', { method: 'POST' });
    } catch {
        // Best-effort : on efface le stockage local même si l'appel réseau échoue.
    }
    clearToken();
}

export function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export { API_URL };
