import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/publicApi';

export default async function Services() {
    const services = await getServices();
    const midpoint = Math.ceil(services.length / 2);
    const columns = [services.slice(0, midpoint), services.slice(midpoint)];

    return (
        <section className="latest-service-area tmp-section-gap">
            <div className="container">
                <div className="row">
                    {columns.map((column, columnIndex) => (
                        <div className="col-lg-6 col-sm-6" key={columnIndex}>
                            {column.map((service, index) => {
                                const num = columnIndex * midpoint + index + 1;
                                return (
                                    <Link
                                        href={`/service-details/${service.slug}`}
                                        className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${num}`}
                                        key={service.id}
                                    >
                                        <h2 className="service-card-num">
                                            <span>{String(num).padStart(2, '0')}.</span>
                                            {service.title}
                                        </h2>
                                        <p className="service-para">{service.description}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
