
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import CollectorDashboard from './components/CollectorDashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="w-screen h-screen">
      {isLoggedIn ? <CollectorDashboard onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />}
    </div>
  );
};

export default App;
