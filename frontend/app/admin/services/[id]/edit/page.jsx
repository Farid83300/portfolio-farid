'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import ServiceForm from '@/components/admin/ServiceForm';
import { adminFetch } from '@/lib/adminApi';

export default function EditServicePage() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminFetch(`/admin/services/${id}`)
            .then(setService)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Chargement…</div>;
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Modifier le service</h1>
            <ServiceForm service={service} />
        </div>
    );
}
