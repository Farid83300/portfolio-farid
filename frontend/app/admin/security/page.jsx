'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { startRegistration } from '@simplewebauthn/browser';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch, decodeToken, getToken, setTokens } from '@/lib/adminApi';

export default function AdminSecurityPage() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(null);
    const [setupData, setSetupData] = useState(null);
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [code, setCode] = useState('');
    const [enablePassword, setEnablePassword] = useState('');
    const [password, setPassword] = useState('');
    const [disableCode, setDisableCode] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [changeCode, setChangeCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [passkeys, setPasskeys] = useState([]);
    const [passkeyName, setPasskeyName] = useState('');
    const [passkeyPassword, setPasskeyPassword] = useState('');
    const [passkeyBusy, setPasskeyBusy] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deletePassword, setDeletePassword] = useState('');

    useEffect(() => {
        adminFetch('/admin/2fa/status')
            .then((data) => {
                setEnabled(data.enabled);
                if (data.enabled && decodeToken(getToken())?.scope !== 'setup_2fa') {
                    return loadPasskeys();
                }
            })
            .finally(() => setLoading(false));
    }, []);

    async function loadPasskeys() {
        const data = await adminFetch('/admin/passkeys');
        setPasskeys(data.passkeys);
    }

    async function handleAddPasskey(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        setPasskeyBusy(true);
        try {
            const opts = await adminFetch('/admin/passkeys/options', {
                method: 'POST',
                body: JSON.stringify({ password: passkeyPassword }),
            });
            const credential = await startRegistration({ optionsJSON: opts.options.publicKey });
            await adminFetch('/admin/passkeys', {
                method: 'POST',
                body: JSON.stringify({
                    challenge_id: opts.challenge_id,
                    credential,
                    name: passkeyName,
                }),
            });
            setPasskeyName('');
            setPasskeyPassword('');
            await loadPasskeys();
            setSuccess('Passkey ajoutée. Elle sera proposée à la prochaine connexion.');
        } catch (err) {
            setError(
                err?.name === 'NotAllowedError' || err?.name === 'InvalidStateError'
                    ? 'Enregistrement annulé, ou cette passkey existe déjà sur cet appareil.'
                    : err.message
            );
        } finally {
            setPasskeyBusy(false);
        }
    }

    async function handleDeletePasskey(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await adminFetch(`/admin/passkeys/${deleteTarget}`, {
                method: 'DELETE',
                body: JSON.stringify({ password: deletePassword }),
            });
            setDeleteTarget(null);
            setDeletePassword('');
            await loadPasskeys();
            setSuccess('Passkey supprimée.');
        } catch (err) {
            setError(err.message);
        }
    }

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
            setTokens(data.token, data.refresh_token);
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

    async function handleChangePassword(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await adminFetch('/admin/change-password', {
                method: 'PUT',
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    code: changeCode,
                }),
            });
            setCurrentPassword('');
            setNewPassword('');
            setChangeCode('');
            setSuccess('Mot de passe modifié. Les autres sessions ont été déconnectées.');
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
            <h1 className={styles.pageTitle}>Sécurité / 2FA / Passkeys</h1>

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
                        <p
                            className={styles.loginHint}
                            style={{ textAlign: 'left', marginBottom: 20 }}
                        >
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
                        <p
                            className={styles.loginHint}
                            style={{ textAlign: 'left', marginBottom: 20 }}
                        >
                            Le 2FA n&apos;est pas encore activé sur ce compte.
                        </p>
                        <button type="button" className={styles.btn} onClick={startSetup}>
                            Activer le 2FA
                        </button>
                    </>
                )}
            </div>

            {enabled && !forcedSetup && (
                <div className={styles.card} style={{ marginTop: 24 }}>
                    <div className={styles.cardTitle}>
                        Passkeys (méthode de connexion principale)
                    </div>
                    <p className={styles.loginHint} style={{ textAlign: 'left', marginBottom: 20 }}>
                        À la connexion, après le mot de passe, votre passkey (Touch ID, Windows
                        Hello, clé de sécurité…) est demandée en priorité. Le code Google
                        Authenticator reste disponible en secours.
                    </p>

                    {passkeys.length > 0 && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                            {passkeys.map((pk) => (
                                <li
                                    key={pk.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '10px 0',
                                        borderBottom: '1px solid var(--background-color-4)',
                                    }}
                                >
                                    <span>
                                        <strong>{pk.name}</strong>
                                        <br />
                                        <small className={styles.hint}>
                                            Ajoutée le{' '}
                                            {new Date(
                                                pk.created_at.replace(' ', 'T')
                                            ).toLocaleDateString('fr-FR')}
                                            {pk.last_used_at
                                                ? ` · utilisée le ${new Date(pk.last_used_at.replace(' ', 'T')).toLocaleDateString('fr-FR')}`
                                                : ' · jamais utilisée'}
                                        </small>
                                    </span>
                                    <button
                                        type="button"
                                        className={`${styles.btn} ${styles.btnDanger}`}
                                        onClick={() => {
                                            setDeleteTarget(pk.id);
                                            setDeletePassword('');
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {deleteTarget && (
                        <form
                            className={styles.form}
                            onSubmit={handleDeletePasskey}
                            style={{ marginBottom: 24 }}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="deletePasskeyPassword">
                                    Mot de passe pour confirmer la suppression
                                </label>
                                <input
                                    id="deletePasskeyPassword"
                                    type="password"
                                    className={styles.input}
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button
                                    type="submit"
                                    className={`${styles.btn} ${styles.btnDanger}`}
                                >
                                    Confirmer la suppression
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnGhost}`}
                                    onClick={() => setDeleteTarget(null)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}

                    <form className={styles.form} onSubmit={handleAddPasskey}>
                        <div className={styles.formGroup}>
                            <label htmlFor="passkeyName">Nom de la passkey</label>
                            <input
                                id="passkeyName"
                                className={styles.input}
                                placeholder="MacBook, iPhone, YubiKey…"
                                value={passkeyName}
                                onChange={(e) => setPasskeyName(e.target.value)}
                                maxLength={100}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="passkeyPassword">
                                Mot de passe de connexion à l&apos;admin (celui que vous tapez sur
                                la page de login)
                            </label>
                            <input
                                id="passkeyPassword"
                                type="password"
                                className={styles.input}
                                value={passkeyPassword}
                                onChange={(e) => setPasskeyPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.btn} disabled={passkeyBusy}>
                            {passkeyBusy ? 'En attente de la passkey…' : 'Ajouter une passkey'}
                        </button>
                    </form>
                </div>
            )}

            {enabled && !forcedSetup && (
                <div className={styles.card} style={{ marginTop: 24 }}>
                    <div className={styles.cardTitle}>Changer le mot de passe</div>
                    <form className={styles.form} onSubmit={handleChangePassword}>
                        <div className={styles.formGroup}>
                            <label htmlFor="currentPassword">Mot de passe actuel</label>
                            <input
                                id="currentPassword"
                                type="password"
                                className={styles.input}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="newPassword">
                                Nouveau mot de passe (12 caractères minimum)
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                className={styles.input}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength={12}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="changeCode">Code 2FA actuel</label>
                            <input
                                id="changeCode"
                                className={styles.input}
                                value={changeCode}
                                onChange={(e) => setChangeCode(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.btn}>
                            Changer le mot de passe
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
