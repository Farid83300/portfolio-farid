import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/publicApi';

export default async function Services() {
    const services = (await getServices()).slice(0, 4);

    return (
        <section className="service-area tmp-section-gap">
            <div className="container">
                <div className="row justify-content-center">
                    {services.map((service, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={service.id}>
                            <div
                                className={`service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-${index + 1} tmp-link-animation`}
                            >
                                <div className="service-card-icon">
                                    <i className={service.icon || 'fa-solid fa-code'} />
                                </div>
                                <h4 className="service-title">
                                    <Link href={`/service-details/${service.slug}`}>
                                        {service.title}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
