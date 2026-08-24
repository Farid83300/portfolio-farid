import React from "react";
import Link from "next/link";
import TyperComponent from "@/components/common/TyperComponent";
import ParticleComponent from "@/components/common/ParticleComponent";
export default function Hero() {
  return (
    <div
      className="tmp-banner-one-area banner-twelve-area with-bg-image style-3"
      id="home"
      data-black-overlay={2}
    >
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="inner text-center">
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2 mb--30">
                  I’m John Lee <br />A{" "}
                  <span className="header-caption">
                    <span className="cd-headline clip is-full-width">
                      <TyperComponent
                        strings={[
                          "Social Influencer",
                          "Youtuber",
                          "Web Designer",
                          "Web Developer",
                          "UI/UX Designer",
                          "Freelancer",
                          "Content Writer",
                        ]}
                      />
                    </span>
                  </span>
                </h1>
                <Link
                  href={`/contact`}
                  className="tmp-btn btn-primary tmp-scroll-trigger tmp-fade-in animation-order-3"
                >
                  Contact Me
                </Link>
                <div className="social-share-style-1">
                  <div className="social-link">
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-whatsapp" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-tiktok" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ParticleComponent
        options={{
          fullScreen: {
            enable: false, // Disable fullscreen
            zIndex: -1, // Optional: Adjust if needed
          },
          particles: {
            number: {
              value: 15,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#ffffff"],
            },
            shape: {
              type: "star",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: { min: 0.3, max: 0.8 }, // Larger particles = more opaque

              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 0.1, max: 3 },
              random: true,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              // out_mode: "out",
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
              // outModes: {
              //   default: "bounce", // or "none" to prevent exiting
              //   bottom: "destroy", // Optional: Destroy particles at bottom edge
              // },
              // bounds: {
              //   top: 0,
              //   left: 0,
              //   right: "100%",
              //   bottom: "100%",
              // },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 800,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          config_demo: {
            hide_card: false,
            background_color: "#b61924",
            background_image: "",
            background_position: "50% 50%",
            background_repeat: "no-repeat",
            background_size: "cover",
          },
        }}
      />
    </div>
  );
}
