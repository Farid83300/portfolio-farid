import About from "@/components/common/About";

import Contact from "@/components/common/Contact";
import Facts2 from "@/components/common/Facts2";
import Portofolio from "@/components/common/Portfolio";
import Pricing from "@/components/common/Pricing";

import Skills3 from "@/components/common/Skills3";
import Footer4 from "@/components/footers/Footer4";
import Header2 from "@/components/headers/Header2";

import Hero from "@/components/homes/home-21/Hero";
import Services from "@/components/common/Services5";
import Blogs from "@/components/common/Blogs2";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 21 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="spybody color-blue modern-demo">
        <Header2
          darkLogo="/assets/images/logo/white-logo-reeni-4.png"
          lightLogo="/assets/images/logo/logo-blue-white.svg"
        />
        <Hero />
        <Services parentClass="tmp-service-area tmp-section-gap" />
        <About parentClass="about-us-area tmp-section-gapBottom" />
        <Facts2 />
        <Skills3 />
        <Portofolio />
        <Pricing parentClass="our-price-plan-area tmp-section-gapBottom" />
        <Contact parentClass="get-in-touch-area" />
        <Blogs parentClass="blog-and-news-are tmp-section-gapTop" />
        <Footer4
          darkLogo="/assets/images/logo/white-logo-reeni-4.png"
          lightLogo="/assets/images/logo/logo-blue-white.svg"
        />{" "}
        <CommonComponents />
      </div>
    </>
  );
}
