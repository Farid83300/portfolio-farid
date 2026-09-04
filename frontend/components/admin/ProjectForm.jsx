'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch } from '@/lib/adminApi';

export default function ProjectForm({ project }) {
    const router = useRouter();
    const [title, setTitle] = useState(project?.title || '');
    const [slug, setSlug] = useState(project?.slug || '');
    const [description, setDescription] = useState(project?.description || '');
    const [imageUrl, setImageUrl] = useState(project?.image_url || '');
    const [link, setLink] = useState(project?.link || '');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const payload = {
                title,
                slug,
                description,
                image_url: imageUrl || null,
                link: link || null,
            };

            if (project) {
                await adminFetch(`/admin/projects/${project.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await adminFetch('/admin/projects', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }

            router.push('/admin/projects');
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
                <label htmlFor="image">Image (URL)</label>
                <input
                    id="image"
                    className={styles.input}
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="link">Lien du projet</label>
                <input
                    id="link"
                    className={styles.input}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className={styles.textarea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={styles.btn} disabled={saving}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
        </form>
    );
}
