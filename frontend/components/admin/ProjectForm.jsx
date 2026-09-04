'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch, adminUploadFile, API_URL } from '@/lib/adminApi';

export default function ProjectForm({ project }) {
    const router = useRouter();
    const [title, setTitle] = useState(project?.title || '');
    const [slug, setSlug] = useState(project?.slug || '');
    const [subtitle, setSubtitle] = useState(project?.subtitle || '');
    const [category, setCategory] = useState(project?.category || '');
    const [client, setClient] = useState(project?.client || '');
    const [role, setRole] = useState(project?.role || '');
    const [projectDate, setProjectDate] = useState(project?.project_date || '');
    const [tags, setTags] = useState(project?.tags || '');
    const [description, setDescription] = useState(project?.description || '');
    const [features, setFeatures] = useState((project?.features || []).join('\n'));
    const [liveUrl, setLiveUrl] = useState(project?.live_url || '');
    const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 0);
    const [thumbnail, setThumbnail] = useState(project?.thumbnail || '');
    const [coverImage, setCoverImage] = useState(project?.cover_image || '');
    const [gallery, setGallery] = useState(project?.gallery || []);
    const [metaTitle, setMetaTitle] = useState(project?.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(project?.meta_description || '');

    const [uploading, setUploading] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    async function uploadTo(setter, dir, file) {
        setUploading(dir);
        try {
            const { path } = await adminUploadFile(file, dir);
            setter(path);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading('');
        }
    }

    async function handleGalleryUpload(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setUploading('projects/gallery');
        try {
            const uploaded = [];
            for (const file of files) {
                const { path } = await adminUploadFile(file, 'projects/gallery');
                uploaded.push({ image: path, alt: '' });
            }
            setGallery((prev) => [...prev, ...uploaded]);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading('');
        }
    }

    function removeGalleryItem(index) {
        setGallery((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const payload = {
                title,
                slug,
                subtitle: subtitle || null,
                category: category || null,
                client: client || null,
                role: role || null,
                project_date: projectDate || null,
                tags: tags || null,
                description: description || null,
                features: features
                    .split('\n')
                    .map((f) => f.trim())
                    .filter(Boolean),
                thumbnail: thumbnail || null,
                cover_image: coverImage || null,
                live_url: liveUrl || null,
                gallery,
                meta_title: metaTitle || null,
                meta_description: metaDescription || null,
                sort_order: Number(sortOrder) || 0,
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
        <form className={styles.formLayout} onSubmit={handleSubmit}>
            <div className={styles.formMain}>
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Informations principales</div>
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
                            <label htmlFor="subtitle">Sous-titre</label>
                            <input
                                id="subtitle"
                                className={styles.input}
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder='Ex : "Development Coaches"'
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description (HTML autorisé)</label>
                            <textarea
                                id="description"
                                className={styles.textarea}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="features">Points forts (un par ligne)</label>
                            <textarea
                                id="features"
                                className={styles.textarea}
                                style={{ minHeight: 100 }}
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
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
                    {saving ? 'Enregistrement…' : project ? 'Mettre à jour le projet' : 'Créer le projet'}
                </button>
            </div>

            <div className={styles.formAside}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Métadonnées projet</div>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Catégorie</label>
                        <input
                            id="category"
                            className={styles.input}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Ex : "Web Design", "App Development"'
                        />
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="client">Client</label>
                        <input
                            id="client"
                            className={styles.input}
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="role">Rôle / poste</label>
                        <input
                            id="role"
                            className={styles.input}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="projectDate">Date du projet</label>
                        <input
                            id="projectDate"
                            type="date"
                            className={styles.input}
                            value={projectDate || ''}
                            onChange={(e) => setProjectDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="tags">Tags (séparés par virgule)</label>
                        <input
                            id="tags"
                            className={styles.input}
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="PHP, MySQL, SEO"
                        />
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="liveUrl">URL Live Preview</label>
                        <input
                            id="liveUrl"
                            className={styles.input}
                            value={liveUrl}
                            onChange={(e) => setLiveUrl(e.target.value)}
                            placeholder="https://exemple.com"
                        />
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="sortOrder">Ordre d&apos;affichage</label>
                        <input
                            id="sortOrder"
                            type="number"
                            className={styles.input}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Vignette (liste portfolio)</div>
                    <input
                        type="file"
                        accept="image/*"
                        disabled={uploading === 'projects'}
                        onChange={(e) => e.target.files[0] && uploadTo(setThumbnail, 'projects', e.target.files[0])}
                    />
                    {uploading === 'projects' && <div className={styles.hint}>Envoi en cours…</div>}
                    {thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`${API_URL}/uploads/${thumbnail}`} alt="Vignette" className={styles.imagePreview} />
                    )}
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Image de couverture (page détail)</div>
                    <input
                        type="file"
                        accept="image/*"
                        disabled={uploading === 'projects'}
                        onChange={(e) => e.target.files[0] && uploadTo(setCoverImage, 'projects', e.target.files[0])}
                    />
                    {coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={`${API_URL}/uploads/${coverImage}`}
                            alt="Couverture"
                            className={styles.imagePreview}
                        />
                    )}
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Galerie (swiper)</div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={uploading === 'projects/gallery'}
                        onChange={handleGalleryUpload}
                    />
                    {uploading === 'projects/gallery' && <div className={styles.hint}>Envoi en cours…</div>}
                    {gallery.length > 0 && (
                        <div className={styles.galleryGrid}>
                            {gallery.map((item, i) => (
                                <div key={i} className={styles.galleryItem}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.alt || ''} />
                                    <button
                                        type="button"
                                        className={styles.galleryRemove}
                                        onClick={() => removeGalleryItem(i)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
