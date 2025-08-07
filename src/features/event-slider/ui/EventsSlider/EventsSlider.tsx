import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { EventCard } from '@/entities/event';
import { EventsContainer, ContentWrapper, StyledSwiper, Line } from './Styled';
import { SliderNavigation } from './SliderNavigation';
import { CustomPaginationComponent } from './CustomPagination';
import { type Event } from '@/shared/lib/types';
import { type Swiper as SwiperType } from 'swiper/types';
import { useEventsSlider } from '../../model/useEventSlider';

interface EventsSliderProps {
  events: Event[];
  currentPeriod: number;
  onSwiperInit: (swiper: SwiperType) => void;
  widgetId: string;
}

const EventsSlider: React.FC<EventsSliderProps> = ({
  events,
  currentPeriod,
  onSwiperInit,
  widgetId,
}) => {
  const {
    swiperRef,
    isBeginning,
    isEnd,
    activeIndex,
    isMobile,
    prevClass,
    nextClass,
    handleSwiperInit,
    handleBulletClick,
  } = useEventsSlider(currentPeriod, widgetId, onSwiperInit);

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

  return (
    <>
      <EventsContainer>
        <ContentWrapper>
          {!isMobile && (
            <SliderNavigation className={prevClass} position="left" hidden={isBeginning} />
          )}

          <StyledSwiper
            modules={[FreeMode, ...(isMobile ? [Pagination] : [Navigation])]}
            slidesPerView={isMobile ? 'auto' : 3}
            spaceBetween={isMobile ? 25 : 30}
            freeMode={!isMobile}
            navigation={
              !isMobile
                ? {
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                  }
                : undefined
            }
            pagination={
              isMobile
                ? {
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-pagination-bullet',
                    bulletActiveClass: 'custom-pagination-bullet-active',
                  }
                : false
            }
            onSwiper={handleSwiperInit}
          >
            {events.map((event, index) => (
              <SwiperSlide key={`${currentPeriod}-${index}`}>
                <EventCard event={event} $active={index === activeIndex} />
              </SwiperSlide>
            ))}
          </StyledSwiper>

          {!isMobile && <SliderNavigation className={nextClass} position="right" hidden={isEnd} />}
        </ContentWrapper>
      </EventsContainer>

      {isMobile && (
        <CustomPaginationComponent
          total={events.length}
          activeIndex={activeIndex}
          onBulletClick={handleBulletClick}
        />
      )}

      {isMobile && <Line />}
    </>
  );
};

export default EventsSlider;
