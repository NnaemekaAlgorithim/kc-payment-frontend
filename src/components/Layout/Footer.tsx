import React from 'react';
import styled from 'styled-components';
import { FaCreditCard, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { Container, Grid, Flex } from '../UI';

const FooterContainer = styled.footer`
  background: ${theme.colors.secondary[900]};
  color: ${theme.colors.secondary[300]};
  padding: ${theme.spacing['3xl']} 0 ${theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${theme.colors.secondary[50]};
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.semibold};
    margin-bottom: ${theme.spacing.lg};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: ${theme.spacing.sm};
      
      a {
        color: ${theme.colors.secondary[400]};
        transition: color ${theme.transitions.fast};
        cursor: pointer;
        
        &:hover {
          color: ${theme.colors.primary[400]};
        }
      }
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary[400]};
  margin-bottom: ${theme.spacing.lg};
`;

const Description = styled.p`
  color: ${theme.colors.secondary[400]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${theme.colors.secondary[800]};
    color: ${theme.colors.secondary[400]};
    border-radius: ${theme.borderRadius.full};
    transition: all ${theme.transitions.fast};
    
    &:hover {
      background: ${theme.colors.primary[600]};
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.secondary[800]};
  padding-top: ${theme.spacing.lg};
  text-align: center;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.secondary[500]};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
  justify-content: center;
  
  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 0;
  }
  
  a {
    color: ${theme.colors.secondary[500]};
    font-size: ${theme.fontSizes.sm};
    transition: color ${theme.transitions.fast};
    cursor: pointer;
    
    &:hover {
      color: ${theme.colors.primary[400]};
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <Logo>
              <FaCreditCard />
              KC Payment
            </Logo>
            <Description>
              Secure, fast, and reliable payment solutions for businesses of all sizes. 
              Accept payments anywhere, anytime with our modern platform.
            </Description>
            <SocialLinks>
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Product</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#api">API Documentation</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#status">System Status</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © 2024 KC Payment. All rights reserved.
          </Copyright>
          <LegalLinks>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
