import React from 'react';

const Centered: React.FC = ({ children }) => {
  return <div className='d-flex justify-content-center'>{children}</div>;
};

export default Centered;
