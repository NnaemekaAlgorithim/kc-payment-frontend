import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const ToastWrapper = styled(motion.div)<{ type: ToastType }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  border-left: 4px solid;
  max-width: 400px;
  width: 100%;
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `border-color: ${theme.colors.success[500]};`;
      case 'error':
        return `border-color: ${theme.colors.error[500]};`;
      case 'warning':
        return `border-color: ${theme.colors.warning[500]};`;
      case 'info':
        return `border-color: ${theme.colors.primary[500]};`;
      default:
        return `border-color: ${theme.colors.secondary[300]};`;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.sm}) {
    margin: 0 ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md};
    max-width: calc(100vw - ${theme.spacing.xl});
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
          background: ${theme.colors.success[50]};
          color: ${theme.colors.success[500]};
        `;
      case 'error':
        return `
          background: ${theme.colors.error[50]};
          color: ${theme.colors.error[500]};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning[50]};
          color: ${theme.colors.warning[500]};
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

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.secondary[900]};
`;

const Message = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.secondary[600]};
  line-height: 1.4;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.secondary[400]};
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.secondary[100]};
    color: ${theme.colors.secondary[600]};
  }
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle />;
    case 'error':
      return <FaTimes />;
    case 'warning':
      return <FaExclamationTriangle />;
    case 'info':
      return <FaInfoCircle />;
    default:
      return <FaInfoCircle />;
  }
};

const Toast: React.FC<ToastProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <ToastWrapper
      type={type}
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <IconWrapper type={type}>
        {getIcon(type)}
      </IconWrapper>
      
      <Content>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
      </Content>
      
      <CloseButton onClick={() => onClose(id)}>
        <FaTimes />
      </CloseButton>
    </ToastWrapper>
  );
};

// Toast Container Component
const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 80px; /* Account for header */
  right: ${theme.spacing.lg};
  z-index: ${theme.zIndex.tooltip};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    top: 70px;
    right: 0;
    left: 0;
  }
`;

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }>;
  onClose: (id: string) => void;
}

export const ToastProvider: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <ToastContainerWrapper>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </ToastContainerWrapper>
  );
};

export default Toast;
