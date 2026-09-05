'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { adminFetch, adminUploadFile, API_URL } from '@/lib/adminApi';

function sectionsToForm(sections) {
    return (sections || []).map((section) => ({
        heading: section.heading || '',
        paragraphs: (section.paragraphs || []).join('\n'),
    }));
}

export default function ServiceForm({ service }) {
    const router = useRouter();
    const [title, setTitle] = useState(service?.title || '');
    const [slug, setSlug] = useState(service?.slug || '');
    const [status, setStatus] = useState(service?.status || 'draft');
    const [icon, setIcon] = useState(service?.icon || '');
    const [description, setDescription] = useState(service?.description || '');
    const [sections, setSections] = useState(sectionsToForm(service?.sections));
    const [sortOrder, setSortOrder] = useState(service?.sort_order ?? 0);
    const [image, setImage] = useState(service?.image || '');
    const [imageAlt, setImageAlt] = useState(service?.image_alt || '');
    const [metaTitle, setMetaTitle] = useState(service?.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(service?.meta_description || '');

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    async function handleImageUpload(file) {
        setUploading(true);
        try {
            const { path } = await adminUploadFile(file, 'services');
            setImage(path);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    }

    function addSection() {
        setSections((prev) => [...prev, { heading: '', paragraphs: '' }]);
    }

    function updateSection(index, field, value) {
        setSections((prev) =>
            prev.map((section, i) => (i === index ? { ...section, [field]: value } : section))
        );
    }

    function removeSection(index) {
        setSections((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const payload = {
                title,
                slug,
                status,
                icon: icon || null,
                description: description || null,
                sections: sections
                    .map((section) => ({
                        heading: section.heading.trim(),
                        paragraphs: section.paragraphs
                            .split('\n')
                            .map((p) => p.trim())
                            .filter(Boolean),
                    }))
                    .filter((section) => section.heading || section.paragraphs.length),
                image: image || null,
                image_alt: imageAlt || null,
                meta_title: metaTitle || null,
                meta_description: metaDescription || null,
                sort_order: Number(sortOrder) || 0,
            };

            if (service) {
                await adminFetch(`/admin/services/${service.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await adminFetch('/admin/services', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }

            router.push('/admin/services');
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
                            <label htmlFor="description">
                                Description (résumé sur la liste + introduction de la page détail)
                            </label>
                            <textarea
                                id="description"
                                className={styles.textarea}
                                style={{ minHeight: 100 }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Contenu de la page détail</div>
                    <div className={styles.form} style={{ maxWidth: 'none', gap: 24 }}>
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    paddingBottom: 16,
                                    borderBottom: '1px solid var(--background-color-4)',
                                }}
                            >
                                <div className={styles.formGroup}>
                                    <label htmlFor={`section-heading-${index}`}>
                                        Titre de la section
                                    </label>
                                    <input
                                        id={`section-heading-${index}`}
                                        className={styles.input}
                                        value={section.heading}
                                        onChange={(e) =>
                                            updateSection(index, 'heading', e.target.value)
                                        }
                                        placeholder="Ex : Ce que comprend ce service"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor={`section-paragraphs-${index}`}>
                                        Paragraphes (un par ligne)
                                    </label>
                                    <textarea
                                        id={`section-paragraphs-${index}`}
                                        className={styles.textarea}
                                        style={{ minHeight: 100 }}
                                        value={section.paragraphs}
                                        onChange={(e) =>
                                            updateSection(index, 'paragraphs', e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnDanger}`}
                                    style={{ alignSelf: 'flex-start' }}
                                    onClick={() => removeSection(index)}
                                >
                                    Supprimer cette section
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.btnGhost}`}
                            style={{ alignSelf: 'flex-start' }}
                            onClick={addSection}
                        >
                            + Ajouter une section
                        </button>
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

                <button
                    type="submit"
                    className={styles.btn}
                    disabled={saving}
                    style={{ alignSelf: 'flex-start' }}
                >
                    {saving ? 'Enregistrement…' : service ? 'Mettre à jour le service' : 'Créer le service'}
                </button>
            </div>

            <div className={styles.formAside}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Métadonnées</div>
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
                        </select>
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="icon">Icône (classe Font Awesome)</label>
                        <input
                            id="icon"
                            className={styles.input}
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            placeholder="Ex : fa-solid fa-code"
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
                    <div className={styles.cardTitle}>Image</div>
                    <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                    />
                    {uploading && <div className={styles.hint}>Envoi en cours…</div>}
                    {image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={`${API_URL}/uploads/${image}`}
                            alt={imageAlt || ''}
                            className={styles.imagePreview}
                        />
                    )}
                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                        <label htmlFor="imageAlt">Texte alternatif</label>
                        <input
                            id="imageAlt"
                            className={styles.input}
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
