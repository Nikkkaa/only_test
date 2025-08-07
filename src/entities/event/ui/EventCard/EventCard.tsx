import React from 'react';
import styled from 'styled-components';
import { type Event } from '@/shared/lib/types';
import { COLORS } from '@/shared/lib/constants';

interface EventCardProps {
  event: Event;
}

const Card = styled.div`
  background: transparent;
  padding: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EventYear = styled.div`
  font-family: Bebas Neue;
  font-size: 25px;
  font-weight: 400;
  line-height: 1.2;
  text-transform: uppercase;
  color: ${COLORS.SECONDARY_BLUE};
`;

const EventTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: ${COLORS.PRIMARY};
  line-height: 1.3;
  margin: 0;
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
