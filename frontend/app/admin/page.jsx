'use client';

import { useEffect, useState } from 'react';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function AdminDashboardPage() {
    const [counts, setCounts] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([adminFetch('/admin/dashboard'), adminFetch('/admin/messages')])
            .then(([countsData, messagesData]) => {
                setCounts(countsData);
                setMessages(messagesData.slice(0, 5));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className={styles.loading}>Chargement…</div>;
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Dashboard</h1>

            <div className={styles.statGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{counts?.messages_count ?? 0}</div>
                    <div className={styles.statLabel}>Messages Contact</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{counts?.chat_messages_count ?? 0}</div>
                    <div className={styles.statLabel}>Messages Chat</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{counts?.newsletter_count ?? 0}</div>
                    <div className={styles.statLabel}>Abonnés Newsletter</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{counts?.comments_pending_count ?? 0}</div>
                    <div className={styles.statLabel}>Commentaires Blog</div>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.cardTitle}>Messages de Contact</div>
                {messages.length === 0 ? (
                    <div className={styles.emptyState}>Aucun message pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Sujet</th>
                                <th>Reçu le</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.name}</td>
                                    <td>{m.email}</td>
                                    <td>{m.subject || '—'}</td>
                                    <td>{new Date(m.created_at).toLocaleString('fr-FR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
