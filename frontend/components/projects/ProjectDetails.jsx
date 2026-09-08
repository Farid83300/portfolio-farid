'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Appointment from './Appointment';
import { uploadUrl } from '@/lib/publicApi';
export default function ProjectDetails({ portfolioItem }) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const gallery = portfolioItem.gallery?.length
        ? portfolioItem.gallery
        : portfolioItem.thumbnail
          ? [{ image: portfolioItem.thumbnail, alt: portfolioItem.title }]
          : [];

    return (
        <div className="project-details-area-wrapper tmp-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="project-details-thumnail-wrap">
                            <Image
                                alt={portfolioItem.title}
                                src={uploadUrl(portfolioItem.cover_image || portfolioItem.thumbnail)}
                                width={1290}
                                height={560}
                                style={{ width: '100%', height: 'auto', aspectRatio: '1290 / 560', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="project-details-content-wrap">
                            <div className="project-details-title-row">
                                <div>
                                    <h2 className="title">{portfolioItem.title}</h2>
                                    {portfolioItem.subtitle && (
                                        <p className="docs">{portfolioItem.subtitle}</p>
                                    )}
                                </div>
                                {portfolioItem.live_url ? (
                                    <a
                                        href={portfolioItem.live_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-preview-btn"
                                    >
                                        <i className="fa-solid fa-eye" />
                                        Aperçu du site
                                    </a>
                                ) : (
                                    portfolioItem.preview_image && (
                                        <button
                                            type="button"
                                            className="project-preview-btn"
                                            onClick={() => setPreviewOpen(true)}
                                        >
                                            <i className="fa-solid fa-eye" />
                                            Aperçu du site
                                        </button>
                                    )
                                )}
                            </div>
                            {portfolioItem.description && (
                                <div
                                    className="docs"
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(portfolioItem.description) }}
                                />
                            )}
                            {portfolioItem.features?.length > 0 && (
                                <div className="check-box-wrap">
                                    <ul>
                                        {portfolioItem.features.map((feature, i) => (
                                            <li key={i}>
                                                <h4 className="check-box-item">
                                                    <span>
                                                        <i className="fa-solid fa-circle-check" />
                                                    </span>
                                                    {feature}
                                                </h4>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {gallery.length > 0 && (
                                <div className="project-details-swiper-wrapper">
                                    <Swiper
                                        className="swiper project-details-swiper"
                                        modules={[Navigation]}
                                        loop={gallery.length > 1}
                                        navigation={{
                                            nextEl: '.project-swiper-button-next',
                                            prevEl: '.project-swiper-button-prev',
                                        }}
                                    >
                                        {gallery.map((item, i) => (
                                            <SwiperSlide className="swiper-slide" key={i}>
                                                <div className="project-details-img">
                                                    <Image
                                                        alt={item.alt || portfolioItem.title}
                                                        src={uploadUrl(item.image)}
                                                        width={410}
                                                        height={295}
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            aspectRatio: '410 / 295',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {gallery.length > 1 && (
                                        <div className="project-details-swiper-btn">
                                            <div className="project-swiper-button-prev">
                                                <span>
                                                    <i className="fa-solid fa-arrow-left" />
                                                </span>
                                                Précédent
                                            </div>
                                            <div className="project-swiper-button-next">
                                                Suivant{' '}
                                                <span>
                                                    <i className="fa-solid fa-arrow-right" />
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* Tpm Get In touch start */}
                        <Appointment />
                        {/* Tpm Get In touch End */}
                    </div>
                    <div className="col-lg-4">
                        <div className="signle-side-bar project-details-area tmponhover">
                            <div className="header">
                                <h3 className="title">Projet Détails</h3>
                            </div>
                            <div className="body">
                                <div className="project-details-info">
                                    Nom: <span>{portfolioItem.title}</span>
                                </div>
                                {portfolioItem.client && (
                                    <div className="project-details-info">
                                        Client: <span>{portfolioItem.client}</span>
                                    </div>
                                )}
                                {portfolioItem.role && (
                                    <div className="project-details-info">
                                        Rôle: <span>{portfolioItem.role}</span>
                                    </div>
                                )}
                                {portfolioItem.project_date && (
                                    <div className="project-details-info">
                                        Date:{' '}
                                        <span>
                                            {new Date(portfolioItem.project_date).toLocaleDateString(
                                                'fr-FR'
                                            )}
                                        </span>
                                    </div>
                                )}
                                {portfolioItem.tags && (
                                    <div className="project-details-info">
                                        Tags: <span>{portfolioItem.tags}</span>
                                    </div>
                                )}
                                {portfolioItem.live_url && (
                                    <div className="project-details-info">
                                        Live:{' '}
                                        <span>
                                            <a
                                                href={portfolioItem.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Voir le site
                                            </a>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {previewOpen && portfolioItem.preview_image && (
                <div className="project-preview-modal-overlay" onClick={() => setPreviewOpen(false)}>
                    <button
                        type="button"
                        className="project-preview-modal-close"
                        onClick={() => setPreviewOpen(false)}
                        aria-label="Fermer l'aperçu"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                    <div className="project-preview-modal" onClick={(e) => e.stopPropagation()}>
                        <Image
                            alt={portfolioItem.title}
                            src={uploadUrl(portfolioItem.preview_image)}
                            width={1600}
                            height={1200}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
