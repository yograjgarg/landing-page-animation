"use client";

import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef, useState } from "react";
import { MobileHeroSection } from "@/sections/MobileHeroSection";

gsap.registerPlugin(useGSAP, SplitText, MotionPathPlugin);

const Home = () => {
  const [isImageAnimationStarted, setIsImageAnimationStarted] =
    useState<boolean>(false);

  const [isGridExpanded, setIsGridExpanded] = useState<boolean>(false);

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
    console.log(id)
    gsap.killTweensOf(`.img-${id}`);

    if (!isGridExpanded) {
      gsap.to(`.img-${id}`, {
        y: window.innerWidth > 1280 ? "0%" : undefined,
        duration: 0.8,
        ease: "power1.inOut",
        opacity: 1,
      });
    }
  };

  const handleLeave = (id: number) => {
    gsap.killTweensOf(`.img-${id}`); // stop enter animation if still running

    if (!isGridExpanded) {
      gsap.to(`.img-${id}`, {
        y: window.innerWidth > 1280 ? "-100%" : undefined,
        // y: "-100%",
        duration: 0.8,
        ease: "power1.inOut",
        opacity: 0,
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
  const expandItem = (id: number) => {
    tl.to(`.img-${id}`, {
      width: "100%",
      left: 0,
      opacity: 1,
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

    gsap.fromTo(
      `.description-${id}`,
      {
        opacity: 0,
        y: "40%",
        display: "none",
      },
      {
        opacity: 1,
        y: "0%",
        display: "inline",
        stagger: 0.5,
        ease: "power1.inOut",
      }
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

    setIsGridExpanded(true);
  };

  const collapaseItem = (id: number) => {
    const leftPosition = ["0%", "25%", "50%", "75%"];

    tl.to(`.img-${id}`, {
      width: "25%",
      left: leftPosition[id - 1],
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
            display: "none",
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

    setIsGridExpanded(false);
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
                src="/image-1.jpg"
                alt="image"
                className="absolute inset-0 h-full img-1 w-[25%] z-10  xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black lg:text-2xl xl:text-4xl usp usp-1 absolute bottom-0 z-20 p-5">
                our <br /> approach
              </p>
            </div>

            {/* Description */}
            <div className="">
              <p className="text-sm text-white w-[280px] absolute bottom-0 xl:bottom-4 md:right-52 lg:right-60 xl:right-[350px] z-20 pb-10 description-1 hidden">
                Guided by a passionate pursuit of redefining the way people
                experience comfort, our visionary approach is deeply rooted in
                three core principles: Artistry, Functionality, and
                Human-Centric Design.
              </p>

              <p className="text-sm text-white w-[280px] absolute bottom-10 -right-24 lg:-right-20 xl:-right-10 z-20 scroll-down-1 opacity-0 hidden">
                Scroll down to explore
              </p>

              <div className="items-center justify-center bg-white overflow-hidden rounded-full md:size-[150px] lg:size-[220px] xl:size-[200px] z-20 absolute right-32 xl:right-52 bottom-40 xl:top-1/2 xl:-translate-y-1/2 img-btn-1 opacity-0 hidden">
                <img
                  src="/image-2.jpg"
                  alt=""
                  className="size-[px] rounded-full"
                />
              </div>
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
                src="/image-1.jpg"
                alt="image"
                className="absolute inset-0 left-[25%] h-full img-2 w-[25%] xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp usp-2 absolute bottom-0 p-5">
                our <br /> Technology
              </p>
            </div>

            <div className="">
              <p className="text-sm text-white w-[280px] absolute bottom-20 right-[450px] z-20 pb-10 description-2 hidden">
                Embracing the philosophy that technology can enhance comfort and
                functionality, we continuosly seek novel ways to elevate their
                seating creations
              </p>

              <p className="text-sm text-white w-[280px] absolute bottom-10 right-0 z-20 scroll-down-2 opacity-0 hidden">
                Scroll down to explore
              </p>

              <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[180px] z-20 absolute right-32 top-1/2 -translate-y-1/2 img-btn-2 opacity-0 hidden">
                <img
                  src="/image-1.jpg"
                  alt=""
                  className="size-[px] rounded-full"
                />
              </div>
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
                src="/image-1.jpg"
                alt="image"
                className="absolute inset-0 left-[50%] h-full img-3 w-[25%] xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp usp-3 absolute bottom-0 p-5">
                our <br /> story
              </p>
            </div>

            <div className="">
              <p className="text-sm text-white w-[280px] absolute bottom-20 right-[450px] z-20 pb-10 description-3 hidden">
                It all began when a group of visionary designers, engineers, and
                artist came together with a shared vision: to create chairs that
                transcended mere functionality and become captivating works of
                art.
              </p>

              <p className="text-sm text-white w-[280px] absolute bottom-10 right-0 z-20 scroll-down-3 opacity-0 hidden">
                Scroll down to explore
              </p>

              <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[180px] z-20 absolute right-32 top-1/2 -translate-y-1/2 img-btn-3 opacity-0 hidden">
                <img
                  src="/image-1.jpg"
                  alt=""
                  className="size-[px] rounded-full"
                />
              </div>
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
                src="/image-2.jpg"
                alt="image"
                className="absolute inset-0 left-[75%] h-full img-4 w-[25%] xl:translate-y-full opacity-0"
              />

              <p className="uppercase text-black  lg:text-2xl xl:text-4xl usp usp-4 absolute bottom-0 p-5">
                our <br /> <span className="block"> design team</span>
              </p>
            </div>
            <div className="">
              <p className="text-sm text-white w-[280px] absolute bottom-20 right-[450px] z-20 pb-10 description-4 hidden">
                United by love for creativity and innovation, our team is the
                driving force behind the brand's success and the creation of
                extraordinary seating solution.
              </p>

              <p className="text-sm text-white w-[280px] absolute bottom-10 right-0 z-20 scroll-down-4 opacity-0 hidden">
                Scroll down to explore
              </p>

              <div className="items-center justify-center bg-white p-4 overflow-hidden rounded-full size-[180px] z-20 absolute right-32 top-1/2 -translate-y-1/2 img-btn-4 opacity-0 hidden">
                <img
                  src="/image-1.jpg"
                  alt=""
                  className="size-[px] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 w-[40%] left-[50%] p-5 z-30">
          {/* <svg
      id="path"
      viewBox="0 0 200 500"
      width="200"
      height="500"
      style={{ border: "1px solid #ccc" }}
    >
      <path
        d="
        M 100 900 Q 120 450, 100 400  T 100 300 T 100 200 T 100 100 T 100 0       "
        stroke="blue"
        fill="transparent"
        strokeWidth="3"
      />
    </svg> */}
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
