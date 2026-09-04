const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const TOKEN_KEY = 'admin_token';

export function getToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    window.localStorage.removeItem(TOKEN_KEY);
}

export async function adminFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        clearToken();
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
        }
        throw new Error('Non autorisé');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
    }

    return data;
}

export async function adminUploadFile(file, dir) {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dir', dir);

    const res = await fetch(`${API_URL}/admin/uploads`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });

    if (res.status === 401) {
        clearToken();
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
        }
        throw new Error('Non autorisé');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.error || "Échec de l'upload");
    }

    return data;
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
