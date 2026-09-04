import React from 'react';
import Image from 'next/image';
import { educationExperienceData, experiencesData } from '@/data/education';
export default function Education() {
    return (
        <section className="education-experience tmp-section-gapTop" id="resume">
            <div className="container">
                <div className="section-head mb--50">
                    <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                        <span className="subtitle">Formation &amp; Expérience</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                        Passionné par l'informatique et les technologies, <br />
                        depuis toujours
                    </h2>
                    <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
                        Curriculum vitae de mon parcours complet disponible sur mon profil{' '}
                        <a
                            href="https://www.linkedin.com/in/farid-zaffalone/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'underline' }}
                        >
                            LinkedIn
                        </a>
                    </p>
                </div>
                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                    Education
                    <span>
                        <Image
                            alt="custom-line"
                            src="/assets/images/custom-line/custom-line.png"
                            width={81}
                            height={6}
                        />
                    </span>
                </h2>
                <div className="row g-5">
                    {educationExperienceData.map((item, index) => (
                        <div className="col-lg-6 col-sm-6" key={index}>
                            <div
                                className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
                            >
                                <h4 className="edu-sub-title">{item.role}</h4>
                                <h2 className="edu-title">{item.duration}</h2>
                                <p className="edu-para">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="experiences-wrapper">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="experiences-wrap-left-content">
                                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                                    Experiences
                                    <span>
                                        <Image
                                            alt="custom-line"
                                            src="/assets/images/custom-line/custom-line.png"
                                            width={81}
                                            height={6}
                                        />
                                    </span>
                                </h2>
                                {experiencesData.map((item, index) => (
                                    <div
                                        className={`experience-content tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
                                        key={index}
                                    >
                                        <p className="ex-subtitle">experience</p>
                                        <h2 className="ex-name">{item.name}</h2>
                                        <h3 className="ex-title">{item.title}</h3>
                                        <p className="ex-para">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="experiences-wrap-right-content">
                                <Image
                                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                                    alt="expert-img"
                                    src="/assets/images/experiences/expert-img.jpg"
                                    width={945}
                                    height={719}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
