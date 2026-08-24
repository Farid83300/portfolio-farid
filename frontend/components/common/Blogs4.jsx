import React from "react";
import Image from "next/image";
import { blogData5 } from "@/data/blogs";

import Link from "next/link";
export default function Blogs4({ isLight = false }) {
  return (
    <div className="tmp-blog-area" id="blog">
      <div className="inner">
        <div className="section-head text-align-left mb--50">
          <h2 className="custom-title mb--20 tmp-scroll-trigger tmp-fade-in animation-order-1">
            My Recent Post
            <span>
              <Image
                alt="custom-line"
                src="/assets/images/custom-line/custom-line.png"
                width={81}
                height={6}
              />
            </span>
          </h2>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Elevate your brand with a the
          </h2>
          <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
            ished fact that a reader will be distrol acted bioiiy desig ished
            fact that a reader <br />
            will acted ished fact that a reader will be distrol acted
          </p>
        </div>
        <div className="row g-5">
          {blogData5.map((blog) => (
            <div key={blog.id} className="col-lg-6 col-md-6 col-12">
              <div
                className={`blog-card-style-two tmp-scroll-trigger tmp-fade-in tmponhover ${blog.animationOrder}`}
              >
                <div className="blog-card-img">
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
                  </div>
                  <span>{blog.date}</span>
                </div>
                <div className="blog-content-wrap">
                  <div className="blog-tags">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-regular fa-user" />
                          {blog.author}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-regular fa-comments" />
                          {blog.comments}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="blog-title">
                    <Link
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <div className="tmp-button-here">
                    <Link
                      className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Read More</span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
