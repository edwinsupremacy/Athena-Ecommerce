import React from "react";
import { useState,useEffect } from "react";
import './Slideshow.css'
import {  ArrowRight, ArrowLeft } from "lucide-react";

const Slideshow = ({slides}) => {
  const [currentIndex,setCurrentIndex] = useState(0);
  const goToPrevious = ()=>{
    const isFirstSlide= currentIndex === 0;
    const previousIndex = isFirstSlide ? slides.length -1 : currentIndex -1;
    setCurrentIndex(previousIndex);
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length-1;
    const nextIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex)
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <div className="slideshow">
      <div className="arrowStylesLeft" onClick={goToPrevious}>< ArrowLeft /></div>
      <div className="arrowStylesRight" onClick={goToNext}>< ArrowRight /></div>
      {slides.length > 0 && (
      <img key={currentIndex} src={slides[currentIndex].image} alt="" className="slideshow-images"/>
      )}
    </div>
  );
};

export default Slideshow;
