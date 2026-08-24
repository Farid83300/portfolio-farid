import About from "@/components/common/About";
import Blogs from "@/components/common/Blogs";
import Brands from "@/components/common/Brands";
import Contact from "@/components/common/Contact";
import Educationn3 from "@/components/common/Education3";
import Pricing from "@/components/common/Pricing";
import Services4 from "@/components/common/Services4";
import TextAnim from "@/components/common/TextAnim";
import Footer4 from "@/components/footers/Footer4";
import Header2 from "@/components/headers/Header2";
import CommonComponents from "@/components/common/CommonComponents";
import HeroWhite from "@/components/homes/home-16/HeroWhite";
import Portfolio from "@/components/homes/home-16/Portfolio";
import React from "react";

export const metadata = {
  title:
    "Home 16 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="tmp-white-version">
        <div className="demo-fitness-instructor">
          <Header2 />
          <HeroWhite />
          <TextAnim />
          <About />
          <div className="section-title-brand-area tmp-section-gapTop">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head mb--50">
                    <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                      <span className="subtitle">Brand I have Work With</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                      You Can Find Me On
                    </h2>
                    <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
                      Business consulting consultants provide expert advice and
                      guida businesses to help them improve their performance,
                      efficiency, and organizational
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Brands parentClass="our-supported-company-area" />
          <Services4 />
          <Portfolio isLight />
          <Educationn3 />
          <Pricing />
          <Blogs isLight />
          <Contact parentClass="get-in-touch-area" />
          <Footer4 /> <CommonComponents />
        </div>
      </div>
    </>
  );
}
