import React from 'react';
import styled from 'styled-components';
import { type Event } from '@/shared/lib/types';
import { COLORS, BREAKPOINTS } from '@/shared/lib/constants';

interface EventCardProps {
  event: Event;
  $active?: boolean;
}

const Card = styled.div<{ $active?: boolean }>`
  background: transparent;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EventYear = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(16px, 2vw, 25px);
  font-weight: 400;
  line-height: 120%;
  text-transform: uppercase;
  color: ${COLORS.SECONDARY_BLUE};

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 16px;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: 0;
    text-align: left;
    text-transform: uppercase;
  }
`;

const EventTitle = styled.h3`
  font-size: clamp(16px, 1.8vw, 18px);
  font-weight: 400;
  line-height: 30px;
  color: ${COLORS.PRIMARY};
  margin: 0;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 145%;
    letter-spacing: 0;
    text-align: left;
  }
`;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card>
      <EventYear>{event.year}</EventYear>
      <EventTitle>{event.title}</EventTitle>
    </Card>
  );
};

export default EventCard;
