import { Swiper } from 'swiper/types';

export interface Event {
  year: number;
  title: string;
  description: string;
}

export interface TimelinePeriod {
  startYear: number;
  endYear: number;
  category: string;
  events: Event[];
}

export interface TimelineState {
  currentPeriod: number;
  isAnimating: boolean;
  totalPeriods: number;
}

export interface TimelineActions {
  handlePeriodChange: (period: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleSwiperInit: (swiper: Swiper) => void;
  initializeAnimation: () => void;
}
