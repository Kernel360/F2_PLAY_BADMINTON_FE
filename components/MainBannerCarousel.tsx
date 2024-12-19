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
            <CarouselItem key={url} className="w-full">
              <img
                src={`${url}`}
                alt={`banner ${index + 1}`}
                className="w-full h-auto max-h-[346px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center space-x-2 mt-4 gap-2">
        {Array.from({ length: count }).map((number, index) => (
          <button
            type="button"
            key={`dots-${number}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === current ? "bg-primary" : "bg-gray-300"
            } md:w-3 md:h-3`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default MainBannerCarousel;
