'use client';

import { useEffect, useState } from 'react';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        adminFetch('/admin/newsletter')
            .then(setSubscribers)
            .finally(() => setLoading(false));
    }

    useEffect(load, []);

    async function remove(id) {
        if (!confirm('Supprimer cet abonné ?')) return;
        await adminFetch(`/admin/newsletter/${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Newsletter</h1>
            <div className={styles.card}>
                {loading ? (
                    <div className={styles.loading}>Chargement…</div>
                ) : subscribers.length === 0 ? (
                    <div className={styles.emptyState}>Aucun abonné pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Inscrit le</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.email}</td>
                                    <td>{new Date(s.subscribed_at).toLocaleString('fr-FR')}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={`${styles.btn} ${styles.btnDanger}`}
                                                onClick={() => remove(s.id)}
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
