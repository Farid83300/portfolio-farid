import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Projects from "@/components/projects/Projects";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
export const metadata = {
  title:
    "Project || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <div className="project inner">
        <Header1 />
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title split-collab">Project</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href={`/`}>Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Projects />
        <Footer3 />
        <Copyright /> <CommonComponents />
      </div>
    </>
  );
}
