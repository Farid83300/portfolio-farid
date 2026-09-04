import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { uploadUrl } from '@/lib/publicApi';

export default function Projects({ items = [], isLight = false }) {
    return (
        <section className="tmp-latest-portfolio tmp-section-gap">
            <div className="container">
                <div className="row">
                    {items.map((item) => (
                        <div key={item.id} className="col-lg-6 col-md-6 col-12">
                            <div className="latest-portfolio-card v5 tmp-hover-link">
                                <div className="portfoli-card-img">
                                    <div className="img-box v2">
                                        <Link
                                            href={`/project-details${isLight ? '-white' : ''}/${item.slug}`}
                                        >
                                            <Image
                                                className="img-primary hidden-on-mobile"
                                                alt={item.title}
                                                src={uploadUrl(item.thumbnail)}
                                                width={570}
                                                height={470}
                                            />
                                            <Image
                                                className="img-secondary"
                                                alt={item.title}
                                                src={uploadUrl(item.thumbnail)}
                                                width={570}
                                                height={470}
                                            />
                                        </Link>
                                    </div>
                                    <Link
                                        href={`/project-details${isLight ? '-white' : ''}/${item.slug}`}
                                        className="img-link-icon"
                                    >
                                        <i className="fa-solid fa-arrow-up-long" />
                                    </Link>
                                </div>
                                <div className="portfolio-card-content-wrap">
                                    <div className="content-left">
                                        <h3 className="portfolio-card-title">
                                            <Link
                                                className="link"
                                                href={`/project-details${isLight ? '-white' : ''}/${item.slug}`}
                                            >
                                                {item.title}
                                            </Link>
                                        </h3>
                                        <p className="portfoli-card-para">{item.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
