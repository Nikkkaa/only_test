import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { timelineApi } from '@/entities/timeline';
import { TIMELINE_CONSTANTS } from '@/shared/lib/constants';
import { Swiper } from 'swiper/types';

export const useTimelineNavigation = () => {
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineData = timelineApi.getTimelineData().sort((a, b) => a.startYear - b.startYear);
  const currentData = timelineData[currentPeriod];
  const totalPeriods = timelineData.length;

  const handlePeriodChange = (newPeriod: number) => {
    if (isAnimating || newPeriod === currentPeriod) return;

    setIsAnimating(true);
    setCurrentPeriod(newPeriod);

    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }

    setTimeout(() => setIsAnimating(false), TIMELINE_CONSTANTS.ANIMATION_DURATION);
  };

  const handlePrev = () => currentPeriod > 0 && handlePeriodChange(currentPeriod - 1);
  const handleNext = () =>
    currentPeriod < totalPeriods - 1 && handlePeriodChange(currentPeriod + 1);

  const handleSwiperInit = (swiper: Swiper) => {
    setSwiperInstance(swiper);
  };

  const initializeAnimation = () => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll(':scope > *'),
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

  useEffect(() => {
    return () => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
    };
  }, [swiperInstance]);

  return {
    currentPeriod,
    isAnimating,
    timelineRef,
    currentData,
    totalPeriods,
    timelineData,
    handlePeriodChange,
    handlePrev,
    handleNext,
    handleSwiperInit,
    initializeAnimation,
  };
};
