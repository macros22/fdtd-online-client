import React from 'react';

interface CenteredProps {
  children?: React.ReactNode;
}

const Centered: React.FC<CenteredProps> = ({ children }) => {
  return <div className="d-flex justify-content-center">{children}</div>;
};

export default Centered;
