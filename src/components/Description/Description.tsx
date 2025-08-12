import { cn } from "@/utils/cn";
import { FC } from "react";

interface DescriptionProps {
  text: string;
  parentClass?: string;
}

export const Description: FC<DescriptionProps> = ({
  text,
  parentClass = "",
}) => {
  return (
    <p
      className={cn(
        "text-sm text-white w-[280px] z-20 pb-10 opacity-0 absolute  max-w-[250px] top-72 right-10 pointer-events-none description-mobile md:max-w-[280px] md:bottom-0 md:top-auto md:right-52 lg:right-60 xl:bottom-4 xl:right-[350px]",
        parentClass
      )}
    >
      {text}
    </p>
  );
};
