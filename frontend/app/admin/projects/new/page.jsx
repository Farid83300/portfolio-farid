'use client';

import styles from '@/public/assets/scss/admin/admin.module.scss';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div>
            <h1 className={styles.pageTitle}>Nouveau projet</h1>
            <ProjectForm />
        </div>
    );
}
