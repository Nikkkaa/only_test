import React from 'react';
import styled from 'styled-components';
import { TimelineWidget } from '@/widgets';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
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
