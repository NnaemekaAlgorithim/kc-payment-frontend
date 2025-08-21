import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUsers, FaChartBar, FaCog, FaShieldAlt, FaDatabase, FaClipboardList } from 'react-icons/fa';
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
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]} 0%, ${props => props.theme.colors.primary[600]} 100%);
  color: white;
`;

const WelcomeText = styled.h2`
  color: white;
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 1.5rem;
`;

const AdminInfo = styled.p`
  color: ${props => props.theme.colors.primary[100]};
  margin: 0;
  font-size: 1rem;
`;

const AdminActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ActionCard = styled(Card)`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${props => props.theme.colors.primary[100]};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary[300]};
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  background: ${props => props.theme.colors.primary[600]};
  color: white;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const AdminDashboard: React.FC = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  if (!user || !user.is_staff) {
    window.location.href = '/user-dashboard';
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
          <Title>Admin Dashboard</Title>
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Header>

        <WelcomeCard>
          <WelcomeText>Welcome back, {user.first_name}!</WelcomeText>
          <AdminInfo>
            Administrator Access • {user.email}
          </AdminInfo>
        </WelcomeCard>

        <StatsGrid>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard>
              <StatValue>1,234</StatValue>
              <StatLabel>Total Users</StatLabel>
            </StatCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard>
              <StatValue>$45,678</StatValue>
              <StatLabel>Total Revenue</StatLabel>
            </StatCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard>
              <StatValue>567</StatValue>
              <StatLabel>Transactions Today</StatLabel>
            </StatCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard>
              <StatValue>89%</StatValue>
              <StatLabel>Success Rate</StatLabel>
            </StatCard>
          </motion.div>
        </StatsGrid>

        <AdminActionsGrid>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaUsers />
              </ActionIcon>
              <ActionTitle>User Management</ActionTitle>
              <ActionDescription>
                Manage user accounts, permissions, and access levels
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaChartBar />
              </ActionIcon>
              <ActionTitle>Analytics & Reports</ActionTitle>
              <ActionDescription>
                View detailed analytics and generate reports
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaClipboardList />
              </ActionIcon>
              <ActionTitle>Transaction Management</ActionTitle>
              <ActionDescription>
                Monitor and manage all payment transactions
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaShieldAlt />
              </ActionIcon>
              <ActionTitle>Security Settings</ActionTitle>
              <ActionDescription>
                Configure security policies and monitoring
              </ActionDescription>
            </ActionCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ActionCard>
              <ActionIcon>
                <FaDatabase />
              </ActionIcon>
              <ActionTitle>System Configuration</ActionTitle>
              <ActionDescription>
                Manage system settings and configurations
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
              <ActionTitle>Admin Settings</ActionTitle>
              <ActionDescription>
                Personal admin preferences and configurations
              </ActionDescription>
            </ActionCard>
          </motion.div>
        </AdminActionsGrid>
      </motion.div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
