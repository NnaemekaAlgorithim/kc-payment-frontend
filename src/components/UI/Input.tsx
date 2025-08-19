import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface InputProps {
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.secondary[700]};
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  border: 2px solid ${theme.colors.secondary[300]};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary[50]};
  color: ${theme.colors.secondary[900]};
  transition: all ${theme.transitions.fast};
  /* Better mobile experience */
  -webkit-appearance: none;
  -webkit-border-radius: ${theme.borderRadius.lg};
  touch-action: manipulation;
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: 16px; /* Prevents zoom on iOS */
          height: 2.25rem;
          min-height: 44px; /* Touch target */
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: 16px; /* Prevents zoom on iOS */
          height: 3.5rem;
          min-height: 48px; /* Touch target */
        `;
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: 16px; /* Prevents zoom on iOS */
          height: 2.75rem;
          min-height: 44px; /* Touch target */
        `;
    }
  }}
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${theme.colors.secondary[500]};
  }
  
  ${({ hasError }) => hasError && css`
    border-color: ${theme.colors.error[500]};
    
    &:focus {
      border-color: ${theme.colors.error[500]};
      box-shadow: 0 0 0 3px ${theme.colors.error[50]};
    }
  `}
  
  &:disabled {
    background: ${theme.colors.secondary[200]};
    color: ${theme.colors.secondary[500]};
    cursor: not-allowed;
  }
  
  /* Mobile-specific optimizations */
  @media (max-width: ${theme.breakpoints.md}) {
    /* Better spacing for mobile */
    margin-bottom: ${theme.spacing.xs};
    
    /* Ensure proper input behavior on mobile */
    &[type="email"] {
      text-transform: none;
    }
    
    &[type="tel"] {
      text-align: left;
    }
  }
  
  /* Better focus visibility on mobile */
  @media (pointer: coarse) {
    &:focus {
      transform: scale(1.02);
    }
  }
`;

export const TextArea = styled.textarea<InputProps>`
  width: 100%;
  min-height: 120px;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.secondary[300]};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary[50]};
  color: ${theme.colors.secondary[900]};
  font-size: 16px; /* Prevents zoom on iOS */
  font-family: inherit;
  resize: vertical;
  transition: all ${theme.transitions.fast};
  /* Better mobile experience */
  -webkit-appearance: none;
  -webkit-border-radius: ${theme.borderRadius.lg};
  touch-action: manipulation;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${theme.colors.secondary[500]};
  }
  
  ${({ hasError }) => hasError && css`
    border-color: ${theme.colors.error[500]};
    
    &:focus {
      border-color: ${theme.colors.error[500]};
      box-shadow: 0 0 0 3px ${theme.colors.error[50]};
    }
  `}
  
  &:disabled {
    background: ${theme.colors.secondary[200]};
    color: ${theme.colors.secondary[500]};
    cursor: not-allowed;
  }
  
  /* Mobile-specific optimizations */
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 100px;
    
    /* Better focus visibility on mobile */
    &:focus {
      transform: scale(1.01);
    }
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.error[500]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const HelperText = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary[600]};
`;
