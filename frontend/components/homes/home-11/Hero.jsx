import React from "react";
import Image from "next/image";
import TyperComponent from "@/components/common/TyperComponent";
import ParticleComponent from "@/components/common/ParticleComponent";
export default function Hero({ isLight = false }) {
  return (
    <div className="tmp-banner-one-area style-4" id="home">
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="inner text-center">
                <div className="thumbnail-author">
                  <Image
                    alt="personal-logo"
                    src="/assets/images/banner/banner-user-image-03.png"
                    width={1360}
                    height={1400}
                  />
                </div>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  I’m John Lee <br />A{" "}
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
                <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4 mt--30 mt_sm--20">
                  <a
                    className="tmp-btn hover-icon-reverse radius-round"
                    href="#"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Download My CV</span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="galaxy" />
      <div className="loader-bg-pattern-wrapper">
        <div className="loader-bg-pattern">
          <div className="box">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 94 94"
                className="svg"
              >
                <path d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z" />
                <path d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z" />
                <path d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z" />
              </svg>
            </div>
          </div>
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
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
      )}
    </div>
  );
}
