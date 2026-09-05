'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch, decodeToken, getToken, setToken } from '@/lib/adminApi';

export default function AdminSecurityPage() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(null);
    const [setupData, setSetupData] = useState(null);
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [code, setCode] = useState('');
    const [enablePassword, setEnablePassword] = useState('');
    const [password, setPassword] = useState('');
    const [disableCode, setDisableCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminFetch('/admin/2fa/status')
            .then((data) => setEnabled(data.enabled))
            .finally(() => setLoading(false));
    }, []);

    async function startSetup() {
        setError('');
        try {
            const data = await adminFetch('/admin/2fa/setup', { method: 'POST' });
            setSetupData(data);
            const url = await QRCode.toDataURL(data.otpauth_url);
            setQrDataUrl(url);
        } catch (err) {
            setError(err.message);
        }
    }

    async function confirmEnable(e) {
        e.preventDefault();
        setError('');
        try {
            const data = await adminFetch('/admin/2fa/enable', {
                method: 'POST',
                body: JSON.stringify({ code, password: enablePassword }),
            });
            setToken(data.token);
            setEnabled(true);
            setSetupData(null);
            setEnablePassword('');
            setSuccess('2FA activé avec succès.');
            router.push('/admin');
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDisable(e) {
        e.preventDefault();
        setError('');
        try {
            await adminFetch('/admin/2fa/disable', {
                method: 'POST',
                body: JSON.stringify({ password, code: disableCode }),
            });
            setEnabled(false);
            setPassword('');
            setDisableCode('');
            setSuccess('2FA désactivé.');
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) {
        return <div className={styles.loading}>Chargement…</div>;
    }

    const payload = decodeToken(getToken());
    const forcedSetup = payload?.scope === 'setup_2fa';

    return (
        <div>
            <h1 className={styles.pageTitle}>Sécurité / 2FA</h1>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {forcedSetup && (
                <div className={styles.card} style={{ marginBottom: 24 }}>
                    <div className={styles.loginHint}>
                        L&apos;activation du 2FA est obligatoire avant d&apos;accéder au reste du
                        dashboard.
                    </div>
                </div>
            )}

            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    Authentification à deux facteurs (Google Authenticator)
                </div>

                {enabled && !forcedSetup ? (
                    <>
                        <p className={styles.loginHint} style={{ textAlign: 'left', marginBottom: 20 }}>
                            Le 2FA est actuellement activé sur ce compte.
                        </p>
                        <form className={styles.form} onSubmit={handleDisable}>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    id="password"
                                    type="password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="disableCode">Code 2FA actuel</label>
                                <input
                                    id="disableCode"
                                    className={styles.input}
                                    value={disableCode}
                                    onChange={(e) => setDisableCode(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className={`${styles.btn} ${styles.btnDanger}`}>
                                Désactiver le 2FA
                            </button>
                        </form>
                    </>
                ) : setupData ? (
                    <form className={styles.form} onSubmit={confirmEnable}>
                        <p className={styles.loginHint} style={{ textAlign: 'left' }}>
                            Scanne ce QR code avec Google Authenticator (ou une app compatible),
                            puis saisis le code à 6 chiffres pour confirmer.
                        </p>
                        {qrDataUrl && (
                            <div className={styles.qrWrap}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={qrDataUrl} alt="QR code 2FA" width={200} height={200} />
                            </div>
                        )}
                        <div className={styles.secretText}>{setupData.secret}</div>
                        <div className={styles.formGroup}>
                            <label htmlFor="enablePassword">Mot de passe</label>
                            <input
                                id="enablePassword"
                                type="password"
                                className={styles.input}
                                value={enablePassword}
                                onChange={(e) => setEnablePassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="code">Code de confirmation</label>
                            <input
                                id="code"
                                className={styles.input}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.btn}>
                            Confirmer et activer
                        </button>
                    </form>
                ) : (
                    <>
                        <p className={styles.loginHint} style={{ textAlign: 'left', marginBottom: 20 }}>
                            Le 2FA n&apos;est pas encore activé sur ce compte.
                        </p>
                        <button type="button" className={styles.btn} onClick={startSetup}>
                            Activer le 2FA
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
