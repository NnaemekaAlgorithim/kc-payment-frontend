import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const ToastWrapper = styled(motion.div)<{ type: ToastType }>`
  position: fixed;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  z-index: ${theme.zIndex.toast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  border-left: 4px solid;
  max-width: 400px;
  min-width: 300px;
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `border-color: ${theme.colors.success};`;
      case 'error':
        return `border-color: ${theme.colors.error};`;
      case 'warning':
        return `border-color: ${theme.colors.warning};`;
      case 'info':
        return `border-color: ${theme.colors.primary[500]};`;
      default:
        return `border-color: ${theme.colors.secondary[300]};`;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.sm}px) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    left: ${theme.spacing.md};
    max-width: none;
    min-width: auto;
  }
`;

const IconWrapper = styled.div<{ type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: ${theme.colors.primary[50]};
          color: ${theme.colors.success};
        `;
      case 'error':
        return `
          background: ${theme.colors.primary[50]};
          color: ${theme.colors.error};
        `;
      case 'warning':
        return `
          background: ${theme.colors.primary[50]};
          color: ${theme.colors.warning};
        `;
      case 'info':
        return `
          background: ${theme.colors.primary[50]};
          color: ${theme.colors.primary[500]};
        `;
      default:
        return `
          background: ${theme.colors.secondary[100]};
          color: ${theme.colors.secondary[500]};
        `;
    }
  }}
`;

const Message = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary[900]};
  line-height: 1.4;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.secondary[400]};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.secondary[50]};
    color: ${theme.colors.secondary[600]};
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle />;
    case 'error':
    case 'warning':
      return <FaExclamationTriangle />;
    default:
      return <FaCheckCircle />;
  }
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <ToastWrapper
        type={type}
        initial={{ opacity: 0, x: 300, scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
      >
        <IconWrapper type={type}>
          {getIcon(type)}
        </IconWrapper>
        
        <Message>{message}</Message>
        
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </ToastWrapper>
    </AnimatePresence>
  );
};
