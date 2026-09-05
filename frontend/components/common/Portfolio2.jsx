import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { getProjects, uploadUrl } from '@/lib/publicApi';

export default async function Portfolio({ isLight = false }) {
    const projects = await getProjects();
    const recentProjects = projects.slice(0, 4);

    return (
        <div className="latest-portfolio-area custom-column-grid tmp-section-gapTop" id="portfolio">
            <div className="container">
                <div className="section-head mb--60">
                    <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                        <span className="subtitle">DERNIER PORTFOLIO</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                        Retrouvez ici <br />
                        mes dernières réalisations.
                    </h2>
                </div>
                <div className="row">
                    {recentProjects.map((item, i) => (
                        <div className="col-lg-6 col-sm-6" key={item.id}>
                            <div
                                className={`latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${i + 1}`}
                            >
                                <div className="portfoli-card-img">
                                    <div className="img-box v2">
                                        <Link
                                            className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                                            href={`/project-details${isLight ? '-white' : ''}/${item.slug}`}
                                        >
                                            <Image
                                                className="w-100"
                                                alt={item.title}
                                                src={uploadUrl(item.thumbnail)}
                                                width={1200}
                                                height={990}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    aspectRatio: '1200 / 990',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Link>
                                    </div>
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
                                    <Link
                                        href={`/project-details${isLight ? '-white' : ''}/${item.slug}`}
                                        className="tmp-arrow-icon-btn"
                                    >
                                        <div className="btn-inner">
                                            <i className="tmp-icon fa-solid fa-arrow-up-right" />
                                            <i className="tmp-icon-bottom fa-solid fa-arrow-up-right" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!recentProjects.length && (
                        <p className="text-center w-100">Aucun projet pour le moment</p>
                    )}
                </div>
            </div>
        </div>
    );
}
