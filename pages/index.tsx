import * as React from 'react';

import MainLayout from 'layout/MainLayout';
import { DifractionEditor } from 'components';
import Svg from '../components/Svg';

export default function Index() {
  return (
    <MainLayout title={'Wave optics'}>
      <Svg />
    </MainLayout>
  );
}
