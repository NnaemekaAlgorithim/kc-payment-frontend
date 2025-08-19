import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaCreditCard, FaUserCircle } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { Button } from '../UI';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.secondary[200]};
  z-index: ${theme.zIndex.sticky};
  transition: all ${theme.transitions.normal};
  /* Safe area support for notched devices */
  padding-top: env(safe-area-inset-top);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary[600]};
  cursor: pointer;
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.secondary[700]};
  font-weight: ${theme.fontWeights.medium};
  transition: color ${theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.primary[600]};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${theme.colors.secondary[700]};
  font-size: ${theme.fontSizes.xl};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${theme.colors.secondary[100]};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: ${theme.zIndex.modal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xl};
`;

const MobileNavLink = styled.a`
  color: ${theme.colors.secondary[700]};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: none;
  color: ${theme.colors.secondary[700]};
  font-size: ${theme.fontSizes['2xl']};
  padding: ${theme.spacing.sm};
`;

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <FaCreditCard />
          KC Payment
        </Logo>
        
        <DesktopMenu>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <Button variant="outline" size="sm" onClick={onLoginClick}>
            Login
          </Button>
          <Button size="sm" onClick={onSignupClick}>
            Get Started
          </Button>
        </DesktopMenu>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <FaBars />
        </MobileMenuButton>
      </Nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={closeMobileMenu}>
              <FaTimes />
            </CloseButton>
            
            <MobileNavLink href="#features" onClick={closeMobileMenu}>
              Features
            </MobileNavLink>
            <MobileNavLink href="#pricing" onClick={closeMobileMenu}>
              Pricing
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={closeMobileMenu}>
              Contact
            </MobileNavLink>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, width: '80%' }}>
              <Button variant="outline" fullWidth onClick={() => { onLoginClick?.(); closeMobileMenu(); }}>
                Login
              </Button>
              <Button fullWidth onClick={() => { onSignupClick?.(); closeMobileMenu(); }}>
                Get Started
              </Button>
            </div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
