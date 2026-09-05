'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { clearToken } from '@/lib/adminApi';

export default function AdminSidebar({ counts = {} }) {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const links = [
        { href: '/admin', label: 'Dashboard', exact: true },
        { href: '/admin/messages', label: 'Messages Contact', count: counts.messages_count },
        { href: '/admin/chat', label: 'Messages Chat', count: counts.chat_messages_count },
        { href: '/admin/newsletter', label: 'Newsletter', count: counts.newsletter_count },
        { href: '/admin/comments', label: 'Commentaires Blog', count: counts.comments_pending_count },
        { href: '/admin/articles', label: 'Articles' },
        { href: '/admin/projects', label: 'Projets' },
        { href: '/admin/services', label: 'Services' },
        { href: '/admin/security', label: 'Sécurité / 2FA' },
    ];

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    function isActive(link) {
        return link.exact ? pathname === link.href : pathname.startsWith(link.href);
    }

    function handleLogout() {
        clearToken();
        router.push('/admin/login');
    }

    return (
        <>
            <div className={styles.mobileTopbar}>
                <span className={styles.logo}>Admin Portfolio</span>
                <button
                    type="button"
                    className={styles.menuToggle}
                    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                    onClick={() => setOpen((v) => !v)}
                >
                    <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
                </button>
            </div>
            {open && <div className={styles.sidebarOverlay} onClick={() => setOpen(false)} />}
            <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
                <div className={styles.logo}>Admin Portfolio</div>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.navLink} ${isActive(link) ? styles.navLinkActive : ''}`}
                    >
                        <span>{link.label}</span>
                        {typeof link.count === 'number' && link.count > 0 && (
                            <span className={styles.navBadge}>{link.count}</span>
                        )}
                    </Link>
                ))}
                <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                    Déconnexion
                </button>
            </aside>
        </>
    );
}
