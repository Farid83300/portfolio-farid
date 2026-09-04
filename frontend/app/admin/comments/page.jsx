'use client';

import { useEffect, useState } from 'react';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

const badgeClass = {
    pending: 'badgePending',
    approved: 'badgeApproved',
    rejected: 'badgeRejected',
};

export default function AdminCommentsPage() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        adminFetch('/admin/comments')
            .then(setComments)
            .finally(() => setLoading(false));
    }

    useEffect(load, []);

    async function updateStatus(id, status) {
        await adminFetch(`/admin/comments/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
        load();
    }

    async function remove(id) {
        if (!confirm('Supprimer ce commentaire ?')) return;
        await adminFetch(`/admin/comments/${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Commentaires Blog</h1>
            <div className={styles.card}>
                {loading ? (
                    <div className={styles.loading}>Chargement…</div>
                ) : comments.length === 0 ? (
                    <div className={styles.emptyState}>Aucun commentaire pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Auteur</th>
                                <th>Commentaire</th>
                                <th>Article</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((c) => (
                                <tr key={c.id}>
                                    <td>
                                        {c.author_name}
                                        <br />
                                        <small>{c.author_email}</small>
                                    </td>
                                    <td style={{ maxWidth: 320 }}>{c.content}</td>
                                    <td>#{c.post_id}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[badgeClass[c.status]]}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {c.status !== 'approved' && (
                                                <button
                                                    className={`${styles.btn} ${styles.btnGhost}`}
                                                    onClick={() => updateStatus(c.id, 'approved')}
                                                >
                                                    Approuver
                                                </button>
                                            )}
                                            {c.status !== 'rejected' && (
                                                <button
                                                    className={`${styles.btn} ${styles.btnGhost}`}
                                                    onClick={() => updateStatus(c.id, 'rejected')}
                                                >
                                                    Rejeter
                                                </button>
                                            )}
                                            <button
                                                className={`${styles.btn} ${styles.btnDanger}`}
                                                onClick={() => remove(c.id)}
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
