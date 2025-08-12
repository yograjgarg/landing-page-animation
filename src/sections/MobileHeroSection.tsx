"use client";

import { FC, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";

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
        y: "100%",
      },
      {
        opacity: 1,
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

  useGSAP(() => {
    const splitDescription = new SplitText(".description-mobile", {
      type: "lines",
    });

    gsap.fromTo(
      splitDescription.lines,
      {
        opacity: 0,
        y: "100%",
        display: "none",
      },
      {
        opacity: 1,
        y: "0%",
        stagger: 0.1,
        display: "block",
      }
    );
  }, [isImageExpanded]);

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

      gsap.fromTo(
        `.description-mobile-${id}`,
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
        opacity: 0,
        zIndex: 0,
        ease: "power1.inOut",
        onComplete: () => {
          setIsImageExpanded(false);
        },
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
            src="/image-1.jpg"
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
          <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[100px] z-20 btn-img-mobile-1 opacity-0 pointer-events-none">
            <img src="/image-1.jpg" alt="" className="size-[px] rounded-full" />
          </div>
          <p className="text-sm text-white w-[280px] z-20 pb-10 description-mobile description-mobile-1 mt-5 opacity-0 pointer-events-none">
            Embracing the philosophy that technology can enhance comfort and
            functionality, we continuosly seek novel ways to elevate their
            seating creations
          </p>

          <p className="text-sm text-white w-[280px] z-20 scroll-down-mobile-1 text-center opacity-0 pointer-events-none">
            Scroll down to explore
          </p>
        </div>
      </div>

      {/* Second section */}

      <div
        className="bg-white h-[25%] border-b-2 flex items-end"
        onClick={() => expandImage(2)}
      >
        <div>
          <img
            src="/image-1.jpg"
            alt="image"
            className="absolute top-[25%] h-1/4 w-full opacity-0 img-2"
          />

          <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp-mobile usp-mobile-2  bottom-0 p-5">
            our <br /> technology
          </p>
        </div>

        <div className="z-30 absolute flex items-center justify-center top-10 h-full flex-col w-full pointer-events-none">
          <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[100px] z-20 btn-img-mobile-2 opacity-0 pointer-events-none">
            <img src="/image-1.jpg" alt="" className="size-[px] rounded-full" />
          </div>
          <p className="text-sm text-white w-[280px] z-20 pb-10 description-mobile description-mobile-2 mt-5 opacity-0 pointer-events-none">
            Embracing the philosophy that technology can enhance comfort and
            functionality, we continuosly seek novel ways to elevate their
            seating creations
          </p>

          <p className="text-sm text-white w-[280px] z-20 scroll-down-mobile-2 text-center opacity-0 pointer-events-none">
            Scroll down to explore
          </p>
        </div>
      </div>

      {/* third section */}

      <div
        className="bg-white h-[25%] border-b-2  flex items-end"
        onClick={() => expandImage(3)}
      >
        <div>
          <img
            src="/image-2.jpg"
            alt="image"
            className="absolute top-[50%] h-1/4 w-full img-3 opacity-0"
          />

          <p className="uppercase text-black usp-mobile usp-mobile-3 bottom-0 p-5 ">
            our <br /> story
          </p>
        </div>

        <div className="z-30 absolute flex items-center justify-center flex-col w-full pointer-events-none h-full top-10">
          <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[100px] z-20 btn-img-mobile-3 opacity-0 pointer-events-none">
            <img
              src="/image-1.jpg"
              alt=""
              className="size-[px] rounded-full pointer-events-none"
            />
          </div>
          <p className="text-sm text-white w-[280px] z-20 pb-10 description-mobile description-mobile-3 mt-5 opacity-0 pointer-events-none">
            Embracing the philosophy that technology can enhance comfort and
            functionality, we continuosly seek novel ways to elevate their
            seating creations
          </p>

          <p className="text-sm text-white w-[280px] z-20 scroll-down-mobile-3 text-center opacity-0 pointer-events-none">
            Scroll down to explore
          </p>
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
              src="/image-2.jpg"
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
          <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[100px] z-20 btn-img-mobile-4 opacity-0 pointer-events-none">
            <img
              src="/image-1.jpg"
              alt=""
              className="size-[px] rounded-full pointer-events-none"
            />
          </div>
          <p className="text-sm text-white w-[280px] z-20 pb-10 description-mobile description-mobile-4 mt-5 opacity-0 pointer-events-none">
            Embracing the philosophy that technology can enhance comfort and
            functionality, we continuosly seek novel ways to elevate their
            seating creations
          </p>

          <p className="text-sm text-white w-[280px] z-20 scroll-down-mobile-4 text-center opacity-0 pointer-events-none">
            Scroll down to explore
          </p>
        </div>
      </div>
    </div>
  );
};
