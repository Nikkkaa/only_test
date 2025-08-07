import React, { useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/shared/lib/constants';
import {
  useTimelineNavigation,
  CircularNavigation,
  TimelineNavigation,
  YearDisplay,
  EventsSlider,
} from '@/features';

const TimelineContainer = styled.div`
  width: 75vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.BORDER_LIGHT};

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
`;

const Header = styled.div`
  position: absolute;
  top: 10.625rem;
  left: 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4.688rem;
`;

const Line = styled.div`
  width: 5px;
  height: 120px;
  background: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);
  border-radius: 3px;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: ${COLORS.PRIMARY};
  margin: 0;
  line-height: 1.1;
  height: 134px;
  white-space: pre-line;
`;

const TimelineWidget: React.FC = () => {
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

  useEffect(() => {
    initializeAnimation();
  }, []);

  return (
    <TimelineContainer ref={timelineRef}>
      <Header>
        <TitleWrapper>
          <Line />
          <Title>Исторические{'\n'}даты</Title>
        </TitleWrapper>
      </Header>

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
      />
    </TimelineContainer>
  );
};

export default TimelineWidget;
