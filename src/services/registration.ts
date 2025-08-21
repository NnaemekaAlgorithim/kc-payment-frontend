import api from './api';

export interface RegistrationRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegistrationResponse {
  message: string;
  user_id: string;
}

export interface ActivationRequest {
  email: string;
  otp: string;
  resend?: boolean;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  is_active: boolean;
  is_staff: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResendOTPRequest {
  email: string;
  resend: true;
}

export const authService = {
  // Register a new user
  register: async (data: RegistrationRequest): Promise<RegistrationResponse> => {
    const response = await api.post('/users/register/', data);
    return response.data;
  },

  // Activate user account with OTP and auto-login
  activate: async (data: ActivationRequest): Promise<AuthResponse> => {
    const response = await api.post('/users/activate/', data);
    
    // Store tokens in localStorage
    if (response.data.success && response.data.data) {
      localStorage.setItem('authToken', response.data.data.access_token);
      localStorage.setItem('refreshToken', response.data.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/users/login/', data);
    
    // Store tokens in localStorage
    if (response.data.success && response.data.data) {
      localStorage.setItem('authToken', response.data.data.access_token);
      localStorage.setItem('refreshToken', response.data.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  // Resend OTP
  resendOTP: async (email: string): Promise<any> => {
    const response = await api.post('/users/activate/', {
      email,
      otp: '', // Not used for resend
      resend: true,
    });
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  // Get dashboard route based on user role
  getDashboardRoute: (user: User): string => {
    return user.is_staff ? '/admin-dashboard' : '/user-dashboard';
  },
};
