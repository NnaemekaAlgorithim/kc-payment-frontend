import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

const getButtonStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.colors.gradient.primary};
        color: white;
        box-shadow: ${theme.shadows.md};
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.lg};
        }
        
        &:active {
          transform: translateY(0);
        }
      `;
    
    case 'secondary':
      return css`
        background: ${theme.colors.secondary[50]};
        color: ${theme.colors.secondary[700]};
        border: 1px solid ${theme.colors.secondary[300]};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.secondary[100]};
          border-color: ${theme.colors.secondary[400]};
        }
      `;
    
    case 'outline':
      return css`
        background: transparent;
        color: ${theme.colors.primary[600]};
        border: 2px solid ${theme.colors.primary[600]};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary[50]};
        }
      `;
    
    case 'ghost':
      return css`
        background: transparent;
        color: ${theme.colors.primary[600]};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary[50]};
        }
      `;
    
    default:
      return css``;
  }
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.fontSizes.sm};
        height: 2.25rem;
        min-height: 44px; /* Mobile touch target */
      `;
    
    case 'lg':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: ${theme.fontSizes.lg};
        height: 3.5rem;
        min-height: 48px; /* Mobile touch target */
      `;
    
    default: // md
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.fontSizes.base};
        height: 2.75rem;
        min-height: 44px; /* Mobile touch target */
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.medium};
  transition: all ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  /* Better touch targets for mobile */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* Prevent text scaling on mobile */
  -webkit-text-size-adjust: 100%;
  
  ${({ variant = 'primary' }) => getButtonStyles(variant)}
  ${({ size = 'md' }) => getSizeStyles(size)}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  ${({ isLoading }) => isLoading && css`
    cursor: not-allowed;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }
    
    @keyframes button-loading-spinner {
      from { transform: rotate(0turn); }
      to { transform: rotate(1turn); }
    }
  `}
  
  /* Mobile-specific optimizations */
  @media (max-width: ${theme.breakpoints.md}) {
    /* Ensure minimum touch target size */
    min-height: 48px;
    
    /* Better spacing on mobile */
    &:not(:last-child) {
      margin-bottom: ${theme.spacing.sm};
    }
    
    /* Reduce hover effects on touch devices */
    @media (hover: none) {
      &:hover {
        transform: none;
        box-shadow: inherit;
      }
    }
  }
  
  /* Enhanced touch feedback */
  @media (pointer: coarse) {
    &:active {
      transform: scale(0.98);
    }
  }
  
  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
