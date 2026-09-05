import Image from 'next/image';
import React from 'react';

import Link from 'next/link';
import { slugify } from '@/utils/slugify';
import { getPosts, uploadUrl } from '@/lib/publicApi';

export default async function BlogSidebar({ isLight = false }) {
    const allBlogs = await getPosts();

    const categoryMap = new Map();
    const tagMap = new Map();
    allBlogs.forEach((blog) => {
        if (blog.category_name) {
            categoryMap.set(blog.category_slug, {
                title: blog.category_name,
                slug: blog.category_slug,
                count: (categoryMap.get(blog.category_slug)?.count || 0) + 1,
            });
        }
        (blog.tags || []).forEach((tag) => {
            tagMap.set(tag.slug, tag);
        });
    });
    const categories = Array.from(categoryMap.values());
    const tags = Array.from(tagMap.values());
    const recentPosts = allBlogs.slice(0, 3);

    return (
        <div className="tmp-sidebar">
            <div className="signle-side-bar search-area tmponhover">
                <div className="body">
                    <div className="search-area">
                        <input type="text" placeholder="Rechercher..." required />
                        <button>
                            <i className="fa-solid fa-magnifying-glass" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="signle-side-bar recent-post-area tmponhover">
                <div className="header">
                    <h3 className="title">Categorie</h3>
                </div>
                <div className="body">
                    {categories.map((cat) => (
                        <Link
                            href={`/blog${isLight ? '-white' : ''}/category/${cat.slug}`}
                            className="single-post"
                            key={cat.slug}
                        >
                            <span className="single-post-left">
                                <i className="fa-solid fa-arrow-right" />
                                <span className="post-title">{cat.title}</span>
                            </span>
                            <span className="post-num">({cat.count})</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="signle-side-bar recent-post-area tmponhover">
                <div className="header">
                    <h3 className="title">Post Récent</h3>
                </div>
                <div className="body">
                    {recentPosts.map((post) => (
                        <div key={post.id} className="single-post-card tmp-hover-link">
                            <div className="single-post-card-img">
                                <Image
                                    alt={post.featured_image_alt || post.title}
                                    src={uploadUrl(post.featured_image)}
                                    width={82}
                                    height={92}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="single-post-right">
                                <div className="single-post-top">
                                    <i className="fa-regular fa-folder-open" />
                                    <p className="post-title">{post.category_name || ''}</p>
                                </div>
                                <h3 className="post-title">
                                    <Link
                                        className="link"
                                        href={`/blog-details${isLight ? '-white' : ''}/${post.slug}`}
                                    >
                                        {post.title}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="signle-side-bar tmponhover">
                <div className="header">
                    <h3 className="title">À Propos</h3>
                </div>
                <div className="body">
                    <div className="about-me-details">
                        <div className="about-me-details-head">
                            <div className="about-me-img">
                                <Image
                                    alt="Farid Zaffalone"
                                    src="/assets/images/photo-profil-new.webp"
                                    width={600}
                                    height={600}
                                />
                            </div>
                            <div className="about-me-right-content">
                                <h3 className="title">Farid Zaffalone</h3>
                                <p className="para">Développeur Freelance PHP/React & WordPress</p>
                                <div className="social-link">
                                    <a href="https://github.com/Farid83300" aria-label="Profil Github">
                                        <i className="fa-brands fa-github" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/farid-zaffalone/"
                                        aria-label="Profil Linkedin"
                                    >
                                        <i className="fa-brands fa-linkedin-in" />
                                    </a>
                                    <a href="https://x.com/fzaffalone" aria-label="Profil X">
                                        <i className="fa-brands fa-twitter" />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/FaridZaffalone"
                                        aria-label="Profil Facebook"
                                    >
                                        <i className="fa-brands fa-facebook-f" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <p className="about-me-para">
                            Développeur freelance spécialisé en PHP/React et WordPress, basé à
                            Draguignan.
                        </p>
                    </div>
                </div>
            </div>
            <div className="signle-side-bar tmponhover">
                <div className="header">
                    <h3 className="title">Tags</h3>
                </div>
                <div className="body">
                    <div className="tags-wrapper">
                        {tags.map((tag) => (
                            <Link
                                href={`/blog${isLight ? '-white' : ''}/tag/${tag.slug}`}
                                className="tag-link"
                                key={tag.slug}
                            >
                                {tag.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
