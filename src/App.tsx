import { TimelinePage } from '@/pages';
import { GlobalStyles } from '@/shared/ui/GlobalStyles';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <TimelinePage />
    </>
  );
};

export default App;
