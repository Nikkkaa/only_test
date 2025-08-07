import styled from 'styled-components';
import { COLORS, BREAKPOINTS } from '@/shared/lib/constants';

export const Header = styled.div`
  grid-area: 3 / 2 / 5 / 4;
  display: flex;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    grid-area: 2 / 1 / 4 / 3;
  }
`;

export const Title = styled.h1`
  font-size: clamp(24px, 4vw, 56px);
  font-weight: 700;
  color: ${COLORS.PRIMARY};
  margin: 0;
  line-height: 110%;
  height: auto;
  white-space: pre-line;
  text-align: left;
`;
