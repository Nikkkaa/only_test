import React from 'react';
import styled from 'styled-components';
import { TimelineWidget } from '@/widgets';
import { COLORS } from '@/shared';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${COLORS.BACKGROUND};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TimelinePage: React.FC = () => {
  return (
    <PageContainer>
      <TimelineWidget />
    </PageContainer>
  );
};

export default TimelinePage;
