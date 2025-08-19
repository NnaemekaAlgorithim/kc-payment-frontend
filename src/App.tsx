import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header, Footer } from './components/Layout';
import Landing from './pages/Landing';

function App() {
  const handleLoginClick = () => {
    console.log('Login clicked');
    // TODO: Navigate to login page or open login modal
  };

  const handleSignupClick = () => {
    console.log('Signup clicked');
    // TODO: Navigate to signup page or open signup modal
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
        <main style={{ flex: 1 }}>
          <Landing />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
