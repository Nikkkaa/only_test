import { type Event } from '@/shared/lib/types';

export interface EventCardProps {
  event: Event;
}

export interface EventListProps {
  events: Event[];
  currentPeriod: number;
}
