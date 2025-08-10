import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from '@/shared/ui';
import { BREAKPOINTS } from '@/shared/lib/constants';

const BottomNavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  grid-area: 9 / 2 / 10 / 4;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    grid-area: 10 / 1 / 12 / 3;
    gap: 10px;
  }
`;

const Counter = styled.div`
  font-size: 20px;
  color: rgb(66, 86, 122);
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 100%;
    text-align: left;
  }
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.DESKTOP}px) {
    gap: 10px;
  }
`;

interface TimelineNavigationProps {
  currentPeriod: number;
  totalPeriods: number;
  isAnimating: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const TimelineNavigation: React.FC<TimelineNavigationProps> = ({
  currentPeriod,
  totalPeriods,
  isAnimating,
  onPrev,
  onNext,
}) => {
  return (
    <BottomNavigationContainer>
      <Counter>
        {String(currentPeriod + 1).padStart(2, '0')}/{String(totalPeriods).padStart(2, '0')}
      </Counter>
      <NavButtonsWrapper>
        <Button variant="navigation" onClick={onPrev} disabled={isAnimating || currentPeriod === 0}>
          <Icon name="arrow-left" />
        </Button>
        <Button
          variant="navigation"
          onClick={onNext}
          disabled={isAnimating || currentPeriod === totalPeriods - 1}
        >
          <Icon name="arrow-right" />
        </Button>
      </NavButtonsWrapper>
    </BottomNavigationContainer>
  );
};

export default TimelineNavigation;
