import React from 'react';
import Image from 'next/image';
import { educationExperienceData, experiencesData } from '@/data/education';

export default function Education() {
    return (
        <section className="education-experience tmp-section-gapTop">
            <div className="container">
                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                    Formation{' '}
                    <span>
                        <Image
                            alt="custom-line"
                            width={81}
                            height={6}
                            src="/assets/images/custom-line/custom-line.png"
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
                <div className="experiences-wrapper v2">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="experiences-wrap-right-content">
                                <Image
                                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                                    alt="expert-img"
                                    width={630}
                                    height={479}
                                    src="/assets/images/experiences/expert-img 14.36.21.jpg"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="experiences-wrap-left-content">
                                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                                    Expériences{' '}
                                    <span>
                                        <Image
                                            alt="custom-line"
                                            width={81}
                                            height={6}
                                            src="/assets/images/custom-line/custom-line.png"
                                        />
                                    </span>
                                </h2>
                                {experiencesData.map((item, index) => (
                                    <div
                                        className={`experience-content tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
                                        key={index}
                                    >
                                        <p className="ex-subtitle">expérience</p>
                                        <h2 className="ex-name">{item.name}</h2>
                                        <h3 className="ex-title">{item.title}</h3>
                                        <p className="ex-para">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
