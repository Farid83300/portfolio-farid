'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import ProjectForm from '@/components/admin/ProjectForm';
import { adminFetch } from '@/lib/adminApi';

export default function EditProjectPage() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminFetch(`/admin/projects/${id}`)
            .then(setProject)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Chargement…</div>;
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Modifier le projet</h1>
            <ProjectForm project={project} />
        </div>
    );
}
