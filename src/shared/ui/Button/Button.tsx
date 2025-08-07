import { COLORS } from '@/shared/lib';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'navigation';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const StyledButton = styled.button<{ variant: string; size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  transition: all 0.3s ease;
  font-weight: 400;

  ${({ variant }) => {
    switch (variant) {
      case 'navigation':
        return `
          width: 50px;
          height: 50px;
          background: #fff;
          border: 1px solid rgba(66, 86, 122, 0.5);
          color: #42567A;
          
          &:hover {
            background: #E0E2E6;
            border-color: rgba(66, 86, 122, 0.4);
          }
          
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      case 'primary':
        return `
          background: #5D5FEF;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          
          &:hover {
            background: #4A4CD8;
          }
        `;
      default:
        return `
          background: transparent;
          color: #42567A;
          padding: 8px 16px;
          border: 1px solid ${COLORS.BORDER_LIGHT};
          border-radius: 8px;
          
          &:hover {
            background: rgba(66, 86, 122, 0.05);
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'font-size: 12px; padding: 6px 12px;';
      case 'large':
        return 'font-size: 16px; padding: 16px 32px;';
      default:
        return 'font-size: 14px; padding: 12px 24px;';
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'secondary',
  size = 'medium',
  className,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
