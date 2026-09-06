'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { adminFetch, decodeToken, getToken } from '@/lib/adminApi';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const [counts, setCounts] = useState({});

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setReady(true);
            return;
        }

        const token = getToken();
        if (!token) {
            router.replace('/admin/login');
            return;
        }

        const payload = decodeToken(token);
        if (payload?.scope === 'setup_2fa' && pathname !== '/admin/security') {
            router.replace('/admin/security');
            return;
        }

        setReady(true);

        if (payload?.scope === 'full') {
            const markViewed =
                pathname === '/admin/newsletter'
                    ? adminFetch('/admin/newsletter/mark-viewed', { method: 'PUT' }).catch(() => {})
                    : Promise.resolve();

            markViewed.then(() => adminFetch('/admin/dashboard').then(setCounts).catch(() => {}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!ready) {
        return <div className={styles.loading}>Chargement…</div>;
    }

    return (
        <div className={styles.page}>
            <AdminSidebar counts={counts} />
            <main className={styles.content}>{children}</main>
        </div>
    );
}
