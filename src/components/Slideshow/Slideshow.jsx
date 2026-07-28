import React, { useState, useEffect } from "react";
import './Slideshow.css'
import { ArrowRight, ArrowLeft } from "lucide-react";

const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const previousIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(previousIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const nextIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button className="arrowStylesLeft" onClick={goToPrevious} aria-label="Previous slide">
        <ArrowLeft />
      </button>
      <button className="arrowStylesRight" onClick={goToNext} aria-label="Next slide">
        <ArrowRight />
      </button>

      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image}
          alt=""
          className={`slideshow-images ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      <div className="slideshow-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;