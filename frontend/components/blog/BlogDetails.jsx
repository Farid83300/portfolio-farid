import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogSidebar from "./BlogSidebar";
import Comment from "./Comment";
import { tags } from "@/data/blogs";
import { slugify } from "@/utlis/slugify";
export default function BlogDetails({ blog, isLight = false }) {
  return (
    <div className="blog-classic-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-details-left-area">
              <div className="thumbnail-top">
                <Image
                  alt="Corporate_business"
                  src={blog.imageSrc}
                  width={850}
                  height={440}
                />
              </div>
              <div className="blog-details-discription">
                <div className="blog-classic-tag">
                  <h4 className="title">By Stanio lainto</h4>
                  <ul>
                    <li>
                      <div className="tag-wrap">
                        <i className="fa-solid fa-tag" />
                        <h4 className="tag-title">Web design</h4>
                      </div>
                    </li>
                    <li>
                      <div className="tag-wrap">
                        <i className="fa-solid fa-calendar-day" />
                        <h4 className="tag-title">Comments (05)</h4>
                      </div>
                    </li>
                  </ul>
                </div>
                <h3 className="title split-collab">{blog.title}</h3>
                <p className="disc">
                  Aliquam eros justo, posuere loborti viverra laoreet matti
                  ullamcorper posuere viverra .Aliquam eros justo, posuere
                  lobortis, viverra laoreet augue mattis fermentum ullamcorper
                  viverra laoreet Aliquam
                </p>
                <p className="disc">
                  Aliquam eros justo, posuere loborti viverra laoreet matti
                  ullamcorper posuere viverra .Aliquam eros justoposuere
                  lobortis non, viverra laoreet augue mattis fermentum
                  ullamcorper viverra laore Aliquam eros justo posuere desig
                  loborti viverra laoreet matti ullamcorper posuere viverra
                </p>
              </div>
              <div className="quote-area-blog-details">
                <p className="disc">
                  Aliquam eros justo, posuere loborti viverra laoreet matti
                  ullamcorper posuere viverra .Aliquam eros justo, posuere
                  lobortis, viverra laoreet augue mattis fermentum ullamcorper
                  viverra laoreet.
                </p>
                <h3 className="author">Mark wood</h3>
                <span>
                  <i className="fa-solid fa-quote-right" />
                </span>
              </div>
              <div className="blog-details-discription">
                <h3 className="title split-collab">
                  Showcase your talent with our portfolio
                </h3>
                <p className="disc">
                  Aliquam eros justo, posuere loborti viverra laoreet matti
                  ullamcorper posuere viverra .Aliquam eros justo, posuere
                  lobortis, viverra laoreet augue mattis fermentum ullamcorper
                  viverra laoreet Aliquam eros
                </p>
                <div className="our-portfolio-swiper">
                  <div className="blog-details-swiper">
                    <div className="our-portfoli-swiper-card">
                      <div className="card-left-content">
                        <p className="disc">
                          Ished fact that a reader will be distrol acted bioii
                          the.ished fact th reader will besi distrol ac laoreet
                          Aliquam fact that a reader will be distrol acted
                          Aliquam posuere loborti viverra laoreet
                        </p>
                        <p className="disc">
                          Aliquam eros justo, posuere loborti viverra laoreet
                          matt design the ullamcorper posuere viverra .Aliquam
                          eros justo posuere inni lobortis non, viverra laoreet
                          augue mattis
                        </p>
                        <p className="disc">
                          Aliquam eros justo, posuere loborti viverra laoreet
                          matti design an the ullamcorper posuere viverra
                          .Aliquam eros
                        </p>
                      </div>
                      <div className="card-right-content">
                        <Image
                          alt="blog-swip-img"
                          src="/assets/images/blog/blog-details-swiper-img.jpg"
                          width={300}
                          height={280}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog-details-navigation">
                  <div className="navigation-tags">
                    <h3 className="tag-title">Keyword:</h3>
                    <ul>
                      {tags.slice(1, 4).map((tag, index) => (
                        <li key={index}>
                          <p className="tag">
                            <Link
                              href={`/blog${
                                isLight ? "-white" : ""
                              }/tag/${slugify(tag)}`}
                            >
                              {tag}
                            </Link>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="social-link footer">
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </div>
                </div>
                {/* Comment Area Main Wrapper Start */}
                <div className="comment-area-main-wrapper mt--30">
                  <h3 className="title">Comments (3)</h3>
                  <div className="single-comment-audience">
                    <div className="author-image tmponhover">
                      <Image
                        alt="Corporate_business"
                        src="/assets/images/blog/comments-img-1.png"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="right-area-commnet">
                      <div className="top-area-comment">
                        <div className="left">
                          <h6 className="title">Stanio lainto</h6>
                          <span>September 16, 2023</span>
                        </div>
                        <div className="social-link-inner">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitter" />
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-instagram" />
                          </a>
                        </div>
                      </div>
                      <p className="disc">
                        Ished fact that a reader will be distrol acted bioii
                        the.ished fact that a reader will be distrol acted
                        laoreet Aliquam fact that a reader will be distrol acted
                        Aliquam eros justo.
                      </p>
                      <a href="#" className="reply-btn">
                        reply
                      </a>
                    </div>
                  </div>
                  <div className="single-comment-audience pl--100">
                    <div className="author-image tmponhover">
                      <Image
                        alt="Corporate_business"
                        src="/assets/images/blog/comments-img-2.png"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="right-area-commnet">
                      <div className="top-area-comment">
                        <div className="left">
                          <h6 className="title">Court Henry</h6>
                          <span>September 16, 2023</span>
                        </div>
                        <div className="social-link-inner">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitter" />
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-instagram" />
                          </a>
                        </div>
                      </div>
                      <p className="disc">
                        Ished fact that a reader will be distrol acted bioii
                        the.ished fact that a reader will be distrol acted
                        laoreet.
                      </p>
                      <a href="#" className="reply-btn">
                        reply
                      </a>
                    </div>
                  </div>
                  <div className="single-comment-audience">
                    <div className="author-image tmponhover">
                      <Image
                        alt="Corporate_business"
                        src="/assets/images/blog/comments-img-2.png"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="right-area-commnet">
                      <div className="top-area-comment">
                        <div className="left">
                          <h6 className="title">Court Henry</h6>
                          <span>September 16, 2023</span>
                        </div>
                        <div className="social-link-inner">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-twitter" />
                          </a>
                          <a href="#">
                            <i className="fa-brands fa-instagram" />
                          </a>
                        </div>
                      </div>
                      <p className="disc">
                        Ished fact that a reader will be distrol acted bioii
                        the.ished fact that a reader will be distrol acted
                        laoreet Aliquam fact that a reader will be distrol acted
                        Aliquam eros justo.
                      </p>
                      <a href="#" className="reply-btn">
                        reply
                      </a>
                    </div>
                  </div>
                </div>
                {/* Comment Area Main Wrapper End */}
                {/* Blog Details Form Wrapper Start */}
                <Comment />
                {/* Blog Details Form Wrapper End */}
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
