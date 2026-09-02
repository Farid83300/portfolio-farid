'use client';
import React from 'react';
import Nav1 from './Nav1';
import Image from 'next/image';
import Link from 'next/link';
import { openSidebar } from '@/utils/toggleSidebar';
import { openMobilemenu } from '@/utils/toggleMobilemenu';
export default function Header1({
  darkLogo = '/assets/images/logo/logo.png',
  lightLogo = '/assets/images/logo/logo.png',
}) {
  return (
    <header className="tmp-header-area-start header-one header--sticky header--transparent">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-content">
              <div className="logo">
                <Link href={`/`}>
                  <Image
                    className="logo-dark"
                    alt="Farid Zaffalone - Portfolio personnel"
                    src={darkLogo}
                    width={53}
                    height={50}
                  />
                  <Image
                    className="logo-white"
                    alt="Farid Zaffalone - Portfolio personnel"
                    src={lightLogo}
                    width={53}
                    height={50}
                  />
                </Link>
              </div>
              <nav className="tmp-mainmenu-nav d-none d-xl-block">
                <Nav1 />
              </nav>
              <div className="tmp-header-right">
                <div className="social-share-wrapper d-none d-md-block">
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
                    <a href="https://www.facebook.com/FaridZaffalone" aria-label="Profil Facebook">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </div>
                </div>
                <div className="actions-area">
                  <div className="tmp-side-collups-area d-none d-xl-block">
                    <button className="tmp-menu-bars tmp_button_active" onClick={openSidebar}>
                      <i className="fa-regular fa-bars-staggered" />
                    </button>
                  </div>
                  <div className="tmp-side-collups-area d-block d-xl-none">
                    <button
                      className="tmp-menu-bars humberger_menu_active"
                      onClick={openMobilemenu}
                    >
                      <i className="fa-regular fa-bars-staggered" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
