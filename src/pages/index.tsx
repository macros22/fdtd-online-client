import Test from 'components/Test/Test';
import { withLayout } from 'layout/MainLayout';
import React from 'react';

function Index() {
  return (
    <>
      <Test />
      <p>asdasd zssds</p>
    </>
  );
}

// export default Index;
export default withLayout(Index);
