"use client";
import React from "react";
import Nav1 from "./Nav1";
import Image from "next/image";
import Link from "next/link";
import { openSidebar } from "@/utlis/toggleSidebar";
import { openMobilemenu } from "@/utlis/toggleMobilemenu";
export default function Header1({
  darkLogo = "/assets/images/logo/white-logo-reeni.png",
  lightLogo = "/assets/images/logo/logo-white.png",
}) {
  return (
    <header className="tmp-header-area-start header-one header--sticky header--transparent">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-content">
              <div className="logo">
                <Link href={`/`}>
                  <Image
                    className="logo-dark"
                    alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                    src={darkLogo}
                    width={121}
                    height={41}
                  />
                  <Image
                    className="logo-white"
                    alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                    src={lightLogo}
                    width={121}
                    height={40}
                  />
                </Link>
              </div>
              <nav className="tmp-mainmenu-nav d-none d-xl-block">
                <Nav1 />
              </nav>
              <div className="tmp-header-right">
                <div className="social-share-wrapper d-none d-md-block">
                  <div className="social-link">
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
                <div className="actions-area">
                  <div className="tmp-side-collups-area d-none d-xl-block">
                    <button
                      className="tmp-menu-bars tmp_button_active"
                      onClick={openSidebar}
                    >
                      <i className="fa-regular fa-bars-staggered" />
                    </button>
                  </div>
                  <div className="tmp-side-collups-area d-block d-xl-none">
                    <button
                      className="tmp-menu-bars humberger_menu_active"
                      onClick={openMobilemenu}
                    >
                      <i className="fa-regular fa-bars-staggered" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
