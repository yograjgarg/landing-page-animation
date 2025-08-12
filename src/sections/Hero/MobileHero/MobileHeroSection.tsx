"use client";

import { FC, useEffect, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";
import { Description } from "@/components/Description/Description";
import { CircleImage } from "@/components/CircleImage/CircleImage";
import { ScrollToExplore } from "@/components/Button/ScrollToExplore";

gsap.registerPlugin(useGSAP, SplitText);

export const MobileHeroSection: FC = () => {
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);

  useGSAP(() => {
    const splitUspText = new SplitText(".usp-mobile", { type: "lines" });

    // Animate USP (OUR APPROACH, OUR TECHNOLOGY etc)
    gsap.fromTo(
      splitUspText.lines,
      {
        opacity: 0,
        visibility: "hidden",
        y: "100%",
      },
      {
        opacity: 1,
        visibility: "visible",
        y: "0%",
        stagger: 0.15,
      }
    );

    const tl = gsap.timeline();
    tl.fromTo(
      ".explore-btn",
      { x: "-200px", scale: 0.3, opacity: 0 },
      { x: "0px", scale: 1, opacity: 1, duration: 0.1, ease: "power1.out" }
    )

      .to(".explore-btn", { duration: 0.2 })

      .to(".explore-btn", {
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
  }, []);

  const descriptionTimeline = gsap.timeline();
  const expandImage = (id: number) => {
    if (!isImageExpanded) {
      gsap.to(`.img-${id}`, {
        height: "100%",
        top: 0,
        opacity: 1,
        zIndex: 20,
        ease: "power1.inOut",
        onComplete: () => {
          setIsImageExpanded(true);
        },
      });

      gsap.to(`.usp-mobile-${id}`, {
        color: "white",
        zIndex: 20,
        position: "absolute",
        bottom: 0,
      });

      gsap.to(".mobile-tag-line, .mobile-brand-name, .heading", {
        color: "white",
      });

      gsap.fromTo(
        `.btn-img-mobile-${id}`,
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
          const split = new SplitText(`.description-mobile-${id}`, {
            type: "lines",
          });
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
          `.description-mobile-${id}`,
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
        `.scroll-down-mobile-${id}`,
        {
          opacity: 0,
          scale: 0,
          display: "none",
        },
        {
          opacity: 1,
          scale: 1,
          display: "block",
          delay: 0.3,
        }
      );
    } else {
      const topPosition = ["0%", "25%", "50%", "75%"];

      gsap.to(`.img-${id}`, {
        height: "25%",
        top: topPosition[id - 1],
        duration: 0.8,
        zIndex: 0,
        ease: "power1.inOut",
        onComplete: () => {
          setIsImageExpanded(false);
        },
      });

      gsap.to(`.img-${id}`, {
        opacity: 0,
        delay: 0.8,
      });

      gsap.to(`.usp-mobile-${id}`, {
        translateY: "0%",
        color: "black",
        zIndex: 0,
        position: "relative",
      });

      gsap.to(".mobile-tag-line, .mobile-brand-name, .heading", {
        color: "black",
      });

      gsap.fromTo(
        `.btn-img-mobile-${id}`,

        {
          opacity: 1,
          scale: 1,
          rotation: "0px",
          display: "flex",

          delay: 0.3,
        },
        {
          opacity: 0,
          scale: 0,
          rotation: "-100px",
          display: "none",
        }
      );

      gsap.fromTo(
        `.description-mobile-${id}`,
        {
          x: "0%",
          opacity: 1,
        },
        {
          x: "-100%",
          opacity: 0,
          onComplete: () => {
            gsap.set(`.description-mobile-${id}`, {
              x: "0%",
              opacity: 0,
            });
          },
        }
      );

      gsap.fromTo(
        `.scroll-down-mobile-${id}`,
        {
          opacity: 1,
          scale: 1,
          display: "block",
          delay: 0.3,
        },
        {
          opacity: 0,
          scale: 0,
          display: "none",
        }
      );
    }
  };
  return (
    <div className="flex flex-col h-[100dvh] w-screen relative overflow-hidden md:hidden">
      {/* First section */}
      <div
        className="bg-white h-[25%] border-b-2 "
        onClick={() => expandImage(1)}
      >
        <div className="h-full">
          <img
            src="/images/chair1.jpg"
            alt="image"
            className="absolute top-0 h-[25%] w-full opacity-0 img-1"
          />

          <div className="flex flex-col justify-between h-full p-5">
            <div className="flex justify-between">
              <p className="text-black text-sm brand-name mobile-brand-name z-40">
                Visionary
              </p>
              <p className="text-black text-sm tag-line mobile-tag-line z-40">
                Where Form <br /> and Function Unite
              </p>
            </div>

            <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp-mobile usp-mobile-1">
              our <br /> approach
            </p>
          </div>
        </div>

        <div className="z-30 absolute flex items-center justify-center h-full top-10 flex-col w-full pointer-events-none">
          <CircleImage
            image={"/images/thumbnailchair1.jpg"}
            parentClass="btn-img-mobile-1"
          />
          <Description
            text={
              "Guided by a passionate pursuit of redefining the way people experience comfort, our visionary approach is deeply rooted in three core principles: Artistry, Functionality, and Human-Centric Design."
            }
            parentClass="description-mobile-1 description-mobile"
          />

          <ScrollToExplore
            text={"Scroll down to explore"}
            parentClass="scroll-down-mobile-1"
          />
        </div>
      </div>

      {/* Second section */}

      <div
        className="bg-white h-[25%] border-b-2 flex items-end"
        onClick={() => expandImage(2)}
      >
        <div>
          <img
            src="/images/chair2.jpg"
            alt="image"
            className="absolute top-[25%] h-1/4 w-full opacity-0 img-2"
          />

          <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp-mobile usp-mobile-2  bottom-0 p-5">
            our <br /> technology
          </p>
        </div>

        <div className="z-30 absolute flex items-center justify-center top-10 h-full flex-col w-full pointer-events-none">
          <CircleImage
            image={"/images/thumbnailchair2.jpg"}
            parentClass="btn-img-mobile-2"
          />

          <Description
            text={
              "Embracing the philosophy that technology can enhance comfort and functionality, we continuosly seek novel ways to elevate their seating creations"
            }
            parentClass="description-mobile-2 description-mobile"
          />

          <ScrollToExplore
            text={"Scroll down to explore"}
            parentClass="scroll-down-mobile-2"
          />
        </div>
      </div>

      {/* third section */}

      <div
        className="bg-white h-[25%] border-b-2  flex items-end"
        onClick={() => expandImage(3)}
      >
        <div>
          <img
            src="/images/chair3.jpg"
            alt="image"
            className="absolute top-[50%] h-1/4 w-full img-3 opacity-0"
          />

          <p className="uppercase text-black usp-mobile usp-mobile-3 bottom-0 p-5 ">
            our <br /> story
          </p>
        </div>

        <div className="z-30 absolute flex items-center justify-center flex-col w-full pointer-events-none h-full top-10">
          <CircleImage
            image={"/images/thumbnailchair3.jpg"}
            parentClass="btn-img-mobile-3"
          />

          <Description
            text={
              "It all began when a group of visionary designers, engineers, and artist came together with a shared vision: to create chairs that transcended mere functionality and become captivating works of art."
            }
            parentClass="description-mobile-3 description-mobile"
          />

          <ScrollToExplore
            text={"Scroll down to explore"}
            parentClass="scroll-down-mobile-3"
          />
        </div>
      </div>

      {/* Forth Section */}
      <div
        className="bg-white h-[25%]  flex items-end"
        onClick={() => expandImage(4)}
      >
        <div className="flex items-end justify-between">
          <>
            <img
              src="/images/chair4.jpg"
              alt="image"
              className="absolute top-[75%] h-1/4 w-full opacity-0 img-4 "
            />

            <div className="uppercase text-black  usp-mobile usp-mobile-4 p-5">
              our <br /> <div>design team</div>
            </div>
          </>

          <div className=" w-[60%] p-5 z-30">
            <p className="uppercase text-black heading z-40">
              Elevating comfort with every curve
            </p>
            <button
              className={`opacity-0 uppercase text-black border rounded-full size-8 mt-5 translate-x-1/2 explore-btn z-40 transition-colors duration-300 ease-in-out  delay-250 ${
                isImageExpanded
                  ? "border-white bg-white"
                  : "border-black bg-transparent"
              }`}
            >
              <span className="text-xs tracking-tight text-nowrap btn-text block opacity-0">
                Explore experience
              </span>
            </button>
          </div>
        </div>

        <div className="z-30 absolute flex items-center justify-center flex-col w-full pointer-events-none h-full top-10">
          <CircleImage
            image={"/images/thumbnailchair4.jpg"}
            parentClass="btn-img-mobile-4 "
          />

          <Description
            text={
              "United by love for creativity and innovation, our team is the driving force behind the brand's success and the creation of extraordinary seating solution."
            }
            parentClass="description-mobile-4 description-mobile"
          />

          <ScrollToExplore
            text={"Scroll down to explore"}
            parentClass="scroll-down-mobile-4"
          />
        </div>
      </div>
    </div>
  );
};
