import About2 from "@/components/common/About2";
import Blogs4 from "@/components/common/Blogs4";
import Contact3 from "@/components/common/Contact3";
import Portfolio3 from "@/components/common/Portfolio3";
import Resume from "@/components/common/Resume";
import Footer4 from "@/components/footers/Footer4";
import React from "react";
import Image from "next/image";
import Hero from "@/components/homes/home-10/Hero";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 10 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="spybody index-ten">
        <Hero />
        <div className="cv-card-area">
          <div className="plr--150 plr_lg--30 plr_md--30 plr_sm--30 plr_mobile--15">
            <div className="row row--25">
              <div className="col-xxl-3 col-lg-12">
                <div
                  className="d-flex flex-wrap align-content-start h-100 w-100 tab-content-overlay-to-top"
                  id="home"
                >
                  <div className="position-sticky sticky-top tmp-sticky-top w-100">
                    <div className="tmp-contact-about-inner">
                      <div className="thumbnail">
                        <Image
                          alt="contact-img"
                          src="/assets/images/banner/banner-user-image-04.png"
                          width={525}
                          height={525}
                        />
                      </div>
                      <div className="content">
                        <div className="title-area">
                          <h4 className="title">John Lee</h4>
                          <span className="subtitle">
                            Chief Operating Officer
                          </span>
                        </div>
                        <div className="description">
                          <div className="info-box">
                            <span className="phone">
                              Phone:
                              <a href="tel:01941043264">+01234567890</a>
                            </span>
                            <span className="mail">
                              Email:
                              <a href="mailto:admin@example.com">
                                admin@example.com
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="social-area mb--30">
                          <div className="social-link justify-content-center">
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
                        <div className="button-area-banner-one text-xl-center text-start">
                          <a
                            className="tmp-btn hover-icon-reverse radius-round download-icon"
                            href="#"
                          >
                            <span className="icon-reverse-wrapper">
                              <span className="btn-text">Download My CV</span>
                              <span className="btn-icon">
                                <i className="fa-regular fa-arrow-down" />
                              </span>
                              <span className="btn-icon">
                                <i className="fa-regular fa-arrow-down" />
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-9 col-lg-12">
                <div className="tab-wrapper-overlay-to-top">
                  <div className="position-sticky sticky-top tmp-sticky-top w-100">
                    <ul
                      className="tab-navigation-button style-2 nav tab-smlg nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link tmp-nav active"
                          id="v-pills-home-tab"
                          data-bs-toggle="tab"
                          href="#v-pills-Javascript"
                          role="tab"
                          aria-selected="true"
                        >
                          My About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link tmp-nav"
                          id="v-pills-profile-tab"
                          data-bs-toggle="tab"
                          href="#v-pills-Design"
                          role="tab"
                          aria-selected="true"
                        >
                          My Resume
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link tmp-nav"
                          id="v-pills-wordpress-tab"
                          data-bs-toggle="tab"
                          href="#v-pills-Wordpress"
                          role="tab"
                          aria-selected="true"
                        >
                          My Work
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link tmp-nav"
                          id="v-pills-settings-tabs"
                          data-bs-toggle="tab"
                          href="#v-pills-settings"
                          role="tab"
                          aria-selected="true"
                        >
                          My Blog
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link tmp-nav"
                          id="v-pills-python-tabs"
                          data-bs-toggle="tab"
                          href="#v-pills-python"
                          role="tab"
                          aria-selected="true"
                        >
                          My Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tmp-tab-content-area mt--40">
                    <div
                      className="tmp-all-tab-content tab-content"
                      id="v-pills-tabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="v-pills-Javascript"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                      >
                        {/* Start about Area */}
                        <About2 />
                        {/* End about Area */}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-Design"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                      >
                        <Resume />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-Wordpress"
                        role="tabpanel"
                        aria-labelledby="v-pills-wordpress-tab"
                      >
                        {/* Start Portfolio Area */}
                        <Portfolio3 />
                        {/* End portfolio Area */}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-settings"
                        role="tabpanel"
                        aria-labelledby="v-pills-settings-tabs"
                      >
                        {/* Start News Area */}
                        <Blogs4 />
                        {/* ENd Mews Area */}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-python"
                        role="tabpanel"
                        aria-labelledby="v-pills-python-tabs"
                      >
                        {/* Start Contact section */}
                        <Contact3 />
                        {/* End Contuct section */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer4 /> <CommonComponents />
      </div>
    </>
  );
}
