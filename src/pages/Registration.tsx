import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from '../hooks';
import { Button, Input, Card, Loader, Toast } from '../components/UI';
import { authService, RegistrationRequest } from '../services/registration';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.primary[100]} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
`;

const RegistrationCard = styled(Card)`
  width: 100%;
  max-width: 480px;
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

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
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

const LoginLink = styled.div`
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

interface FormData extends RegistrationRequest {}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormData, string>> = {};

      // First name validation
      if (!values.first_name.trim()) {
        errors.first_name = 'First name is required';
      } else if (values.first_name.trim().length < 2) {
        errors.first_name = 'First name must be at least 2 characters';
      }

      // Last name validation
      if (!values.last_name.trim()) {
        errors.last_name = 'Last name is required';
      } else if (values.last_name.trim().length < 2) {
        errors.last_name = 'Last name must be at least 2 characters';
      }

      // Email validation
      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }

      // Password validation
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
        errors.password = 'Password must contain uppercase, lowercase and number';
      }

      // Confirm password validation
      if (!values.confirm_password) {
        errors.confirm_password = 'Please confirm your password';
      } else if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords do not match';
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
      const response = await authService.register(values);
      
      setToast({
        message: 'Registration successful! Please check your email for activation code.',
        type: 'success',
      });

      // Navigate to activation page with email
      setTimeout(() => {
        navigate('/activate', { 
          state: { 
            email: values.email 
          } 
        });
      }, 2000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Registration failed. Please try again.';
      
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
        <RegistrationCard>
          <Title>Create Account</Title>
          <Subtitle>Join KC Payment and start managing your finances</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputRow>
              <div>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<FaUser />}
                  error={touched.first_name && errors.first_name}
                  disabled={isLoading}
                />
                {touched.first_name && errors.first_name && (
                  <ErrorText>{errors.first_name}</ErrorText>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<FaUser />}
                  error={touched.last_name && errors.last_name}
                  disabled={isLoading}
                />
                {touched.last_name && errors.last_name && (
                  <ErrorText>{errors.last_name}</ErrorText>
                )}
              </div>
            </InputRow>

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

            <div>
              <PasswordInputWrapper>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<FaLock />}
                  error={touched.confirm_password && errors.confirm_password}
                  disabled={isLoading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInputWrapper>
              {touched.confirm_password && errors.confirm_password && (
                <ErrorText>{errors.confirm_password}</ErrorText>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <Loader size="sm" /> : 'Create Account'}
            </Button>
          </Form>

          <LoginLink>
            Already have an account? <a href="/login">Sign in</a>
          </LoginLink>
        </RegistrationCard>
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

export default Registration;
