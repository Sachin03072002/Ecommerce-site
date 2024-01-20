import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

const HomeSectionCarosel = ({ data, sectionName }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    768: { items: 1 },
    1024: { items: 5.5 },
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
    carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => Math.min(data.length - 1, prevIndex + 1));
    carouselRef.current.slideNext();
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const items = data
    ? data
        .slice(0, 10)
        .map((item) => <HomeSectionCard key={item.id} product={item} />)
    : null;

  return (
    <div className="border p-4 lg:p-8">
      <h2 className="text-xl lg:text-2xl font-extrabold text-gray-800 py-3 lg:py-5">
        {sectionName}
      </h2>

      <div className="relative">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          ref={carouselRef}
        />

        {activeIndex !== items?.length - 1 && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="z-50 bg-white hidden lg:block"
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translateY(-50%) rotate(90deg)",
            }}
            aria-label="next"
          >
            <ChevronLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}

        {activeIndex !== 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50 bg-white hidden lg:block"
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              transform: "translateY(-50%) rotate(-90deg)",
            }}
            aria-label="prev"
          >
            <ChevronLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
