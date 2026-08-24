import React from "react";
import Image from "next/image";
import Link from "next/link";
import Demomodal from "../modals/Demomodal";
import Chat from "../common/Chat";
import DemoToggler from "../common/DemoToggler";
import ScrollTop from "../common/ScrollTop";
import Sidebar from "../headers/Sidebar";
import MobileMenu from "../headers/MobileMenu";
import MobileMenuOnepage from "../headers/MobileMenuOnepage";
export default function Footer4({
  darkLogo = "/assets/images/logo/white-logo-reeni.png",
  lightLogo = "/assets/images/logo/logo-white.png",
}) {
  return (
    <>
      <div className="tmp-footer-area footer-style-4 tmp-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-area text-center">
                <div className="logo">
                  <Link href={`/`}>
                    <Image
                      className="logo-dark dark-content"
                      alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                      src={darkLogo}
                      width={121}
                      height={41}
                    />
                    <div
                      className="light-content "
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Image
                        className=""
                        alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                        src={lightLogo}
                        width={121}
                        height={40}
                      />{" "}
                    </div>
                  </Link>
                </div>
                <p className="description mt--30">
                  © {new Date().getFullYear()} . All rights reserved by
                  <a
                    target="_blank"
                    href="https://themeforest.net/user/inversweb/portfolio"
                  >
                    {" "}
                    Inversweb.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
