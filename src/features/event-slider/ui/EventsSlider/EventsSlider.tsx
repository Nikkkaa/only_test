import 'swiper/css';
import 'swiper/css/navigation';

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { type Event } from '@/shared/lib/types';
import { EventCard } from '@/entities/event';
import { Button, Icon } from '@/shared/ui';
import { type NavigationOptions, type Swiper as SwiperType } from 'swiper/types';

interface EventsSliderProps {
  events: Event[];
  currentPeriod: number;
  onSwiperInit: (swiper: SwiperType) => void;
}

const EventsContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 5rem;
  right: 5rem;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100px;
  margin: 0 30px;
`;

const SwiperNavButton = styled(Button)<{ position: 'left' | 'right'; $hidden?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  ${({ position }) => (position === 'left' ? 'left: -65px;' : 'right: -65px;')}
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: visibility 0.3s;
`;

const EventsSlider: React.FC<EventsSliderProps> = ({ events, currentPeriod, onSwiperInit }) => {
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (typeof swiper.params.navigation === 'object' && swiper.params.navigation !== null) {
      swiper.params.navigation.prevEl = '.swiper-button-prev-custom';
      swiper.params.navigation.nextEl = '.swiper-button-next-custom';
    } else {
      swiper.params.navigation = {
        prevEl: '.swiper-button-prev-custom',
        nextEl: '.swiper-button-next-custom',
      } as NavigationOptions;
    }

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, [currentPeriod]);

  const swiperRef = useRef<SwiperType>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    onSwiperInit(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    swiper.on('slideChange', () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };

  return (
    <EventsContainer>
      <ContentWrapper>
        <SwiperNavButton
          className="swiper-button-prev-custom"
          variant="navigation"
          position="left"
          $hidden={isBeginning}
        >
          <Icon name="arrow-left" />
        </SwiperNavButton>

        <StyledSwiper
          modules={[Navigation, FreeMode]}
          slidesPerView={3}
          spaceBetween={30}
          freeMode
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          onSwiper={handleSwiperInit}
        >
          {events.map((event, index) => (
            <SwiperSlide key={`${currentPeriod}-${index}`}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </StyledSwiper>

        <SwiperNavButton
          className="swiper-button-next-custom"
          variant="navigation"
          position="right"
          $hidden={isEnd}
        >
          <Icon name="arrow-right" />
        </SwiperNavButton>
      </ContentWrapper>
    </EventsContainer>
  );
};

export default EventsSlider;
