import { type TimelinePeriod } from '@/shared/lib/types';

export interface TimelineModel {
  periods: TimelinePeriod[];
  currentPeriod: number;
  isAnimating: boolean;
}

export interface TimelineState {
  currentPeriod: number;
  isAnimating: boolean;
  totalPeriods: number;
}
