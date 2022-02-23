import Lab3D from 'components/templates/Lab3D/Lab3D';
import Test from 'components/Test/Test';
import { withLayout } from 'layout/MainLayout';
import React from 'react';

function Index() {
  return (
    <>
      {/* <Test /> */}
      <Lab3D />
    </>
  );
}

// export default Index;
export default withLayout(Index);
