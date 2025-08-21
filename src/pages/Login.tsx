import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from '../hooks';
import { Button, Input, Card, Loader, Toast } from '../components/UI';
import { authService, LoginRequest } from '../services/registration';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.primary[100]} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.primary[600]};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const PasswordInputWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[400]};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary[500]};
  }
  
  &:focus {
    outline: none;
    color: ${props => props.theme.colors.primary[500]};
  }
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.9rem;
  
  a {
    color: ${props => props.theme.colors.primary[600]};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MessageAlert = styled.div<{ type: 'success' | 'info' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
  font-size: 0.9rem;
  
  ${({ type, theme }) => {
    if (type === 'success') {
      return `
        background: ${theme.colors.primary[50]};
        color: ${theme.colors.success};
        border: 1px solid ${theme.colors.primary[200]};
      `;
    }
    return `
      background: ${theme.colors.primary[50]};
      color: ${theme.colors.primary[600]};
      border: 1px solid ${theme.colors.primary[200]};
    `;
  }}
`;

interface FormData extends LoginRequest {}

interface LocationState {
  message?: string;
  email?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setFieldError,
  } = useForm<FormData>({
    initialValues: {
      email: state?.email || '',
      password: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormData, string>> = {};

      // Email validation
      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }

      // Password validation
      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setToast(null);

    try {
      const response = await authService.login(values);
      
      if (response.success) {
        setToast({
          message: 'Login successful! Redirecting...',
          type: 'success',
        });

        // Redirect to appropriate dashboard based on user role
        const dashboardRoute = authService.getDashboardRoute(response.data.user);
        setTimeout(() => {
          navigate(dashboardRoute);
        }, 1500);
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Login failed. Please check your credentials.';
      
      // Handle field-specific errors
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors;
        Object.keys(fieldErrors).forEach(field => {
          if (field in values) {
            setFieldError(field as keyof FormData, fieldErrors[field][0]);
          }
        });
      }

      setToast({
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginCard>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your KC Payment account</Subtitle>

          {state?.message && (
            <MessageAlert type="success">
              {state.message}
            </MessageAlert>
          )}

          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<FaEnvelope />}
                error={touched.email && errors.email}
                disabled={isLoading}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}
            </div>

            <div>
              <PasswordInputWrapper>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<FaLock />}
                  error={touched.password && errors.password}
                  disabled={isLoading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInputWrapper>
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <Loader size="sm" /> : 'Sign In'}
            </Button>
          </Form>

          <SignupLink>
            Don't have an account? <a href="/register">Create one</a>
          </SignupLink>
        </LoginCard>
      </motion.div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </PageContainer>
  );
};

export default Login;
