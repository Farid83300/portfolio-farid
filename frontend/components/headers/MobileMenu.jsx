'use client';
import { menuItems } from '@/data/menu';
import { closeMobilemenu } from '@/utils/toggleMobilemenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

export default function MobileMenu() {
    const pathname = usePathname();
    const menuRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            if (menuRef.current && menuRef.current.contains(event.target)) {
                if (innerRef.current && innerRef.current.contains(event.target)) {
                } else {
                    closeMobilemenu();
                }
            }
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="d-block d-xl-none">
            <div ref={menuRef} className="tmp-popup-mobile-menu">
                <div ref={innerRef} className="inner">
                    <div className="header-top">
                        <div className="logo">
                            <a href="/" className="logo-area">
                                <img
                                    className="logo-dark"
                                    alt="Logo Farid Zaffalone"
                                    src="/assets/images/logo/logo.png"
                                    width={53}
                                    height={50}
                                />
                                <img
                                    className="logo-white"
                                    alt="Logo Farid Zaffalone"
                                    src="/assets/images/logo/logo.png"
                                    width={53}
                                    height={50}
                                />
                            </a>
                        </div>
                        <div className="close-menu">
                            <button
                                className="close-button tmp-round-action-btn"
                                onClick={closeMobilemenu}
                            >
                                <i className="fa-sharp fa-light fa-xmark" />
                            </button>
                        </div>
                    </div>
                    <ul className="tmp-mainmenu">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className={`${
                                        item.href.split('/')[1] == pathname.split('/')[1]
                                            ? 'active'
                                            : ''
                                    }`}
                                    href={item.href}
                                    onClick={closeMobilemenu}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="social-wrapper mt--40">
                        <span className="subtitle">Rejoignez moi</span>
                        <div className="social-link">
                            <a href="https://github.com/Farid83300" aria-label="Profil Github">
                                <i className="fa-brands fa-github" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/farid-zaffalone/"
                                aria-label="Profil Linkedin"
                            >
                                <i className="fa-brands fa-linkedin-in" />
                            </a>
                            <a href="https://x.com/fzaffalone" aria-label="ProfilX (Twitter)">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/FaridZaffalone"
                                aria-label="Profil Facebook"
                            >
                                <i className="fa-brands fa-facebook-f" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
