import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const imageUrl = [
  "/images/banner-rules.png",
  "/images/banner-process.png",
  "/images/banner-polite.png",
  "/images/banner-match.png",
];

function MainBannerCarousel() {
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <section>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {imageUrl.map((url, index) => (
            <CarouselItem key={url} className="w-full h-[346px]">
              <img
                src={`${url}`}
                alt={`banner ${index + 1}`}
                className="w-[1048px] h-[346px] object-fit rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center space-x-2 mt-4 gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            type="button"
            key={`dots-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === current ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default MainBannerCarousel;
