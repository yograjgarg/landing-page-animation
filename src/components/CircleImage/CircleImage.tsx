import { cn } from "@/utils/cn";
import { FC } from "react";

interface CircleImageProps {
  image: string;
  parentClass?: string;
  imageClass?: string;
}

export const CircleImage: FC<CircleImageProps> = ({
  image,
  parentClass = "",
  imageClass = "",
}) => {
  return (
    <div
      className={cn(
        "items-center justify-center bg-white overflow-hidden rounded-full z-20 opacity-0 absolute size-[100px] p-4 pointer-events-none top-[168px] right-5 hidden md:block md:size-[150px] md:right-32 md:bottom-40 md:top-auto md:p-0 md:pointer-events-auto lg:size-[220px] xl:size-[200px] xl:right-52 xl:top-1/2 xl:-translate-y-1/2",
        parentClass
      )}
    >
      <img
        src={image}
        alt="product_details"
        className={cn("rounded-full", imageClass)}
      />
    </div>
  );
};
