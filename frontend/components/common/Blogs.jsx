import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { getPosts, uploadUrl } from '@/lib/publicApi';

export default async function Blogs({
    parentClass = 'blog-and-news-are tmp-section-gap',
    isLight = false,
}) {
    const posts = await getPosts();
    const recentPosts = posts.slice(0, 3);

    return (
        <section className={parentClass} id="blog">
            <div className="container">
                <div className="section-head mb--60">
                    <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                        <span className="subtitle">Blog et News</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                        Actualités et tutoriels <br />
                        dans le domaine de la Tech
                    </h2>
                </div>
                <div className="row">
                    {recentPosts.map((blog, i) => {
                        return (
                            <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6">
                                <div
                                    className={`blog-card tmp-hover-link image-box-hover tmp-scroll-trigger tmp-fade-in animation-order-${i + 1}`}
                                >
                                    <div className="img-box">
                                        <Link
                                            href={`/blog-details${isLight ? '-white' : ''}/${blog.slug}`}
                                        >
                                            <Image
                                                className="w-100"
                                                alt={blog.featured_image_alt || blog.title}
                                                src={uploadUrl(blog.featured_image)}
                                                width={410}
                                                height={294}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    aspectRatio: '410 / 294',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Link>
                                        <ul className="blog-tags">
                                            <li>
                                                <span className="tag-icon">
                                                    <i className="fa-regular fa-user" />
                                                </span>
                                                Farid Zaffalone
                                            </li>
                                            {blog.published_at && (
                                                <li>
                                                    <span className="tag-icon">
                                                        <i className="fa-solid fa-calendar-days" />
                                                    </span>
                                                    {new Date(blog.published_at).toLocaleDateString('fr-FR')}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="blog-content-wrap">
                                        <h3 className="blog-title">
                                            <Link
                                                className="link"
                                                href={`/blog-details${isLight ? '-white' : ''}/${blog.slug}`}
                                            >
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <div className="more-btn tmp-link-animation">
                                            <Link
                                                href={`/blog-details${isLight ? '-white' : ''}/${blog.slug}`}
                                                className="read-more-btn"
                                            >
                                                Voir Plus
                                                <span className="read-more-icon">
                                                    <i className="fa-solid fa-angle-right" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {!recentPosts.length && <p className="text-center w-100">Aucun article pour le moment</p>}
                </div>
            </div>
        </section>
    );
}
