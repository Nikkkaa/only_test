import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { timelineData } from '../data/timelineData';
import { TIMELINE_CONSTANTS } from '../constants/timeline';
import { Swiper } from 'swiper/types';

export const useTimeline = () => {
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper>(null);

  const currentData = timelineData[currentPeriod];
  const totalPeriods = timelineData.length;

  const handlePeriodChange = (newPeriod: number) => {
    if (isAnimating || newPeriod === currentPeriod) return;

    setIsAnimating(true);
    setCurrentPeriod(newPeriod);

    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }

    setTimeout(() => setIsAnimating(false), TIMELINE_CONSTANTS.ANIMATION_DURATION);
  };

  const handlePrev = () => {
    if (currentPeriod > 0) {
      const newPeriod = currentPeriod - 1;
      handlePeriodChange(newPeriod);
    }
  };

  const handleNext = () => {
    if (currentPeriod < totalPeriods - 1) {
      const newPeriod = currentPeriod + 1;
      handlePeriodChange(newPeriod);
    }
  };

  const handleSwiperInit = (swiper: Swiper) => {
    swiperRef.current = swiper;
  };

  const initializeAnimation = () => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: TIMELINE_CONSTANTS.INITIAL_ANIMATION_DURATION,
          stagger: TIMELINE_CONSTANTS.INITIAL_ANIMATION_STAGGER,
          ease: 'power3.out',
        },
      );
    }
  };

  return {
    currentPeriod,
    isAnimating,
    timelineRef,
    currentData,
    totalPeriods,
    handlePeriodChange,
    handlePrev,
    handleNext,
    handleSwiperInit,
    initializeAnimation,
  };
};
