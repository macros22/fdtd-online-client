import * as React from 'react';

interface PaperProps {
  children?: React.ReactNode;
}

const Paper: React.FC<PaperProps> = ({ children }) => {
  return (
    <div className="shadow-sm p-2 m-2 bg-white rounded">
      {children}
    </div>
  );
}

export default Paper;
