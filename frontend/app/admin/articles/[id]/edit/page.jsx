'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import PostForm from '@/components/admin/PostForm';
import { adminFetch } from '@/lib/adminApi';

export default function EditArticlePage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminFetch(`/admin/posts/${id}`)
            .then(setPost)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Chargement…</div>;
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Modifier l&apos;article</h1>
            <PostForm post={post} />
        </div>
    );
}
