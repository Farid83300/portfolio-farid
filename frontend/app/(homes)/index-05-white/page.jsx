import Brands from "@/components/common/Brands";
import Education from "@/components/common/Education";
import Facts from "@/components/common/Facts";
import Pricing from "@/components/common/Pricing";
import Services from "@/components/common/Services";
import Services2 from "@/components/common/Services2";
import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-5/Blogs";
import Hero from "@/components/homes/home-5/Hero";
import Portfolio from "@/components/homes/home-5/Portfolio";
import Testimonials from "@/components/homes/home-5/Testimonials";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 05 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="tmp-white-version">
        <div className="color-primary-2nd">
          <Header1
            darkLogo="/assets/images/logo/white-logo-reeni-2.png"
            lightLogo="/assets/images/logo/logo-white-2.png"
          />
          <Hero />
          <Services isLight />
          <Facts />
          <Services2 />
          <Education />
          <Brands parentClass="our-supported-company-area tmp-section-gap" />
          <Portfolio isLight />
          <Pricing />
          <Testimonials />
          <Blogs isLight />
          <Footer3
            darkLogo="/assets/images/logo/white-logo-reeni-2.png"
            lightLogo="/assets/images/logo/logo-white-2.png"
          />
          <Copyright /> <CommonComponents />
        </div>
      </div>
    </>
  );
}
