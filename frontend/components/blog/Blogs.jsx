import React from 'react';
import Image from 'next/image';
import BlogSidebar from './BlogSidebar';
import { uploadUrl } from '@/lib/publicApi';

import Link from 'next/link';
export default function Blogs({ allBlogs = [], isLight = false }) {
    return (
        <div className="blog-classic-area-wrapper tmp-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {allBlogs.map((blog, i) => (
                            <div
                                key={blog.id}
                                className={`blog-classic-card tmp-scroll-trigger tmponhover tmp-fade-in ${(i % 3) + 1}`}
                            >
                                <div className="img-box">
                                    <Link
                                        href={`/blog-details${isLight ? '-white' : ''}/${blog.slug}`}
                                    >
                                        <Image
                                            className="img-primary hidden-on-mobile"
                                            alt={blog.featured_image_alt || blog.title}
                                            src={uploadUrl(blog.featured_image)}
                                            width={850}
                                            height={462}
                                        />
                                        <Image
                                            className="img-secondary"
                                            alt={blog.featured_image_alt || blog.title}
                                            src={uploadUrl(blog.featured_image)}
                                            width={850}
                                            height={462}
                                        />
                                    </Link>
                                </div>
                                <div className="blog-classic-content">
                                    <div className="blog-classic-tag">
                                        <ul>
                                            {blog.category_name && (
                                                <li>
                                                    <div className="tag-wrap">
                                                        <i className="fa-solid fa-tag" />
                                                        <h4 className="tag-title">{blog.category_name}</h4>
                                                    </div>
                                                </li>
                                            )}
                                            {blog.published_at && (
                                                <li>
                                                    <div className="tag-wrap">
                                                        <i className="fa-solid fa-calendar-day" />
                                                        <h4 className="tag-title">
                                                            {new Date(blog.published_at).toLocaleDateString(
                                                                'fr-FR'
                                                            )}
                                                        </h4>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <h2 className="title">
                                        <Link
                                            href={`/blog-details${isLight ? '-white' : ''}/${blog.slug}`}
                                        >
                                            {blog.title}
                                        </Link>
                                    </h2>
                                    <p className="para">{blog.excerpt}</p>
                                    <div className="tmp-button-here">
                                        <Link
                                            className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                                            href={`/blog-details${isLight ? '-white' : ''}/${blog.slug}`}
                                        >
                                            <span className="icon-reverse-wrapper">
                                                <span className="btn-text">Voir plus</span>
                                                <span className="btn-icon">
                                                    <i className="fa-sharp fa-regular fa-arrow-right" />
                                                </span>
                                                <span className="btn-icon">
                                                    <i className="fa-sharp fa-regular fa-arrow-right" />
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!allBlogs.length && <h3 className="text-center">Aucun article trouvé</h3>}
                    </div>
                    <div className="col-lg-4">
                        <BlogSidebar isLight={isLight} />
                    </div>
                </div>
            </div>
        </div>
    );
}
