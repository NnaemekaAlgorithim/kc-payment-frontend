import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    /* Fix for mobile viewport height with browser bars */
    height: 100%;
    height: calc(var(--vh, 1vh) * 100);
    /* Prevent zoom on input focus on iOS */
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.secondary[50]};
    color: ${theme.colors.secondary[900]};
    line-height: 1.6;
    height: 100%;
    /* Prevent horizontal scroll on mobile */
    overflow-x: hidden;
    /* Better text rendering on mobile */
    text-rendering: optimizeLegibility;
  }

  #root {
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
    /* Better touch targets */
    touch-action: manipulation;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    /* Better touch targets */
    touch-action: manipulation;
    /* Prevent tap highlight on mobile */
    -webkit-tap-highlight-color: transparent;
    /* Minimum touch target size */
    min-height: 44px;
    min-width: 44px;
  }

  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
    /* Better touch targets */
    touch-action: manipulation;
    /* Prevent zoom on input focus on iOS */
    font-size: 16px;
    /* Fix for iOS rounded inputs */
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    /* Better image loading */
    display: block;
  }

  /* Safe area support for devices with notches */
  @supports (padding: max(0px)) {
    .safe-area-top {
      padding-top: max(${theme.spacing.md}, env(safe-area-inset-top));
    }
    
    .safe-area-bottom {
      padding-bottom: max(${theme.spacing.md}, env(safe-area-inset-bottom));
    }
    
    .safe-area-left {
      padding-left: max(${theme.spacing.md}, env(safe-area-inset-left));
    }
    
    .safe-area-right {
      padding-right: max(${theme.spacing.md}, env(safe-area-inset-right));
    }
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondary[300]};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary[400]};
  }

  /* Hide scrollbars on mobile for cleaner look */
  @media (max-width: ${theme.breakpoints.md}) {
    ::-webkit-scrollbar {
      display: none;
    }
    
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    html {
      font-size: 14px;
    }
    
    body {
      line-height: 1.5;
    }
  }

  /* Mobile-first responsive utilities */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};

    @media (min-width: ${theme.breakpoints.sm}) {
      padding: 0 ${theme.spacing.lg};
    }

    @media (min-width: ${theme.breakpoints.lg}) {
      padding: 0 ${theme.spacing.xl};
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* High-DPI display support */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    body {
      -webkit-font-smoothing: subpixel-antialiased;
    }
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Selection styles */
  ::selection {
    background-color: ${theme.colors.primary[100]};
    color: ${theme.colors.primary[900]};
  }

  /* Better tap targets for touch devices */
  @media (pointer: coarse) {
    button, a, input, select, textarea {
      min-height: 48px;
    }
  }
`;
