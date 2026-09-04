import React from 'react';

export default function Skills2() {
    return (
        <section className="my-skill tmp-section-gapTop">
            <div className="container">
                <div className="section-head text-align-left mb--50">
                    <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                        <span className="subtitle">My Skill</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                        Elevated Designs Personalized <br />
                        the best Experiences
                    </h2>
                </div>
                <div className="services-widget v1">
                    <div className="service-item current tmp-scroll-trigger tmp-fade-in animation-order-1">
                        <div className="my-skill-card">
                            <div className="card-icon">
                                <i className="fa-solid fa-code" />
                            </div>
                            <div className="card-title">
                                <h3 className="main-title">Web Dev Full-Stack</h3>
                                <p className="sub-title">16 Done</p>
                            </div>
                            <p className="card-para">
                                PHP · React · MVC · POO → "De la conception à la mise en ligne, je développe des applications web robustes et évolutives avec des architectures propres".
                            </p>
                            <a href="#" className="read-more-btn">
                                Voir Plus
                                <span className="read-more-icon">
                                    <i className="fa-solid fa-angle-right" />
                                </span>
                            </a>
                        </div>
                        <button className="service-link modal-popup" />
                    </div>
                    <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-2">
                        <div className="my-skill-card">
                            <div className="card-icon">
                                <i className="fa-brands fa-wordpress-simple" />
                            </div>
                            <div className="card-title">
                                <h3 className="main-title">WordPress & CMS</h3>
                                <p className="sub-title">9 Done</p>
                            </div>
                            <p className="card-para">
                                LiteSpeed · Core Web Vitals → "Création et optimisation de sites WordPress sur-mesure, avec un focus sur la vitesse, le SEO et la sécurité".
                            </p>
                            <a href="#" className="read-more-btn">
                                Voir Plus
                                <span className="read-more-icon">
                                    <i className="fa-solid fa-angle-right" />
                                </span>
                            </a>
                        </div>
                        <button className="service-link modal-popup" />
                    </div>
                    <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-3">
                        <div className="my-skill-card">
                            <div className="card-icon">
                                <i className="fa-light fa-pen-nib" />
                            </div>
                            <div className="card-title">
                                <h3 className="main-title">UI/Design & Intégration</h3>
                                <p className="sub-title">5 Done</p>
                            </div>
                            <p className="card-para">
                                Figma · Canva · HTML/CSS · Responsive → "Je transforme des maquettes en interfaces pixel-perfect, accessibles et adaptées à tous les écrans".
                            </p>
                            <a href="#" className="read-more-btn">
                                Voir Plus
                                <span className="read-more-icon">
                                    <i className="fa-solid fa-angle-right" />
                                </span>
                            </a>
                        </div>
                        <button className="service-link modal-popup" />
                    </div>
                    <div className="active-bg wow fadeInUp mleave" />
                </div>
            </div>
        </section>
    );
}
