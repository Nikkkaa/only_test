import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { BREAKPOINTS, COLORS } from '@/shared/lib/constants';
import { Button } from '@/shared/ui';

export const EventsContainer = styled.div`
  grid-area: 11 / 1 / 13 / 13;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    grid-area: 7 / 1 / 10 / 7;
    margin-right: -25px;
  }
`;

export const ContentWrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.DESKTOP}px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: center;
    justify-items: center;
  }
`;

export const Line = styled.div`
  height: 1px;
  background-color: ${COLORS.BORDER_LIGHT};
  grid-area: 6 / 1 / 8 / 7;
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  grid-area: 1 / 2 / 3 / 12;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    .swiper-slide {
      text-align: left;
      font-size: 18px;
      width: 65%;
      transition:
        filter 0.3s ease,
        opacity 0.3s ease;
    }

    .swiper-slide-active {
      filter: none;
      opacity: 1;
    }

    .swiper-slide:not(.swiper-slide-active) {
      filter: blur(2px);
      opacity: 0.6;
    }
  }

  .swiper-pagination {
    position: relative;
    margin-top: 20px;
  }

  .custom-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .custom-pagination-bullet-active {
    background-color: #333;
    transform: scale(1.2);
  }
`;

export const SwiperNavButton = styled(Button)<{ position: 'left' | 'right'; $hidden?: boolean }>`
  ${({ position }) =>
    position === 'left' ? 'grid-area: 1 / 1 / 3 / 2;' : 'grid-area: 1 / 12 / 3 / 13;'}
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: visibility 0.3s;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    display: none;
  }
`;

export const CustomPagination = styled.div`
  grid-area: 10 / 3 / 12 / 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationBullet = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  background-color: ${COLORS.PRIMARY};
  opacity: ${({ $active }) => ($active ? '1' : '0.4')};
  border-radius: 50%;
  margin: 0 5px;
  transition: all 0.3s ease;
  transform: ${({ $active }) => ($active ? 'scale(1.2)' : 'scale(1)')};
`;
