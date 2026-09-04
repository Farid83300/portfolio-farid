'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function PostForm({ post }) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [content, setContent] = useState(post?.content || '');
    const [coverImage, setCoverImage] = useState(post?.cover_image || '');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const payload = { title, slug, content, cover_image: coverImage || null };

            if (post) {
                await adminFetch(`/admin/posts/${post.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await adminFetch('/admin/posts', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }

            router.push('/admin/articles');
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formGroup}>
                <label htmlFor="title">Titre</label>
                <input
                    id="title"
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="slug">Slug</label>
                <input
                    id="slug"
                    className={styles.input}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="cover">Image de couverture (URL)</label>
                <input
                    id="cover"
                    className={styles.input}
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">Contenu</label>
                <textarea
                    id="content"
                    className={styles.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={styles.btn} disabled={saving}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
        </form>
    );
}
