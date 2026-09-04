'use client';

import styles from '@/public/assets/scss/admin/admin.module.scss';
import PostForm from '@/components/admin/PostForm';

export default function NewArticlePage() {
    return (
        <div>
            <h1 className={styles.pageTitle}>Nouvel article</h1>
            <PostForm />
        </div>
    );
}
