import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from '@/shared/ui';

const BottomNavigationContainer = styled.div`
  position: absolute;
  bottom: 15rem;
  left: 7rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Counter = styled.div`
  font-size: 14px;
  color: rgb(66, 86, 122);
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
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
