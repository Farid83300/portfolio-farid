import React from "react";
import Link from "next/link";
import Demomodal from "../modals/Demomodal";
import Chat from "../common/Chat";
import DemoToggler from "../common/DemoToggler";
import ScrollTop from "../common/ScrollTop";
import Sidebar from "../headers/Sidebar";
import MobileMenu from "../headers/MobileMenu";
import MobileMenuOnepage from "../headers/MobileMenuOnepage";
export default function Footer5() {
  return (
    <>
      <div className="tmp-footer-area-style-net tmp-section-gapTop">
        <div className="footer-style-3">
          <div className="tmp-callto-action tmp-call-to-action bg_patern-1 style-8 content-wrapper">
            <div className="container">
              <div className="row row--0 align-items-center">
                <div className="col-lg-12">
                  <div className="inner">
                    <div className="content text-center">
                      <h2 className="title sal-animate">
                        Ready to start creating a <br />
                        standard website?
                      </h2>
                      <h6 className="subtitle sal-animate">
                        Finest choice for your home &amp; office
                      </h6>
                      <div className="call-to-btn text-center mt--30 d-flex justify-content-center sal-animate">
                        <a
                          className="tmp-btn btn-icon"
                          target="_blank"
                          href="https://themeforest.net/item/reeni-personal-portfolio-html-template/56387656"
                        >
                          Purchase Reeni{" "}
                          <i className="icon feather-arrow-right"> </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-style-net">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-4 col-md-12 col-sm-12 col-sm-12 col-12">
                  <div className="copyright-left">
                    <ul className="tmp-menu link-hover dark-content">
                      <li>
                        <Link href={`/blog`}>Latest Blog</Link>
                      </li>
                      <li>
                        <a href="#">Terms And Condition</a>
                      </li>
                      <li>
                        <Link href={`/contact`}>Contact Us</Link>
                      </li>
                    </ul>
                    <ul className="tmp-menu link-hover light-content">
                      <li>
                        <Link href={`/blog-white`}>Latest Blog</Link>
                      </li>
                      <li>
                        <a href="#">Terms And Condition</a>
                      </li>
                      <li>
                        <Link href={`/contact-white`}>Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 mt_sm--12">
                  <div className="copyright-center text-center">
                    <ul className="social-icon social-default justify-content-center">
                      <li>
                        <a target="_blank" href="https://www.facebook.com/">
                          <i className="fa-brands fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.twitter.com">
                          <i className="fa-brands fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.instagram.com/">
                          <i className="fa-brands fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.linkdin.com/">
                          <i className="fa-brands fa-linkedin-in" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-sm-12 col-12 mt_md--20 mt_sm--20">
                  <div className="copyright-right text-center text-lg-end">
                    <p className="copyright-text">
                      © {new Date().getFullYear()} Copyright All rights reserved{" "}
                      <a
                        target="_blank"
                        href="https://themeforest.net/user/inversweb/portfolio"
                      >
                        Inversweb
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
