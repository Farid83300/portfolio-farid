import About from "@/components/common/About";
import Contact from "@/components/common/Contact";
import Experiences2 from "@/components/common/Experiences2";
import Skills3 from "@/components/common/Skills3";
import Testimonials from "@/components/common/Testimonials";
import TextAnim from "@/components/common/TextAnim";
import Copyright from "@/components/footers/Copyright";
import Footer2 from "@/components/footers/Footer2";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-4/Blogs";
import Hero from "@/components/homes/home-4/Hero";
import Portfolio from "@/components/homes/home-4/Portfolio";
import Portfolios2 from "@/components/homes/home-4/Portfolios2";
import Pricing from "@/components/homes/home-4/Pricing";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 04 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="color-primary-3rd">
        <Header1
          darkLogo="/assets/images/logo/white-logo-reeni-3.png"
          lightLogo="/assets/images/logo/logo-white-3.png"
        />
        <Hero />
        <TextAnim />
        <About />
        <Portfolio />
        <Experiences2 />
        <Testimonials />
        <Skills3 />
        <Portfolios2 />
        <Pricing />
        <Contact />
        <Blogs />
        <Footer2
          darkLogo="/assets/images/logo/white-logo-reeni-3.png"
          lightLogo="/assets/images/logo/logo-white-3.png"
        />
        <Copyright /> <CommonComponents />
      </div>
    </>
  );
}
