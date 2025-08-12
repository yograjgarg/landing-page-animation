import { cn } from "@/utils/cn";
import { FC } from "react";

interface ScrollToExploreProps {
  text: string;
  parentClass?: string;
}

export const ScrollToExplore: FC<ScrollToExploreProps> = ({
  text,
  parentClass = "",
}) => (
  <p
    className={cn(
    "text-sm text-white absolute z-20 opacity-0 text-center right-5 top-[420px] pointer-events-none hidden md:block md:w-[280px] md:bottom-6 md:-right-10 md:top-auto md:text-left md:pointer-events-auto lg:bottom-10",
      parentClass
    )}
  >
    {text}
  </p>
);
