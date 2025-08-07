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
