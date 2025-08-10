import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { TIMELINE_CONSTANTS, COLORS, BREAKPOINTS } from '@/shared/lib/constants';
import { useIsMobile } from '@/hooks';

interface YearDisplayProps {
  startYear: number;
  endYear: number;
  isAnimating: boolean;
}

const YearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  grid-area: 6 / 3 / 8 / 11;
  width: 100%;
  height: 100%;
  pointer-events: none;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.DESKTOP}px) {
    gap: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    grid-area: 4 / 1 / 6 / 7;
    gap: 60px;
  }
`;

const Year = styled.div<{ color: string }>`
  font-size: clamp(40px, 10vw, 200px);
  font-weight: 700;
  line-height: 1;
  color: ${(props) => props.color};
  position: relative;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 56px;
    font-weight: 600;
    line-height: 0;
    letter-spacing: -0.02em;
  }
`;

const YearDisplay: React.FC<YearDisplayProps> = ({ startYear, endYear, isAnimating }) => {
  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const prevStartYear = useRef(startYear);
  const prevEndYear = useRef(endYear);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isAnimating && startYearRef.current && endYearRef.current) {
      const startYearElement = startYearRef.current;
      const endYearElement = endYearRef.current;
      const tl = gsap.timeline();

      tl.to(
        {},
        {
          duration: TIMELINE_CONSTANTS.YEAR_ANIMATION_DURATION,
          ease: 'power2.out',
          onUpdate(this: gsap.core.Tween) {
            const progress = this.progress();
            const currentStartYear = Math.round(
              prevStartYear.current + (startYear - prevStartYear.current) * progress,
            );
            const currentEndYear = Math.round(
              prevEndYear.current + (endYear - prevEndYear.current) * progress,
            );
            startYearElement.textContent = currentStartYear.toString();
            endYearElement.textContent = currentEndYear.toString();
          },
          onComplete: () => {
            prevStartYear.current = startYear;
            prevEndYear.current = endYear;
          },
        },
      );
    }
  }, [startYear, endYear, isAnimating]);

  return (
    <YearContainer>
      <Year ref={startYearRef} color={isMobile ? COLORS.SECONDARY_BLUE : COLORS.SECONDARY}>
        {startYear}
      </Year>
      <Year ref={endYearRef} color={COLORS.ACCENT}>
        {endYear}
      </Year>
    </YearContainer>
  );
};

export default YearDisplay;
