import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import BlogSidebar from './BlogSidebar';
import Comment from './Comment';
import { uploadUrl } from '@/lib/publicApi';
export default function BlogDetails({ blog, isLight = false }) {
    return (
        <div className="blog-classic-area-wrapper tmp-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="blog-details-left-area">
                            <div className="thumbnail-top">
                                <Image
                                    alt={blog.featured_image_alt || blog.title}
                                    src={uploadUrl(blog.featured_image)}
                                    width={850}
                                    height={440}
                                    style={{ width: '100%', height: 'auto', aspectRatio: '850 / 440', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="blog-details-discription">
                                <div className="blog-classic-tag">
                                    <h4 className="title">Par Farid Zaffalone</h4>
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
                                <h3 className="title split-collab">{blog.title}</h3>
                                {blog.excerpt && <p className="disc">{blog.excerpt}</p>}
                                <div
                                    className="disc"
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                                />
                                {blog.tags?.length > 0 && (
                                    <div className="blog-details-navigation">
                                        <div className="navigation-tags">
                                            <h3 className="tag-title">Mots-clés:</h3>
                                            <ul>
                                                {blog.tags.map((tag) => (
                                                    <li key={tag.id}>
                                                        <p className="tag">
                                                            <Link
                                                                href={`/blog${isLight ? '-white' : ''}/tag/${tag.slug}`}
                                                            >
                                                                {tag.name}
                                                            </Link>
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="social-link footer">
                                            <a
                                                href="https://github.com/Farid83300"
                                                aria-label="Profil Github"
                                            >
                                                <i className="fa-brands fa-github" />
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/farid-zaffalone/"
                                                aria-label="Profil Linkedin"
                                            >
                                                <i className="fa-brands fa-linkedin-in" />
                                            </a>
                                            <a
                                                href="https://x.com/fzaffalone"
                                                aria-label="ProfilX (Twitter)"
                                            >
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://www.facebook.com/FaridZaffalone"
                                                aria-label="Profil Facebook"
                                            >
                                                <i className="fa-brands fa-facebook-f" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <Comment postId={blog.id} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <BlogSidebar isLight={isLight} />
                    </div>
                </div>
            </div>
        </div>
    );
}
