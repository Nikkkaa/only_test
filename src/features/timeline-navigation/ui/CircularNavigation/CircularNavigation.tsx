import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { type TimelinePeriod } from '@/shared/lib/types';
import { TIMELINE_CONSTANTS, COLORS, BREAKPOINTS } from '@/shared/lib/constants';
import Dot from './Dot/Dot';

interface CircularNavigationProps {
  totalPeriods: number;
  currentPeriod: number;
  onPeriodChange: (period: number) => void;
  isAnimating: boolean;
  timelineData: TimelinePeriod[];
}

const NavigationContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(200px, 40vw, 530px);
  height: clamp(200px, 40vw, 530px);
  z-index: 12;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: none;
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${COLORS.BORDER_LIGHT};
  border-radius: 50%;
  position: relative;
`;

const CircularNavigation: React.FC<CircularNavigationProps> = ({
  totalPeriods,
  currentPeriod,
  onPeriodChange,
  isAnimating,
  timelineData,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [circleRotation, setCircleRotation] = useState(0);
  const [circleRadius, setCircleRadius] = useState(265);

  useEffect(() => {
    const updateRadius = () => {
      const container = circleRef.current;
      if (container) {
        const size = container.offsetWidth;
        setCircleRadius(size / 2);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const getAngle = (index: number) => (360 / totalPeriods) * index;
  useEffect(() => {
    const currentDotInitialAngle = getAngle(currentPeriod);
    const desiredRotation = TIMELINE_CONSTANTS.TARGET_ACTIVE_ANGLE - currentDotInitialAngle;
    const currentCircleRotation = (gsap.getProperty(circleRef.current, 'rotation') as number) || 0;

    const delta = ((desiredRotation - currentCircleRotation + 540) % 360) - 180;
    const nextRotation = currentCircleRotation + delta;

    const tl = gsap.timeline();

    tl.to(circleRef.current, {
      rotation: nextRotation,
      duration: TIMELINE_CONSTANTS.YEAR_ANIMATION_DURATION,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (circleRef.current) {
          const currentRot = gsap.getProperty(circleRef.current, 'rotation') as number;
          setCircleRotation(currentRot);
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [currentPeriod, totalPeriods]);

  return (
    <NavigationContainer>
      <Circle ref={circleRef}>
        {Array.from({ length: totalPeriods }).map((_, index) => (
          <Dot
            key={index}
            angle={getAngle(index)}
            isActive={index === currentPeriod}
            circleRotation={circleRotation}
            onClick={() => onPeriodChange(index)}
            disabled={isAnimating}
            dotNumber={index + 1}
            category={timelineData[index]?.category || ''}
            isParentAnimating={isAnimating}
            circleRadius={circleRadius}
          />
        ))}
      </Circle>
    </NavigationContainer>
  );
};

export default CircularNavigation;
