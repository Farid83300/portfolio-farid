'use client';

import { closeSidebar } from '@/utils/toggleSidebar';

export default function Sidebar() {
  return (
    <div className="d-none d-xl-block">
      <div className="tmp-sidebar-area tmp_side_bar">
        <div className="inner">
          <div className="top-area">
            <a href="/" className="logo">
              <img
                className="logo-dark"
                alt="Farid Zaffalone - Portfolio personnel"
                src="/assets/images/logo/logo.png"
                width={53}
                height={50}
              />
              <img
                className="logo-white"
                alt="Farid Zaffalone - Portfolio personnel"
                src="/assets/images/logo/logo.png"
                width={53}
                height={50}
              />
            </a>
            <div className="close-icon-area">
              <button
                className="tmp-round-action-btn close_side_menu_active"
                onClick={closeSidebar}
              >
                <i className="fa-sharp fa-light fa-xmark" />
              </button>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="image-area-feature">
              <a href="/">
                <img
                  alt="personal-logo"
                  src="/assets/images/logo/man.png"
                  width={340}
                  height={196}
                />
              </a>
            </div>
            <h5 className="title mt--30">
              Freelance proposant des solutions PHP/React et WordPress exceptionnelles.
            </h5>
            <p className="disc">
              Je suis un développeur freelance expérimenté, spécialisé dans le développement
              PHP/React, la conception Figma et les projets WordPress. Je propose des solutions web
              créatives, dynamiques et centrées sur l'utilisateur.
            </p>
            <div className="short-contact-area">
              {/* single contact information */}
              <div className="single-contact">
                <i className="fa-solid fa-phone" />
                <div className="information tmp-link-animation">
                  <span>Téléphone</span>
                  <a href="#" className="number">
                    +33 7 56960653
                  </a>
                </div>
              </div>
              {/* single contact information end */}
              {/* single contact information */}
              <div className="single-contact">
                <i className="fa-solid fa-envelope" />
                <div className="information tmp-link-animation">
                  <span>Email</span>
                  <a href="#" className="number">
                    contact@faridzaffalone.com
                  </a>
                </div>
              </div>
              {/* single contact information end */}
              {/* single contact information */}
              <div className="single-contact">
                <i className="fa-solid fa-location-crosshairs" />
                <div className="information tmp-link-animation">
                  <span>Adresse</span>
                  <span className="number">83300 Draguignan, France</span>
                </div>
              </div>
              {/* single contact information end */}
            </div>
            {/* social area start */}
            <div className="social-wrapper mt--20">
              <span className="subtitle">Rejoignez moi</span>
              <div className="social-link">
                <a href="https://github.com/Farid83300" aria-label="Profil Github">
                  <i className="fa-brands fa-github" />
                </a>
                <a href="https://www.linkedin.com/in/farid-zaffalone/" aria-label="Profil Linkedin">
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
            {/* social area end */}
          </div>
        </div>
      </div>
      <a
        className="overlay_close_side_menu close_side_menu_active"
        onClick={closeSidebar}
        href="#"
      />
    </div>
  );
}
