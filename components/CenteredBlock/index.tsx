import React from 'react';

interface CenteredProps {
  children?: React.ReactNode;
}

const Centered: React.FC<CenteredProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">{children}</div>
      </div>
    </div>
  );
};

export default Centered;
