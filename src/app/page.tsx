"use client";

import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { FC, useEffect, useRef, useState } from "react";
import { MobileHeroSection } from "@/sections/Hero/MobileHero/MobileHeroSection";
import { cn } from "@/utils/cn";
import { Description } from "@/components/Description/Description";
import { CircleImage } from "@/components/CircleImage/CircleImage";
import { ScrollToExplore } from "@/components/Button/ScrollToExplore";

gsap.registerPlugin(useGSAP, SplitText, MotionPathPlugin);

const Home = () => {
  const [isGridExpanded, setIsGridExpanded] = useState<boolean>(false);

  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    const splitUspText = new SplitText(".usp", { type: "lines" });
    const splitBrandName = new SplitText(".brand-name", { type: "chars" });
    const splitTagLine = new SplitText(".tag-line", { type: "lines" });
    const splitHeading = new SplitText(".heading", { type: "words" });

    // Animate USP (OUR APPROACH, OUR TECHNOLOGY etc)
    gsap.fromTo(
      splitUspText.lines,
      {
        opacity: 0,
        y: "100%",
      },
      {
        opacity: 1,
        y: "0%",
        stagger: 0.15,
      }
    );

    // Animate tagline  (Where form and...)
    gsap.fromTo(
      splitTagLine.lines,
      {
        opacity: 0,
        y: "100%",
      },
      {
        opacity: 1,
        y: "0%",
        stagger: 0.15,
        delay: 0.5,
      }
    );

    // Animate logo text  (visionary)
    gsap.fromTo(
      splitBrandName.chars,
      {
        opacity: 0,
        y: "50%",
      },
      {
        opacity: 1,
        y: "0%",
        stagger: 0.03,
        ease: "easyin.out",
      }
    );

    // TODO: Create wavy effect
    // gsap.fromTo(
    //   splitHeading.words,
    //   {
    //     opacity: 0,
    //   },
    //   {
    //     motionPath: "  M 200 500 Q 120 450, 100 400  T 100 300 T 100 200",
    //     opacity: 1,

    //     stagger: 0.4,
    //     delay: 1,
    //   }
    // );

    // Animate button
    tl.fromTo(
      ".btn",
      { x: "-200px", scale: 0.3, opacity: 0 },
      { x: "0px", scale: 1, opacity: 1, duration: 0.1, ease: "power1.out" }
    )

      .to(".btn", { duration: 0.2 })

      .to(".btn", {
        width: "160px",
        duration: 1,
        ease: "power2.out",
      })

      .fromTo(
        ".btn-text",
        { y: "-50%", opacity: 0 },
        { y: "0%", opacity: 1, delay: 0.5, duration: 0.8, ease: "power2.out" },
        "-=0.5" // start before width animation ends
      );
  });

  const handleEnter = (id: number) => {
    if (!isGridExpanded) {
      gsap.killTweensOf(`.img-${id}`);

      gsap.to(`.img-${id}`, {
        y: window.innerWidth > 1280 ? "0%" : undefined,
        duration: 0.8,
        ease: "power1.inOut",
        opacity: 1,
      });
    }
  };

  const handleLeave = (id: number) => {
    if (!isGridExpanded) {
      gsap.killTweensOf(`.img-${id}`);

      gsap.to(`.img-${id}`, {
        y: window.innerWidth > 1280 ? "-100%" : undefined,
        // y: "-100%",
        duration: 0.8,
        ease: "power1.inOut",
        // opacity: 0,
        onComplete: () => {
          // Instantly reset to bottom for next hover
          gsap.set(`.img-${id}`, {
            y: window.innerWidth > 1280 ? "100%" : undefined,
            opacity: 0,
          });
        },
      });
    }
  };

  const tl = gsap.timeline({ ease: "power3.inOut" });
  const descriptionTimeline = gsap.timeline();

  const expandItem = (id: number) => {
    tl.to(`.img-${id}`, {
      width: "100%",
      left: 0,
      // opacity: 1,
      zIndex: 20,
      onComplete: () => {
        setIsGridExpanded(true);
      },
    })
      .to(
        `.usp:not(.usp-${id})`,
        {
          y: "100%",
          opacity: 0,
        },
        "-=0.5"
      )
      .to(
        ".heading, .tag-line, .brand-name",
        {
          color: "white",
        },
        "-=0.5"
      )
      .to(
        `.usp-${id}`,
        {
          left: 0,
          color: "white",
        },
        "-=0.5"
      );

    gsap.fromTo(
      `.img-btn-${id}`,
      {
        opacity: 0,
        scale: 0,
        rotation: "-100px",
        display: "none",
      },
      {
        opacity: 1,
        scale: 1,
        rotation: "0px",
        display: "flex",

        delay: 0.3,
      }
    );

    descriptionTimeline
      .call(() => {
        const split = new SplitText(`.description-${id}`, { type: "lines" });
        gsap.fromTo(
          split.lines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          }
        ),
          0;
      })
      .fromTo(
        `.description-${id}`,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power1.inOut",
        },
        0
      );

    gsap.fromTo(
      `.scroll-down-${id}`,
      {
        opacity: 0,
        y: "-400%",
        delay: 0.6,
        display: "none",
      },
      {
        opacity: 1,
        y: "0%",
        display: "block",
      }
    );
  };

  const collapaseItem = (id: number) => {
    const leftPosition = ["0%", "25%", "50%", "75%"];

    tl.to(`.img-${id}`, {
      width: "25%",
      left: leftPosition[id - 1],
      zIndex: 0,
      onComplete: () => {
        setIsGridExpanded(false);
      },
    })
      // .to(`.img-${id}`, { opacity: 0 })
      .to(
        `.usp:not(.usp-${id})`,
        {
          y: "0%",
          opacity: 1,
        },
        "-=0.5"
      )
      .to(
        ".heading, .tag-line, .brand-name",
        {
          color: "black",
        },
        "-=0.5"
      )
      .to(
        `.usp-${id}`,
        {
          left: leftPosition[id - 1],
          color: "black",
        },
        "-=0.5"
      );

    gsap.fromTo(
      `.img-btn-${id}`,
      {
        x: "0%",
        opacity: 1,
      },
      {
        x: "100%",
        opacity: 0,
        onComplete: () => {
          gsap.set(`.img-btn-${id}`, { opacity: 0, x: "0%", display: "none" });
        },
      }
    );

    gsap.fromTo(
      `.description-${id}`,
      {
        x: "0%",
        opacity: 1,
      },
      {
        x: "100%",
        opacity: 0,
        onComplete: () => {
          gsap.set(`.description-${id}`, {
            x: "0%",
            opacity: 0,
          });
        },
      }
    );

    gsap.fromTo(
      `.scroll-down-${id}`,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        x: "100%",
        onComplete: () => {
          gsap.set(`.scroll-down-${id}`, { x: "0%", display: "none" });
        },
      }
    );
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-white relative overflow-hidden hidden md:block"
        ref={container}
      >
        <div className="flex h-full relative">
          <div
            className=" flex flex-col justify-between w-[25%] border-r-2 border-gray-200"
            onMouseEnter={() => handleEnter(1)}
            onMouseLeave={() => handleLeave(1)}
            onClick={() => {
              if (!isGridExpanded) {
                expandItem(1);
              } else {
                collapaseItem(1);
              }
            }}
          >
            <p className="text-black text-sm brand-name z-40 p-5">Visionary</p>
            <div>
              <img
                src="/images/chair1.jpg"
                alt="image"
                className="absolute inset-0 h-full img-1 w-[25%] z-10  xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black lg:text-2xl xl:text-4xl usp usp-1 absolute bottom-0 z-30 p-5">
                our <br /> approach
              </p>
            </div>

            <div className="">
              <Description
                text={
                  "Guided by a passionate pursuit of redefining the way people experience comfort, our visionary approach is deeply rooted in three core principles: Artistry, Functionality, and Human-Centric Design."
                }
                parentClass="description-1 description"
              />

              <ScrollToExplore
                text={"Scroll down to explore"}
                parentClass="scroll-down-1"
              />

              <CircleImage
                image={"/images/thumbnailchair1.jpg"}
                parentClass="img-btn-1"
              />
            </div>
          </div>
          <div
            className="overflow-hidden flex flex-col justify-between w-[25%] border-r-2 border-gray-200"
            onMouseEnter={() => handleEnter(2)}
            onMouseLeave={() => handleLeave(2)}
            onClick={() => {
              if (!isGridExpanded) {
                expandItem(2);
              } else {
                collapaseItem(2);
              }
            }}
          >
            <p className="text-black md:text-sm lg:text-base tag-line z-40 p-5">
              Where Form <br /> and Function Unite
            </p>

            <div>
              <img
                src="/images/chair2.jpg"
                alt="image"
                className="absolute inset-0 left-[25%] h-full img-2 w-[25%] xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp usp-2 absolute bottom-0 p-5 z-30">
                our <br /> Technology
              </p>
            </div>

            <div className="">
              <Description
                text={
                  "Embracing the philosophy that technology can enhance comfort and functionality, we continuosly seek novel ways to elevate their seating creations"
                }
                parentClass="description-2 description"
              />

              <ScrollToExplore
                text={"Scroll down to explore"}
                parentClass="scroll-down-2"
              />

              <CircleImage
                image={"/images/thumbnailchair2.jpg"}
                parentClass="img-btn-2"
              />
            </div>
          </div>

          <div
            className=" flex flex-col justify-between w-[25%] border-r-2 border-gray-200 "
            onMouseEnter={() => handleEnter(3)}
            onMouseLeave={() => handleLeave(3)}
            onClick={() => {
              if (!isGridExpanded) {
                expandItem(3);
              } else {
                collapaseItem(3);
              }
            }}
          >
            <div>
              <img
                src="/images/chair3.jpg"
                alt="image"
                className="absolute inset-0 left-[50%] h-full img-3 w-[25%] xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp usp-3 absolute bottom-0 p-5 z-30">
                our <br /> story
              </p>
            </div>

            <div className="">
              <Description
                text={
                  "It all began when a group of visionary designers, engineers, and artist came together with a shared vision: to create chairs that transcended mere functionality and become captivating works of art."
                }
                parentClass="description-3 description"
              />
              <ScrollToExplore
                text={"Scroll down to explore"}
                parentClass="scroll-down-3"
              />

              <CircleImage
                image={"/images/thumbnailchair3.jpg"}
                parentClass="img-btn-3"
              />
            </div>
          </div>
          <div
            className=" w-[25%]"
            onMouseEnter={() => handleEnter(4)}
            onMouseLeave={() => handleLeave(4)}
            onClick={() => {
              if (!isGridExpanded) {
                expandItem(4);
              } else {
                collapaseItem(4);
              }
            }}
          >
            <p className="capitalize text-black"></p>

            <div>
              <img
                src="/images/chair4.jpg"
                alt="image"
                className="absolute inset-0 left-[75%] h-full img-4 w-[25%] xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp usp-4 absolute bottom-0 p-5 z-30">
                our <br /> <span className="block"> design team</span>
              </p>
            </div>
            <div className="">
              <Description
                text={
                  "United by love for creativity and innovation, our team is the driving force behind the brand's success and the creation of extraordinary seating solution."
                }
                parentClass="description-4 description"
              />

              <ScrollToExplore
                text={"Scroll down to explore"}
                parentClass="scroll-down-4"
              />
              <CircleImage
                image={"/images/thumbnailchair4.jpg"}
                parentClass="img-btn-4"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-0 w-[40%] left-[50%] p-5 z-30">
          <p className="uppercase text-black md:text-2xl lg:text-3xl xl:text-5xl heading z-40">
            Elevating comfort with every curve
          </p>
          <button
            className={`uppercase text-black border rounded-full size-8 mt-10 translate-x-1/2 btn z-40 transition-colors duration-300 ease-in-out  delay-250 ${
              isGridExpanded
                ? "border-white bg-white"
                : "border-black bg-transparent"
            }`}
          >
            <span className="text-xs tracking-tight text-nowrap btn-text block opacity-0 ">
              Explore experience
            </span>
          </button>
        </div>
      </div>

      <MobileHeroSection />
    </>
  );
};

export default Home;
