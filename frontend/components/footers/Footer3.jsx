'use client';
import Image from 'next/image';
import Link from 'next/link';
import { footerLinks } from '@/data/footerLinks';
import NewsletterForm from './NewsletterForm';
export default function Footer3({
    darkLogo = '/assets/images/logo/logo.png',
    lightLogo = '/assets/images/logo/logo.png',
}) {
    return (
        <>
            <footer className="footer-area footer-style-one-wrapper  tmp-section-gap">
                <div className="container">
                    <div className="footer-main footer-style-one">
                        <div className="row g-5">
                            <div className="col-lg-5 col-md-6">
                                <div className="single-footer-wrapper border-right mr--20">
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
                                    <p className="description">
                                        <span>Inscris-toi</span> <br /> à mon Newsletters
                                    </p>
                                    <NewsletterForm placeholder="Adresse Email" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-footer-wrapper quick-link-wrap">
                                    <h5 className="ft-title">Accès rapide</h5>
                                    <ul className="ft-link tmp-link-animation">
                                        {footerLinks.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.href}>{item.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-footer-wrapper contact-wrap">
                                    <h5 className="ft-title">Contact </h5>
                                    <ul className="ft-link tmp-link-animation">
                                        <li>
                                            <span className="ft-icon">
                                                <i className="fa-solid fa-envelope" />
                                            </span>
                                            <a href="#">contact@faridzaffalone.com</a>
                                        </li>
                                        <li>
                                            <span className="ft-icon">
                                                <i className="fa-solid fa-location-dot" />
                                            </span>
                                            83300 Draguignan, France
                                        </li>
                                        <li>
                                            <span className="ft-icon">
                                                <i className="fa-solid fa-phone" />
                                            </span>
                                            <a href="#">+33660919320</a>
                                        </li>
                                    </ul>
                                    <div className="social-link footer">
                                        <a
                                            href="https://github.com/Farid83300"
                                            aria-label="Profil Github"
                                        >
                                            <i className="fa-brands fa-github" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/farid-zaffalone/"
                                            aria-label="Profil Linkedin"
                                        >
                                            <i className="fa-brands fa-linkedin-in" />
                                        </a>
                                        <a
                                            href="https://x.com/fzaffalone"
                                            aria-label="ProfilX (Twitter)"
                                        >
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
                </div>
                <div className="footer-bg-img">
                    <Image
                        alt="footer-img"
                        width={437}
                        height={430}
                        src="/assets/images/footer/footer-bg-img.png"
                    />
                </div>
            </footer>{' '}
        </>
    );
}
