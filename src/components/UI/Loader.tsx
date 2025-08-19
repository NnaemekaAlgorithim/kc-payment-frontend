import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div<{ size?: 'sm' | 'md' | 'lg'; fullScreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ fullScreen }) => fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: ${theme.zIndex.modal};
  `}
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          width: 20px;
          height: 20px;
        `;
      case 'lg':
        return `
          width: 60px;
          height: 60px;
        `;
      default:
        return `
          width: 40px;
          height: 40px;
        `;
    }
  }}
`;

const Spinner = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  border: 3px solid ${theme.colors.secondary[200]};
  border-top: 3px solid ${theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          width: 20px;
          height: 20px;
          border-width: 2px;
        `;
      case 'lg':
        return `
          width: 60px;
          height: 60px;
          border-width: 4px;
        `;
      default:
        return `
          width: 40px;
          height: 40px;
          border-width: 3px;
        `;
    }
  }}
`;

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false, className }) => {
  return (
    <LoaderContainer size={size} fullScreen={fullScreen} className={className}>
      <Spinner size={size} />
    </LoaderContainer>
  );
};

export default Loader;
