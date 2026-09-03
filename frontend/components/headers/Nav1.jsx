'use client';
import React from 'react';
import Link from 'next/link';
import { menuItems } from '@/data/menu';
import { usePathname } from 'next/navigation';

export default function Nav1() {
    const pathname = usePathname();
    return (
        <ul className="tmp-mainmenu">
            {menuItems.map((item, index) => (
                <li key={index}>
                    <Link
                        className={`${item.href.split('/')[1] == pathname.split('/')[1] ? 'active' : ''}`}
                        href={item.href}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
