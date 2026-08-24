import About from "@/components/common/About";
import Blogs from "@/components/common/Blogs";
import Brands from "@/components/common/Brands";
import Contact from "@/components/common/Contact";
import Pricing from "@/components/common/Pricing";
import TextAnim from "@/components/common/TextAnim";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Educationn from "@/components/common/Education3";
import Hero from "@/components/homes/home-15/Hero";
import Portfolio from "@/components/homes/home-15/Portfolio";
import Services from "@/components/common/Services4";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 15 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      {" "}
      <div className="demo-model tmp-white-version">
        <Header2 />
        <Hero />
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
        <Services />
        <Portfolio isLight />
        <Educationn />
        <Pricing />
        <Blogs isLight />
        <Contact parentClass="get-in-touch-area tmp-section-gapBottom" />
        <Footer1 /> <CommonComponents />
      </div>
    </>
  );
}
