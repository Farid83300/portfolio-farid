'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function AdminServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        adminFetch('/admin/services')
            .then(setServices)
            .finally(() => setLoading(false));
    }

    useEffect(load, []);

    async function remove(id) {
        if (!confirm('Supprimer ce service ?')) return;
        await adminFetch(`/admin/services/${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>
                    Services
                </h1>
                <Link href="/admin/services/new" className={styles.btn}>
                    Nouveau service
                </Link>
            </div>
            <div className={styles.card}>
                {loading ? (
                    <div className={styles.loading}>Chargement…</div>
                ) : services.length === 0 ? (
                    <div className={styles.emptyState}>Aucun service pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <colgroup>
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '90px' }} />
                            <col style={{ width: '60px' }} />
                            <col style={{ width: '60px' }} />
                            <col style={{ width: '140px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Slug</th>
                                <th>Statut</th>
                                <th>Ordre</th>
                                <th>Vues</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.title}</td>
                                    <td>{s.slug}</td>
                                    <td>
                                        <span
                                            className={`${styles.badge} ${
                                                s.status === 'published'
                                                    ? styles.badgeApproved
                                                    : styles.badgePending
                                            }`}
                                        >
                                            {s.status === 'published' ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td>{s.sort_order}</td>
                                    <td>{s.views_count}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/admin/services/${s.id}/edit`}
                                                className={styles.actionLink}
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                className={styles.actionLinkDanger}
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
