import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  bordered?: boolean;
}

export const Card = styled.div<CardProps>`
  background: ${theme.colors.secondary[50]};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.normal};
  
  ${({ padding = 'md' }) => {
    switch (padding) {
      case 'sm':
        return css`padding: ${theme.spacing.md};`;
      case 'lg':
        return css`padding: ${theme.spacing.xl};`;
      default:
        return css`padding: ${theme.spacing.lg};`;
    }
  }}
  
  ${({ bordered }) => bordered && css`
    border: 1px solid ${theme.colors.secondary[300]};
  `}
  
  ${({ hover }) => hover && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
  
  @media (max-width: ${theme.breakpoints.sm}) {
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.md};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  h2, h3, h4 {
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.secondary[900]};
  }
  
  p {
    color: ${theme.colors.secondary[600]};
    line-height: 1.5;
  }
`;

export const CardContent = styled.div`
  color: ${theme.colors.secondary[700]};
  line-height: 1.6;
`;

export const CardFooter = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.secondary[200]};
  
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  justify-content: flex-end;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    
    button, a {
      width: 100%;
    }
  }
`;
