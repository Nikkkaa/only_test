import { useEffect, useRef, useState } from 'react';
import { type Swiper as SwiperType } from 'swiper/types';
import { useIsMobile } from '@/hooks';

export const useEventsSlider = (
  currentPeriod: number,
  widgetId: string,
  onSwiperInit: (swiper: SwiperType) => void,
) => {
  const swiperRef = useRef<SwiperType>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const prevClass = `swiper-button-prev-${widgetId}`;
  const nextClass = `swiper-button-next-${widgetId}`;

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || isMobile) return;

    const navigationOptions = {
      prevEl: `.${prevClass}`,
      nextEl: `.${nextClass}`,
    };

    if (typeof swiper.params.navigation === 'object') {
      Object.assign(swiper.params.navigation, navigationOptions);
    } else {
      swiper.params.navigation = navigationOptions;
    }

    swiper.navigation?.destroy();
    swiper.navigation?.init();
    swiper.navigation?.update();
  }, [currentPeriod, isMobile, prevClass, nextClass]);

  const updateSwiperState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.realIndex || swiper.activeIndex);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    onSwiperInit(swiper);
    updateSwiperState(swiper);
    swiper.on('slideChange', () => updateSwiperState(swiper));
  };

  const handleBulletClick = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return {
    swiperRef,
    isBeginning,
    isEnd,
    activeIndex,
    isMobile,
    prevClass,
    nextClass,
    handleSwiperInit,
    handleBulletClick,
  };
};
