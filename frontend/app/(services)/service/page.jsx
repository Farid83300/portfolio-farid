import Pricing from "@/components/common/Pricing";
import Copyright from "@/components/footers/Copyright";

import Footer3 from "@/components/footers/Footer3";

import Header1 from "@/components/headers/Header1";
import Services from "@/components/services/Services";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Services || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <Header1 />
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">Service</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item">
                    <Link href={`/`}>Home</Link>
                  </li>
                  <li className="icon">
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li className="tmp-breadcrumb-item active">Service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <Pricing parentClass="our-price-plan-area tmp-section-gapBottom" />
      <Footer3 />
      <Copyright /> <CommonComponents />
    </>
  );
}
