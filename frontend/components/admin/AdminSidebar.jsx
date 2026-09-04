'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/public/assets/scss/admin/admin.module.scss';
import { clearToken } from '@/lib/adminApi';

export default function AdminSidebar({ counts = {} }) {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { href: '/admin', label: 'Dashboard', exact: true },
        { href: '/admin/messages', label: 'Messages Contact', count: counts.messages_count },
        { href: '/admin/chat', label: 'Messages Chat', count: counts.chat_messages_count },
        { href: '/admin/newsletter', label: 'Newsletter', count: counts.newsletter_count },
        { href: '/admin/comments', label: 'Commentaires Blog', count: counts.comments_pending_count },
        { href: '/admin/articles', label: 'Articles' },
        { href: '/admin/projects', label: 'Projets' },
        { href: '/admin/security', label: 'Sécurité / 2FA' },
    ];

    function isActive(link) {
        return link.exact ? pathname === link.href : pathname.startsWith(link.href);
    }

    function handleLogout() {
        clearToken();
        router.push('/admin/login');
    }

    return (
        <aside className={styles.sidebar}>
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
    );
}
