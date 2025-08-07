import React, { useEffect } from 'react';
import styled from 'styled-components';
import { COLORS, BREAKPOINTS } from '@/shared/lib/constants';
import {
  CircularNavigation,
  EventsSlider,
  TimelineNavigation,
  useTimelineNavigation,
  YearDisplay,
} from '@/features';
import { useIsMobile } from '@/hooks';
import { Header, Title } from './Header';

const TimelineContainer = styled.div`
  width: 75vw;
  height: 100vh;
  border: 1px solid ${COLORS.BORDER_LIGHT};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: ${COLORS.PRIMARY};
    transform: translateX(-50%);
    opacity: 0.1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${COLORS.PRIMARY};
    transform: translateY(-50%);
    opacity: 0.1;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 100vw;
    height: 100vh;
    padding: 0 20px;
    background: ${COLORS.BACKGROUND};
    overflow-y: auto;
    overflow-x: hidden;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(12, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    &::before,
    &::after {
      display: none;
    }
  }
`;

const Line = styled.div`
  grid-area: 3 / 1 / 5 / 1;
  width: 5px;
  height: clamp(60px, 14vh, 150px);
  background: linear-gradient(180deg, ${COLORS.SECONDARY_BLUE} 0%, ${COLORS.ACCENT} 100%);
  border-radius: 3px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: none;
  }
`;

const TimelineWidget: React.FC = () => {
  const isMobile = useIsMobile();
  const {
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
  } = useTimelineNavigation();
  const widgetId = React.useId();

  useEffect(() => {
    initializeAnimation();
  }, []);

  return (
    <TimelineContainer ref={timelineRef}>
      <Header>
        <Title>Исторические{'\n'}даты</Title>
      </Header>

      {!isMobile && <Line />}

      <CircularNavigation
        totalPeriods={timelineData.length}
        currentPeriod={currentPeriod}
        onPeriodChange={handlePeriodChange}
        isAnimating={isAnimating}
        timelineData={timelineData}
      />

      <YearDisplay
        startYear={currentData.startYear}
        endYear={currentData.endYear}
        isAnimating={isAnimating}
      />

      <TimelineNavigation
        currentPeriod={currentPeriod}
        totalPeriods={totalPeriods}
        isAnimating={isAnimating}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <EventsSlider
        events={currentData.events}
        currentPeriod={currentPeriod}
        onSwiperInit={handleSwiperInit}
        widgetId={widgetId}
      />
    </TimelineContainer>
  );
};

export default TimelineWidget;
