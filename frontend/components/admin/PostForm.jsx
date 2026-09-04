'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch, adminUploadFile, API_URL } from '@/lib/adminApi';

export default function PostForm({ post }) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [content, setContent] = useState(post?.content || '');
    const [status, setStatus] = useState(post?.status || 'draft');
    const [publishedAt, setPublishedAt] = useState(
        post?.published_at ? post.published_at.slice(0, 16).replace(' ', 'T') : ''
    );
    const [categoryId, setCategoryId] = useState(post?.category_id || '');
    const [tagIds, setTagIds] = useState((post?.tags || []).map((t) => t.id));
    const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '');
    const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featured_image_alt || '');
    const [metaTitle, setMetaTitle] = useState(post?.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(post?.meta_description || '');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newTag, setNewTag] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        adminFetch('/admin/categories').then(setCategories).catch(() => {});
        adminFetch('/admin/tags').then(setTags).catch(() => {});
    }, []);

    function toggleTag(id) {
        setTagIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
    }

    async function addCategory() {
        if (!newCategory.trim()) return;
        const category = await adminFetch('/admin/categories', {
            method: 'POST',
            body: JSON.stringify({ name: newCategory.trim() }),
        });
        setCategories((prev) => [...prev, category]);
        setCategoryId(category.id);
        setNewCategory('');
    }

    async function addTag() {
        if (!newTag.trim()) return;
        const tag = await adminFetch('/admin/tags', {
            method: 'POST',
            body: JSON.stringify({ name: newTag.trim() }),
        });
        setTags((prev) => [...prev, tag]);
        setTagIds((prev) => [...prev, tag.id]);
        setNewTag('');
    }

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const { path } = await adminUploadFile(file, 'articles');
            setFeaturedImage(path);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const payload = {
                title,
                slug,
                excerpt: excerpt || null,
                content,
                status,
                published_at: publishedAt ? publishedAt.replace('T', ' ') + ':00' : null,
                category_id: categoryId || null,
                tag_ids: tagIds,
                featured_image: featuredImage || null,
                featured_image_alt: featuredImageAlt || null,
                meta_title: metaTitle || null,
                meta_description: metaDescription || null,
            };

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
        <form className={styles.formLayout} onSubmit={handleSubmit}>
            <div className={styles.formMain}>
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Contenu</div>
                    <div className={styles.form} style={{ maxWidth: 'none' }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Titre *</label>
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
                                placeholder="Laisser vide pour générer automatiquement"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="excerpt">Chapo / Extrait</label>
                            <textarea
                                id="excerpt"
                                className={styles.textarea}
                                style={{ minHeight: 80 }}
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Contenu (HTML) *</label>
                            <textarea
                                id="content"
                                className={styles.textarea}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>SEO</div>
                    <div className={styles.form} style={{ maxWidth: 'none' }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="metaTitle">Meta title</label>
                            <input
                                id="metaTitle"
                                className={styles.input}
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="metaDescription">Meta description</label>
                            <textarea
                                id="metaDescription"
                                className={styles.textarea}
                                style={{ minHeight: 80 }}
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className={styles.btn} disabled={saving} style={{ alignSelf: 'flex-start' }}>
                    {saving ? 'Enregistrement…' : post ? "Mettre à jour l'article" : "Créer l'article"}
                </button>
            </div>

            <div className={styles.formAside}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Publication</div>
                    <div className={styles.formGroup}>
                        <label htmlFor="status">Statut</label>
                        <select
                            id="status"
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                            <option value="archived">Archivé</option>
                        </select>
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="publishedAt">Date de publication</label>
                        <input
                            id="publishedAt"
                            type="datetime-local"
                            className={styles.input}
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Catégorie</div>
                    <select
                        className={styles.select}
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">— Aucune —</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <div className={styles.inlineAdd} style={{ marginTop: 10 }}>
                        <input
                            className={styles.input}
                            placeholder="Nouvelle catégorie"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={addCategory}>
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Tags</div>
                    <div className={styles.checkboxGrid}>
                        {tags.map((tag) => (
                            <label key={tag.id} className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    checked={tagIds.includes(tag.id)}
                                    onChange={() => toggleTag(tag.id)}
                                />
                                {tag.name}
                            </label>
                        ))}
                    </div>
                    <div className={styles.inlineAdd} style={{ marginTop: 10 }}>
                        <input
                            className={styles.input}
                            placeholder="Nouveau tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                        />
                        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={addTag}>
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Image de couverture</div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    {uploading && <div className={styles.hint}>Envoi en cours…</div>}
                    {featuredImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={`${API_URL}/uploads/${featuredImage}`}
                            alt="Aperçu"
                            className={styles.imagePreview}
                        />
                    )}
                    <div className={styles.formGroup} style={{ marginTop: 10 }}>
                        <label htmlFor="alt">Texte alternatif</label>
                        <input
                            id="alt"
                            className={styles.input}
                            value={featuredImageAlt}
                            onChange={(e) => setFeaturedImageAlt(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
