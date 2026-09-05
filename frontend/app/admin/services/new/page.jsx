'use client';

import styles from '@/public/assets/scss/admin/admin.module.scss';
import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
    return (
        <div>
            <h1 className={styles.pageTitle}>Nouveau service</h1>
            <ServiceForm />
        </div>
    );
}
