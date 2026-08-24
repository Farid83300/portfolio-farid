import Brands from "@/components/common/Brands";
import Facts from "@/components/common/Facts";
import Services from "@/components/common/Services";
import Skills from "@/components/common/Skills";
import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/common/Blogs3";
import Education from "@/components/common/Education";
import Hero from "@/components/homes/home-3/Hero";
import Portfolio from "@/components/homes/home-3/Portfolio";
import Pricing from "@/components/common/Pricing";
import Services2 from "@/components/common/Services2";
import Testimonials from "@/components/homes/home-3/Testimonials";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 03 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="color-primary-2nd">
        <Header1
          darkLogo="/assets/images/logo/white-logo-reeni-2.png"
          lightLogo="/assets/images/logo/logo-white-2.png"
        />
        <Hero />
        <Services />
        <Facts />
        <Services2 />
        <Skills />
        <Education />
        <Brands parentClass="our-supported-company-area tmp-section-gap" />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Blogs />
        <Footer3
          darkLogo="/assets/images/logo/white-logo-reeni-2.png"
          lightLogo="/assets/images/logo/logo-white-2.png"
        />
        <Copyright /> <CommonComponents />
      </div>
    </>
  );
}
