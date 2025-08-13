"use client";

import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MobileHeroSection } from "@/sections/Hero/MobileHero/MobileHeroSection";

import { WebHeroSection } from "@/sections/Hero/WebHero/WebHeroSection";
import { useEffect } from "react";

gsap.registerPlugin(useGSAP, SplitText, MotionPathPlugin);

const Home = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    const splitUspText = new SplitText(".usp", { type: "lines" });
    const splitBrandName = new SplitText(".brand-name", { type: "chars" });
    const splitTagLine = new SplitText(".tag-line", { type: "lines" });

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

  // Handle window resize to prevent animation
  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <WebHeroSection />
      <MobileHeroSection />
    </>
  );
};

export default Home;
