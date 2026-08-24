import React from "react";
import Image from "next/image";

import { blogData7 } from "@/data/blogs";

import Link from "next/link";
export default function Blogs({ isLight = false }) {
  return (
    <section className="blog-and-news-are tmp-section-gap">
      <div className="container">
        <div className="section-head mb--40">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Blog and news</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Elevating Personal Branding the <br />
            through Powerful Portfolios
          </h2>
        </div>
        <div className="row">
          {blogData7.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6">
              <div
                className={`blog-card tmp-hover-link tmp-scroll-trigger tmp-fade-in ${blog.animationOrder}`}
              >
                <div className="img-box">
                  <Link
                    href={`/blog-details${isLight ? "-white" : ""}/${
                      blog.slug
                    }`}
                  >
                    <Image
                      className="img-primary hidden-on-mobile"
                      alt={blog.altText}
                      src={blog.imageSrc}
                      width={blog.width}
                      height={blog.height}
                    />
                    <Image
                      className="img-secondary"
                      alt={blog.altText}
                      src={blog.imageSrc}
                      width={blog.width}
                      height={blog.height}
                    />
                  </Link>
                  <ul className="blog-tags">
                    <li>
                      <span className="tag-icon">
                        <i className="fa-regular fa-user" />
                      </span>
                      {blog.author}
                    </li>
                    <li>
                      <span className="tag-icon">
                        <i className="fa-solid fa-calendar-days" />
                      </span>
                      {blog.date}
                    </li>
                  </ul>
                </div>
                <div className="blog-content-wrap">
                  <h3 className="blog-title v2">
                    <Link
                      className="link"
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/blog-details${isLight ? "-white" : ""}/${
                      blog.slug
                    }`}
                    className="read-more-btn v2"
                  >
                    Read More
                    <span className="read-more-icon">
                      <i className="fa-solid fa-angle-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
