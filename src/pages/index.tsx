import { Select, Option } from 'components';
import * as React from 'react';

export default function Index() {
  return (
    <>
      <Select placeholder='Choose an option'>
        <Option value='one'>One</Option>
        <Option value='two'>Two</Option>
        <Option value='three'>Three</Option>
        <Option value='four'>Four</Option>
      </Select>
    </>
  );
}
