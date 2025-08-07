import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { TIMELINE_CONSTANTS, COLORS } from '@/shared/lib/constants';

interface DotProps {
  angle: number;
  isActive: boolean;
  circleRotation: number;
  onClick: () => void;
  disabled: boolean;
  dotNumber: number;
  category: string;
  isParentAnimating: boolean;
}

const DotText = styled.span<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  will-change: opacity;
  color: ${COLORS.PRIMARY};
`;

const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${COLORS.PRIMARY};
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  position: absolute;
  left: 120%;
  top: 50%;
  transform: translate(20px, -50%);
`;

const LabelText = styled.span`
  display: block;
`;

const StyledDotButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '56px' : '6px')};
  height: ${({ isActive }) => (isActive ? '56px' : '6px')};
  border-radius: 50%;
  background: ${({ isActive }) => (isActive ? COLORS.BACKGROUND : COLORS.PRIMARY)};
  border: ${({ isActive }) => (isActive ? `1px solid ${COLORS.BORDER}` : 'none')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  color: ${COLORS.PRIMARY};
  transition: all 0.3s ease;
  z-index: ${({ isActive }) => (isActive ? 15 : 12)};

  &:hover {
    width: 56px;
    height: 56px;
    background: ${COLORS.BACKGROUND};
    border: 1px solid ${COLORS.BORDER};

    ${DotText} {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const DotWrapper = styled.div<{ angle: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 56px;
  height: 56px;
  transform: translate(
    calc(
      -50% +
        ${({ angle }) => Math.sin(angle * (Math.PI / 180)) * TIMELINE_CONSTANTS.CIRCLE_RADIUS}px
    ),
    calc(
      -50% +
        ${({ angle }) => -Math.cos(angle * (Math.PI / 180)) * TIMELINE_CONSTANTS.CIRCLE_RADIUS}px
    )
  );
  z-index: 11;
`;

const DotContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot: React.FC<DotProps> = ({
  angle,
  isActive,
  circleRotation,
  onClick,
  disabled,
  dotNumber,
  category,
  isParentAnimating,
}) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const dotContentRef = useRef<HTMLDivElement>(null);

  console.log(isActive, 'isActive');

  useEffect(() => {
    if (labelRef.current) {
      if (isActive && !isParentAnimating) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, delay: 0, ease: 'power2.out' },
        );
      } else {
        gsap.to(labelRef.current, { opacity: 0, x: -20, duration: 0, ease: 'power2.in' });
      }
    }
  }, [isActive, isParentAnimating]);

  useEffect(() => {
    if (dotContentRef.current) {
      gsap.set(dotContentRef.current, { rotation: -circleRotation });
    }
  }, [circleRotation]);

  return (
    <DotWrapper angle={angle}>
      <DotContent ref={dotContentRef}>
        <StyledDotButton isActive={isActive} onClick={onClick} disabled={disabled}>
          <DotText isActive={isActive}>{dotNumber}</DotText>
        </StyledDotButton>
        <CategoryLabel ref={labelRef}>
          <LabelText>{category}</LabelText>
        </CategoryLabel>
      </DotContent>
    </DotWrapper>
  );
};

export default Dot;
