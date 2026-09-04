'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function AdminArticlesPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        adminFetch('/admin/posts')
            .then(setPosts)
            .finally(() => setLoading(false));
    }

    useEffect(load, []);

    async function remove(id) {
        if (!confirm('Supprimer cet article ?')) return;
        await adminFetch(`/admin/posts/${id}`, { method: 'DELETE' });
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
                    Articles
                </h1>
                <Link href="/admin/articles/new" className={styles.btn}>
                    Nouvel article
                </Link>
            </div>
            <div className={styles.card}>
                {loading ? (
                    <div className={styles.loading}>Chargement…</div>
                ) : posts.length === 0 ? (
                    <div className={styles.emptyState}>Aucun article pour le moment.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Slug</th>
                                <th>Publié le</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.title}</td>
                                    <td>{p.slug}</td>
                                    <td>
                                        {p.published_at
                                            ? new Date(p.published_at).toLocaleDateString('fr-FR')
                                            : '—'}
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/admin/articles/${p.id}/edit`}
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
