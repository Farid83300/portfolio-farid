import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, uploadUrl } from '@/lib/publicApi';

export default async function ServiceDetails({ serviceItem }) {
    const {
        title,
        slug,
        image,
        image_alt: imageAlt,
        description,
        sections = [],
    } = serviceItem;

    const otherServices = (await getServices()).filter((service) => service.slug !== slug);

    return (
        <div className="service-details-area-wrapper tmp-section-gap">
            <div className="container">
                <div className="row row--40">
                    <div className="col-lg-8">
                        <div className="service-thumnail-wrap">
                            <Image
                                alt={imageAlt || `Illustration du service ${title}`}
                                src={
                                    image
                                        ? uploadUrl(image)
                                        : '/assets/images/services/service-detials-thumnail-wrap.png'
                                }
                                width={850}
                                height={476}
                                style={{ aspectRatio: '850 / 476', objectFit: 'cover' }}
                            />
                        </div>
                        <h2 className="title split-collab">{title}</h2>
                        {description && <p className="doc-para">{description}</p>}
                        {sections.map((section, index) => (
                            <React.Fragment key={index}>
                                {section.heading && (
                                    <h2 className="title-mini split-collab">{section.heading}</h2>
                                )}
                                {(section.paragraphs || []).map((paragraph, paragraphIndex) => (
                                    <p className="doc-para" key={paragraphIndex}>
                                        {paragraph}
                                    </p>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="col-lg-4">
                        <div className="signle-side-bar service-list-area tmponhover">
                            <div className="header">
                                <h3 className="title">Autres services</h3>
                            </div>
                            <div className="body">
                                {otherServices.map((service) => (
                                    <Link
                                        href={`/service-details/${service.slug}`}
                                        className="single-service"
                                        key={service.slug}
                                    >
                                        <p className="service-title">{service.title}</p>
                                        <span className="service-icon">
                                            <i className="fa-solid fa-angle-right" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
