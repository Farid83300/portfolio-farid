'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { startAuthentication } from '@simplewebauthn/browser';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { API_URL, setTokens } from '@/lib/adminApi';

export default function AdminLoginPage() {
    return (
        <Suspense fallback={null}>
            <AdminLoginForm />
        </Suspense>
    );
}

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idleLogout = searchParams.get('reason') === 'idle';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    // 'passkey' : seconde étape par passkey (méthode principale) ; 'totp' : code Google
    // Authenticator (secours, ou seule méthode tant qu'aucune passkey n'est enregistrée).
    const [stage, setStage] = useState(null);
    const [passkeyData, setPasskeyData] = useState(null);
    const requireCode = stage === 'totp';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function runPasskey(data) {
        setError('');
        setLoading(true);
        try {
            const credential = await startAuthentication({ optionsJSON: data.options.publicKey });
            const res = await fetch(`${API_URL}/admin/passkey/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ challenge_id: data.challenge_id, credential }),
            });
            const result = await res.json();
            if (!res.ok) {
                setError(result.error || 'Passkey invalide');
                setLoading(false);
                return;
            }
            setTokens(result.token, result.refresh_token);
            router.push('/admin');
        } catch {
            // Annulé par l'utilisateur ou pas de passkey disponible sur cet appareil.
            setError('Passkey non validée. Réessayez ou utilisez un code 2FA.');
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (stage === 'passkey') {
            runPasskey(passkeyData);
            return;
        }
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requireCode ? { email, password, code } : { email, password }),
            });
            const data = await res.json();

            if (res.status === 401 && data.require_2fa) {
                if (data.passkey) {
                    setPasskeyData(data.passkey);
                    setStage('passkey');
                    runPasskey(data.passkey);
                } else {
                    setStage('totp');
                    setLoading(false);
                }
                return;
            }

            if (!res.ok) {
                setError(data.error || 'Identifiants invalides');
                setLoading(false);
                return;
            }

            setTokens(data.token, data.refresh_token);
            router.push(data.setup_2fa_required ? '/admin/security' : '/admin');
        } catch {
            setError('Impossible de contacter le serveur');
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.loginCard} onSubmit={handleSubmit}>
                <div className={styles.loginTitle}>Admin Portfolio</div>
                {idleLogout && !error && (
                    <div className={styles.loginHint}>
                        Déconnecté(e) automatiquement après 60 minutes d&apos;inactivité.
                    </div>
                )}
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={stage !== null}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={stage !== null}
                    />
                </div>
                {stage === 'passkey' && (
                    <div className={styles.loginHint}>
                        Validez avec votre passkey (Touch ID, Windows Hello, clé de sécurité…).
                    </div>
                )}
                {requireCode && (
                    <div className={styles.formGroup}>
                        <label htmlFor="code">Code 2FA (Google Authenticator)</label>
                        <input
                            id="code"
                            className={styles.input}
                            type="text"
                            inputMode="numeric"
                            autoFocus
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className={styles.btn} disabled={loading}>
                    {loading
                        ? 'Connexion…'
                        : stage === 'passkey'
                          ? 'Utiliser ma passkey'
                          : 'Se connecter'}
                </button>
                {stage === 'passkey' && (
                    <button
                        type="button"
                        className={`${styles.btn} ${styles.btnGhost}`}
                        onClick={() => {
                            setError('');
                            setStage('totp');
                        }}
                    >
                        Utiliser un code 2FA à la place
                    </button>
                )}
                <Link href="/" className={styles.loginHint}>
                    ← Retour à l&apos;accueil
                </Link>
            </form>
        </div>
    );
}
