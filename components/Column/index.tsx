import React from 'react';

interface CenteredProps {
  children?: React.ReactNode;
}

const Column: React.FC<CenteredProps> = ({ children }) => {
  return <div className="d-flex flex-column">{children}</div>;
};

export default Column;
