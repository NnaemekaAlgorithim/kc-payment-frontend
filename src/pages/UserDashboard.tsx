import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaCreditCard, FaHistory, FaCog } from 'react-icons/fa';
import { Card } from '../components/UI';
import { authService } from '../services/registration';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.primary[100]} 100%);
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary[600]};
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const LogoutButton = styled.button`
  background: ${props => props.theme.colors.error};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary[700]};
    transform: translateY(-2px);
  }
`;

const WelcomeCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const WelcomeText = styled.h2`
  color: ${props => props.theme.colors.primary[600]};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 1.5rem;
`;

const UserInfo = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin: 0;
  font-size: 1rem;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ActionCard = styled(Card)`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ActionIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary[500]};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ActionTitle = styled.h3`
  color: ${props => props.theme.colors.primary[600]};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 1.25rem;
`;

const ActionDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin: 0;
  font-size: 0.9rem;
`;

const UserDashboard: React.FC = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <DashboardContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <Title>User Dashboard</Title>
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Header>

        <WelcomeCard>
          <WelcomeText>Welcome back, {user.first_name}!</WelcomeText>
          <UserInfo>
            {user.email} • Account Status: {user.is_active ? 'Active' : 'Inactive'}
          </UserInfo>
        </WelcomeCard>

        <QuickActionsGrid>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaUser />
              </ActionIcon>
              <ActionTitle>Profile Settings</ActionTitle>
              <ActionDescription>
                Update your personal information and preferences
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaCreditCard />
              </ActionIcon>
              <ActionTitle>Payment Methods</ActionTitle>
              <ActionDescription>
                Manage your cards and payment options
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaHistory />
              </ActionIcon>
              <ActionTitle>Transaction History</ActionTitle>
              <ActionDescription>
                View your payment history and receipts
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaCog />
              </ActionIcon>
              <ActionTitle>Account Settings</ActionTitle>
              <ActionDescription>
                Security settings and account preferences
              </ActionDescription>
            </ActionCard>
          </motion.div>
        </QuickActionsGrid>
      </motion.div>
    </DashboardContainer>
  );
};

export default UserDashboard;
