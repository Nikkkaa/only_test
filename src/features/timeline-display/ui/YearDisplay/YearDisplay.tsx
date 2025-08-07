import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { TIMELINE_CONSTANTS, COLORS } from '@/shared/lib/constants';

interface YearDisplayProps {
  startYear: number;
  endYear: number;
  isAnimating: boolean;
}

const YearContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
  letter-spacing: -2px;
`;

const Year = styled.div<{ color: string }>`
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  color: ${(props) => props.color};
  position: relative;
`;

const YearDisplay: React.FC<YearDisplayProps> = ({ startYear, endYear, isAnimating }) => {
  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const prevStartYear = useRef(startYear);
  const prevEndYear = useRef(endYear);

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
      <Year ref={startYearRef} color={COLORS.SECONDARY}>
        {startYear}
      </Year>
      <Year ref={endYearRef} color={COLORS.ACCENT}>
        {endYear}
      </Year>
    </YearContainer>
  );
};

export default YearDisplay;
