import React from 'react';
import styled from 'styled-components';

interface IconProps {
  name: 'arrow-left' | 'arrow-right' | 'close' | 'menu';
  size?: number;
  color?: string;
  className?: string;
}

const IconWrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
`;

const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#42567A', className }) => {
  const getIconPath = () => {
    switch (name) {
      case 'arrow-left':
        return 'm15 18-6-6 6-6';
      case 'arrow-right':
        return 'm9 18 6-6-6-6';
      case 'close':
        return 'M18 6L6 18M6 6l12 12';
      case 'menu':
        return 'M3 12h18M3 6h18M3 18h18';
      default:
        return '';
    }
  };

  return (
    <IconWrapper color={color} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={getIconPath()} />
      </svg>
    </IconWrapper>
  );
};

export default Icon;
