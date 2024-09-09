import React from 'react';

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ className, children, ...props }) => (
  <a
    className={`bg-purple-1 text-light-200 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-purple-2 transition-colors ${className}`}
    {...props}
  >
    {children}
  </a>
);

export default LinkButton;