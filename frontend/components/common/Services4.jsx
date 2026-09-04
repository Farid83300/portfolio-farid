import React from 'react';
import Image from 'next/image';
import { serviceCards2 } from '@/data/services';
export default function Services4() {
    return (
        <section className="latest-service-area tmp-section-gapTop" id="service">
            <div className="container">
                <div className="section-head mb--50">
                    <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                        <span className="subtitle">Mes Services</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                        Vos idées...<br />Mon expertise.
                    </h2>
                    <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
                        Mon expertise a votre service pour des sites web et applications qui convertissent vos visiteurs en clients.
                    </p>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        {serviceCards2.map((card, index) => (
                            <div
                                key={index}
                                className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${
                                    index + 1
                                }`}
                            >
                                <h2 className="service-card-num">
                                    <span>{card.number}</span>
                                    {card.title}
                                </h2>
                                <p className="service-para">{card.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-6">
                        <div className="service-card-user-image">
                            <Image
                                className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                                alt="latest-user-image"
                                src="/assets/images/experiences/02.webp"
                                width={1134}
                                height={1176}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
