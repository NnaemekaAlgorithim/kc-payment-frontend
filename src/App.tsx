import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header, Footer } from './components/Layout';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Activation from './pages/Activation';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* Landing page with full layout */}
            <Route path="/" element={
              <>
                <Header 
                  onLoginClick={() => window.location.href = '/login'} 
                  onSignupClick={() => window.location.href = '/register'} 
                />
                <main style={{ flex: 1 }}>
                  <Landing />
                </main>
                <Footer />
              </>
            } />
            
            {/* Auth pages without header/footer */}
            <Route path="/register" element={<Registration />} />
            <Route path="/activate" element={<Activation />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard pages */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
