import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { Button, Card, Loader, Toast } from '../components/UI';
import { authService } from '../services/registration';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.primary[100]} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
`;

const ActivationCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary[600]};
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary[50]};
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  svg {
    font-size: 4rem;
    color: ${props => props.theme.colors.success};
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary[600]};
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const EmailText = styled.span`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: 600;
`;

const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    gap: ${props => props.theme.spacing.xs};
  }
`;

const OTPInput = styled.input<{ $hasError?: boolean }>`
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid ${props => 
    props.$hasError 
      ? props.theme.colors.error 
      : props.theme.colors.gray[300]
  };
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  color: ${props => props.theme.colors.gray[800]};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.gray[100]};
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    width: 45px;
    height: 55px;
    font-size: 1.25rem;
  }
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ResendContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.9rem;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary[600]};
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
  
  &:disabled {
    color: ${props => props.theme.colors.gray[400]};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const CountdownText = styled.span`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: 600;
`;

interface LocationState {
  email?: string;
}

const Activation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Redirect if no email
  useEffect(() => {
    if (!state?.email) {
      navigate('/register');
    }
  }, [state, navigate]);

  // Handle resend countdown
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (otpValue?: string) => {
    const otpCode = otpValue || otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');
    setToast(null);

    try {
      const response = await authService.activate({
        email: state!.email!,
        otp: otpCode,
      });

      if (response.success) {
        setIsSuccess(true);
        setToast({
          message: 'Account activated successfully! Redirecting to dashboard...',
          type: 'success',
        });

        // Redirect to appropriate dashboard based on user role
        const dashboardRoute = authService.getDashboardRoute(response.data.user);
        setTimeout(() => {
          navigate(dashboardRoute);
        }, 2000);
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Invalid activation code. Please try again.';
      
      setError(errorMessage);
      setToast({
        message: errorMessage,
        type: 'error',
      });
      
      // Clear OTP inputs on error
      setOtp(['', '', '', '', '', '']);
      const firstInput = document.getElementById('otp-0');
      firstInput?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;

    setIsResending(true);
    setToast(null);

    try {
      await authService.resendOTP(state!.email!);

      setResendCountdown(60); // Start 60-second countdown
      setToast({
        message: 'Activation code sent successfully!',
        type: 'success',
      });
      
      // Clear current OTP
      setOtp(['', '', '', '', '', '']);
      setError('');

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to resend activation code. Please try again.';
      
      setToast({
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsResending(false);
    }
  };

  if (isSuccess) {
    return (
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ActivationCard>
            <SuccessIcon>
              <FaCheckCircle />
            </SuccessIcon>
            <Title>Account Activated!</Title>
            <Subtitle>
              Your account has been successfully activated. You can now sign in and start using KC Payment.
            </Subtitle>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                const user = authService.getCurrentUser();
                if (user) {
                  const dashboardRoute = authService.getDashboardRoute(user);
                  navigate(dashboardRoute);
                } else {
                  navigate('/login');
                }
              }}
            >
              Continue to Dashboard
            </Button>
          </ActivationCard>
        </motion.div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ActivationCard>
          <BackButton onClick={() => navigate('/register')}>
            <FaArrowLeft />
            Back to Registration
          </BackButton>

          <Title>Verify Your Email</Title>
          <Subtitle>
            We've sent a 6-digit activation code to <EmailText>{state?.email}</EmailText>. 
            Please enter the code below to activate your account.
          </Subtitle>

          <OTPContainer>
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                disabled={isLoading}
                $hasError={!!error}
              />
            ))}
          </OTPContainer>

          {error && <ErrorText>{error}</ErrorText>}

          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={() => handleSubmit()}
            disabled={isLoading || otp.some(digit => digit === '')}
          >
            {isLoading ? <Loader size="sm" /> : 'Activate Account'}
          </Button>

          <ResendContainer>
            Didn't receive the code?{' '}
            {resendCountdown > 0 ? (
              <CountdownText>Resend in {resendCountdown}s</CountdownText>
            ) : (
              <ResendButton
                onClick={handleResendOtp}
                disabled={isResending}
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </ResendButton>
            )}
          </ResendContainer>
        </ActivationCard>
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

export default Activation;
