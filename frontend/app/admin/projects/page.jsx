'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        adminFetch('/admin/projects')
            .then(setProjects)
            .finally(() => setLoading(false));
    }

    useEffect(load, []);

    async function remove(id) {
        if (!confirm('Supprimer ce projet ?')) return;
        await adminFetch(`/admin/projects/${id}`, { method: 'DELETE' });
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
                    Projets
                </h1>
                <Link href="/admin/projects/new" className={styles.btn}>
                    Nouveau projet
                </Link>
            </div>
            <div className={styles.card}>
                {loading ? (
                    <div className={styles.loading}>Chargement…</div>
                ) : projects.length === 0 ? (
                    <div className={styles.emptyState}>Aucun projet pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Slug</th>
                                <th>Lien</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.title}</td>
                                    <td>{p.slug}</td>
                                    <td>{p.link || '—'}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/admin/projects/${p.id}/edit`}
                                                className={`${styles.btn} ${styles.btnGhost}`}
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                className={`${styles.btn} ${styles.btnDanger}`}
                                                onClick={() => remove(p.id)}
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
