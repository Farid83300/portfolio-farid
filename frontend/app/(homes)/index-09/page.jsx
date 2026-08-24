import Services3 from "@/components/common/Services3";
import Header2 from "@/components/headers/Header2";
import Education from "@/components/common/Education2";
import About from "@/components/homes/home-9/About";
import Hero from "@/components/homes/home-9/Hero";
import Portfolio from "@/components/homes/home-9/Portfolio";
import React from "react";
import Pricing from "@/components/common/Pricing";
import Blogs from "@/components/common/Blogs";
import Contact from "@/components/common/Contact";
import Footer1 from "@/components/footers/Footer1";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 09 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <Header2 />
      <Hero />
      <About />
      <Services3 />
      <Portfolio />
      <Education />
      <Pricing />
      <Blogs />
      <Contact parentClass="get-in-touch-area tmp-section-gapBottom" />
      <Footer1 /> <CommonComponents />
    </>
  );
}
