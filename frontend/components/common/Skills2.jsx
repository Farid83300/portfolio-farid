import React from "react";

export default function Skills2() {
  return (
    <section className="my-skill tmp-section-gapTop">
      <div className="container">
        <div className="section-head text-align-left mb--50">
          <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">My Skill</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Elevated Designs Personalized <br />
            the best Experiences
          </h2>
        </div>
        <div className="services-widget v1">
          <div className="service-item current tmp-scroll-trigger tmp-fade-in animation-order-1">
            <div className="my-skill-card">
              <div className="card-icon">
                <i className="fa-light fa-building-columns" />
              </div>
              <div className="card-title">
                <h3 className="main-title">Ui/visual Design</h3>
                <p className="sub-title">21 Done</p>
              </div>
              <p className="card-para">
                My work is driven by the belief that thoughtful design and
                strategic planning can empower brands strategic planning can
                empower brands
              </p>
              <a href="#" className="read-more-btn">
                Read More
                <span className="read-more-icon">
                  <i className="fa-solid fa-angle-right" />
                </span>
              </a>
            </div>
            <button className="service-link modal-popup" />
          </div>
          <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-2">
            <div className="my-skill-card">
              <div className="card-icon">
                <i className="fa-light fa-calendar" />
              </div>
              <div className="card-title">
                <h3 className="main-title">Ui/visual Design</h3>
                <p className="sub-title">21 Done</p>
              </div>
              <p className="card-para">
                In this portfolio, you’ll find a curated selection of projects
                that highlight my skills in [Main Areas, e.g., responsive web
                design
              </p>
              <a href="#" className="read-more-btn">
                Read More
                <span className="read-more-icon">
                  <i className="fa-solid fa-angle-right" />
                </span>
              </a>
            </div>
            <button className="service-link modal-popup" />
          </div>
          <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-3">
            <div className="my-skill-card">
              <div className="card-icon">
                <i className="fa-light fa-pen-nib" />
              </div>
              <div className="card-title">
                <h3 className="main-title">Motion Design</h3>
                <p className="sub-title">20 Done</p>
              </div>
              <p className="card-para">
                Each project here showcases my commitment to excellence and
                adaptability, tailored to meet each client’s unique needs
              </p>
              <a href="#" className="read-more-btn">
                Read More
                <span className="read-more-icon">
                  <i className="fa-solid fa-angle-right" />
                </span>
              </a>
            </div>
            <button className="service-link modal-popup" />
          </div>
          <div className="active-bg wow fadeInUp mleave" />
        </div>
      </div>
    </section>
  );
}
