import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaBolt, 
  FaGlobe, 
  FaMobile, 
  FaChartLine, 
  FaCreditCard,
  FaArrowRight,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';
import { theme } from '../styles/theme';
import { Container, Section, Grid, Flex, Card, CardHeader, CardContent, Button } from '../components/UI';

const HeroSection = styled(Section)`
  background: ${theme.colors.gradient.light};
  padding-top: calc(${theme.spacing['4xl']} + 60px); /* Account for fixed header */
  text-align: center;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${theme.colors.primary[100]} 0%, transparent 70%);
    opacity: 0.3;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${theme.fontSizes['5xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.secondary[900]};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.secondary[600]};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    
    button {
      width: 100%;
      max-width: 300px;
    }
  }
`;

const TrustIndicators = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.lg};
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.secondary[600]};
  font-size: ${theme.fontSizes.sm};
  
  svg {
    color: ${theme.colors.success[500]};
  }
`;

const FeaturesSection = styled(Section)`
  background: ${theme.colors.secondary[50]};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.secondary[900]};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.secondary[600]};
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  height: 100%;
  
  svg {
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.primary[500]};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.secondary[900]};
  margin-bottom: ${theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.secondary[600]};
  line-height: 1.6;
`;

const StatsSection = styled(Section)`
  background: ${theme.colors.gradient.primary};
  color: white;
  text-align: center;
`;

const StatsGrid = styled(Grid)`
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  h3 {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.spacing.sm};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    opacity: 0.9;
  }
`;

const CTASection = styled(Section)`
  background: ${theme.colors.secondary[100]};
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.secondary[900]};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const CTADescription = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.secondary[600]};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Landing: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Bank-Level Security',
      description: 'End-to-end encryption and PCI DSS compliance ensure your transactions are always secure.'
    },
    {
      icon: FaBolt,
      title: 'Lightning Fast',
      description: 'Process payments in seconds with our optimized infrastructure and global network.'
    },
    {
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Accept payments from customers worldwide with support for 100+ currencies.'
    },
    {
      icon: FaMobile,
      title: 'Mobile Optimized',
      description: 'Perfect payment experience on any device with our responsive design.'
    },
    {
      icon: FaChartLine,
      title: 'Real-time Analytics',
      description: 'Get insights into your business with comprehensive reporting and analytics.'
    },
    {
      icon: FaCreditCard,
      title: 'Multiple Payment Methods',
      description: 'Support for credit cards, digital wallets, bank transfers, and more.'
    }
  ];

  return (
    <>
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroTitle {...fadeInUp}>
              Accept Payments<br />
              <span style={{ color: theme.colors.primary[600] }}>Anywhere, Anytime</span>
            </HeroTitle>
            
            <HeroSubtitle 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Streamline your payment process with KC Payment - the modern, secure, 
              and mobile-first payment platform designed for businesses that scale.
            </HeroSubtitle>
            
            <HeroActions
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Button size="lg">
                Get Started Free
                <FaArrowRight />
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </HeroActions>
            
            <TrustIndicators
              {...fadeInUp}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <TrustItem>
                <FaCheckCircle />
                PCI DSS Compliant
              </TrustItem>
              <TrustItem>
                <FaCheckCircle />
                99.9% Uptime
              </TrustItem>
              <TrustItem>
                <FaCheckCircle />
                24/7 Support
              </TrustItem>
              <TrustItem>
                <FaCheckCircle />
                No Setup Fees
              </TrustItem>
            </TrustIndicators>
          </HeroContent>
        </Container>
      </HeroSection>

      <FeaturesSection id="features">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionTitle>Why Choose KC Payment?</SectionTitle>
              <SectionSubtitle>
                Everything you need to accept, process, and manage payments online and in-person.
              </SectionSubtitle>
            </motion.div>
            
            <Grid columns={3}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureCard hover>
                    <CardContent>
                      <feature.icon />
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </CardContent>
                  </FeatureCard>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </FeaturesSection>

      <StatsSection>
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionTitle style={{ color: 'white' }}>
                Trusted by Thousands
              </SectionTitle>
              <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Join the growing community of businesses using KC Payment
              </SectionSubtitle>
            </motion.div>
            
            <StatsGrid columns={4}>
              <motion.div variants={fadeInUp}>
                <StatCard>
                  <h3>10K+</h3>
                  <p>Active Merchants</p>
                </StatCard>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatCard>
                  <h3>$2.5B</h3>
                  <p>Processed</p>
                </StatCard>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatCard>
                  <h3>150+</h3>
                  <p>Countries</p>
                </StatCard>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatCard>
                  <h3>99.9%</h3>
                  <p>Uptime</p>
                </StatCard>
              </motion.div>
            </StatsGrid>
          </motion.div>
        </Container>
      </StatsSection>

      <CTASection>
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <CTATitle>Ready to Get Started?</CTATitle>
            <CTADescription>
              Join thousands of businesses already using KC Payment to grow their revenue.
            </CTADescription>
            <Flex justify="center" gap={theme.spacing.lg}>
              <Button size="lg">
                Start Free Trial
                <FaArrowRight />
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Flex>
          </motion.div>
        </Container>
      </CTASection>
    </>
  );
};

export default Landing;
