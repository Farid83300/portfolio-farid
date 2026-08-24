import Services3 from "@/components/common/Services3";
import Header2 from "@/components/headers/Header2";
import Education from "@/components/common/Education2";
import About from "@/components/homes/home-9/About";

import Portfolio from "@/components/homes/home-9/Portfolio";
import React from "react";
import Pricing from "@/components/common/Pricing";
import Blogs from "@/components/common/Blogs";
import Contact from "@/components/common/Contact";
import Hero from "@/components/homes/home-11/Hero";
import Footer4 from "@/components/footers/Footer4";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Home 11 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
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
      <Contact parentClass="get-in-touch-area" />
      <Footer4 /> <CommonComponents />
    </>
  );
}
