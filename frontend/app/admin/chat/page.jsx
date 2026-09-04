'use client';

import { useEffect, useState } from 'react';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function AdminChatPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        adminFetch('/admin/chat-messages')
            .then(setMessages)
            .finally(() => setLoading(false));
    }

    useEffect(load, []);

    async function markRead(id) {
        await adminFetch(`/admin/chat-messages/${id}/read`, { method: 'PUT' });
        load();
    }

    async function remove(id) {
        if (!confirm('Supprimer ce message ?')) return;
        await adminFetch(`/admin/chat-messages/${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Messages Chat</h1>
            <div className={styles.card}>
                {loading ? (
                    <div className={styles.loading}>Chargement…</div>
                ) : messages.length === 0 ? (
                    <div className={styles.emptyState}>Aucun message pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Reçu le</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.name}</td>
                                    <td>{m.email}</td>
                                    <td style={{ maxWidth: 320 }}>{m.message}</td>
                                    <td>{new Date(m.created_at).toLocaleString('fr-FR')}</td>
                                    <td>
                                        <span
                                            className={`${styles.badge} ${m.read_at ? styles.badgeApproved : styles.badgePending}`}
                                        >
                                            {m.read_at ? 'Lu' : 'Non lu'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {!m.read_at && (
                                                <button
                                                    className={`${styles.btn} ${styles.btnGhost}`}
                                                    onClick={() => markRead(m.id)}
                                                >
                                                    Marquer lu
                                                </button>
                                            )}
                                            <button
                                                className={`${styles.btn} ${styles.btnDanger}`}
                                                onClick={() => remove(m.id)}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
