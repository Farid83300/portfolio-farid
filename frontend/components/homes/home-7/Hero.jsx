import React from "react";
import Image from "next/image";
import Link from "next/link";
import TyperComponent from "@/components/common/TyperComponent";
import ParticleComponent from "@/components/common/ParticleComponent";
export default function Hero({ isLight = false }) {
  return (
    <div className="tmp-banner-one-area" id="home">
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="banner-right-content">
                <Image
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  alt="banner-img"
                  src="/assets/images/banner/banner-user-image-02.png"
                  width={542}
                  height={802}
                />
                <h2 className="banner-big-text-1 up-down">WEB DESIGNER</h2>
                <h2 className="banner-big-text-2 up-down-2">WEB DESIGNER</h2>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Hello
                </span>
                <h1 className="title mt--5 tmp-scroll-trigger tmp-fade-in animation-order-2">
                  i’m Jane Cooper <br />A{" "}
                  <span className="header-caption">
                    <span className="cd-headline clip is-full-width">
                      <TyperComponent
                        strings={[
                          "Web Designer.",
                          "Web Developer.",
                          "UI/UX Designer.",
                          "Freelancer.",
                          "Content Writer.",
                        ]}
                      />
                    </span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                  A personal portfolio is a collection of your work,
                  achievements, and skills that highlights your abilities and
                  professional growth. It serves as
                </p>
                <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <Link
                    className="tmp-btn hover-icon-reverse radius-round"
                    href={`/portfolio-details`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">View Portfolio</span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLight ? (
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
                value: ["#ff014f"],
              },
              shape: {
                type: "edge",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
                polygon: {
                  nb_sides: 4,
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
                value: { min: 0.1, max: 5 },
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
      ) : (
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
                type: "edge",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
                polygon: {
                  nb_sides: 4,
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
                value: { min: 0.1, max: 5 },
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
      )}
    </div>
  );
}
