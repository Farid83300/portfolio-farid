"use client";
import React from "react";
import Nav1 from "./Nav1";
import Link from "next/link";
import Image from "next/image";
import { openSidebar } from "@/utlis/toggleSidebar";
import { openMobilemenu2 } from "@/utlis/toggleMobilemenu";
export default function Header4() {
  return (
    <header className="header-full-width header--sticky">
      <div className="container-fluid-13">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-fluid-main-wrapper">
              <div className="left-area">
                <div className="logo">
                  <Link href={`/`}>
                    <Image
                      className="logo-dark"
                      alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                      src="/assets/images/logo/white-logo-reeni.png"
                      width={121}
                      height={41}
                    />
                    <Image
                      className="logo-white"
                      alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                      src="/assets/images/logo/logo-white.png"
                      width={121}
                      height={40}
                    />
                  </Link>
                </div>
                <nav className="tmp-mainmenu-nav d-none d-xl-block">
                  <Nav1 />
                </nav>
              </div>
              <div className="right-area">
                <Link href={`/contact-white`} className="tmp-btn btn-primary">
                  Contact Me
                </Link>
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
                      onClick={openMobilemenu2}
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
