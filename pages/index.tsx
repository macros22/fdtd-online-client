import * as React from 'react';

import MainLayout from 'layout/MainLayout';
import {DifractionEditor} from "components";

export default function Index() {
  return (
    <MainLayout title={'Wave optics'}>
        <DifractionEditor />
    </MainLayout>
  );

}

