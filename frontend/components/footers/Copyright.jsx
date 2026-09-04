import React from 'react';
import Link from 'next/link';
export default function Copyright() {
    return (
        <div className="copyright-area-one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-wrapper">
                            <p className="copy-right-para tmp-link-animation">
                                © Farid Zaffalone {new Date().getFullYear()} | Tous droits réservés | Made by Farid with ❤️
                            </p>{' '}
                            <ul className="footer-links tmp-link-animation">
                                <li>
                                    <Link href={`/mentions-legales`}>Mentions légales</Link>
                                </li>
                                <li>
                                    <Link href={`/politique-de-confidentialite`}>Politique de confidentialité</Link>
                                </li>
                                <li>
                                    <Link href={`/contact`}>Me Contacter</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
