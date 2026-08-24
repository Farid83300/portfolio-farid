import Image from "next/image";

export default function TextAnim() {
  return (
    <div className="about-content-area">
      <div className="container tmp-section-gap">
        <div className="text-para-doc-wrap">
          <h2 className="text-para-documents tmp-scroll-trigger tmp-fade-in inv-title-animation-wrap animation-order-1">
            A personal <span>portfolio</span> is a collection of your work, that
            is aa go achievements, and skills that highlights{" "}
            <span>web design</span> in your is abilities and professional
            growth. It serves as A personal to a portfolio in
            <span> since 2009</span> a collection of your work
          </h2>
          <div className="right-bg-text-para">
            <Image
              alt=""
              src="/assets/images/banner/right-bg-text-para-doc.png"
              width={614}
              height={268}
            />
          </div>
          <div className="left-bg-text-para">
            <Image
              alt=""
              src="/assets/images/banner/left-bg-text-para-doc.png"
              width={614}
              height={268}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
