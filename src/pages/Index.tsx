
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/TopNavigation';
import InitialLogin from '@/components/InitialLogin';
import LocalSignIn from '@/components/LocalSignIn';
import ResetPasswordEmail from '@/components/ResetPasswordEmail';
import ResetPasswordNewPassword from '@/components/ResetPasswordNewPassword';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('initial');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleScreenChange = (screen: string, email?: string) => {
    if (screen === 'dashboard') {
      navigate('/dashboard');
      return;
    }
    
    setCurrentScreen(screen);
    if (email) {
      setUserEmail(email);
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'initial':
        return <InitialLogin onNext={handleScreenChange} />;
      case 'local-signin':
        return <LocalSignIn onNext={handleScreenChange} />;
      case 'reset-email':
        return <ResetPasswordEmail onNext={handleScreenChange} />;
      case 'reset-password':
        return <ResetPasswordNewPassword email={userEmail} onNext={handleScreenChange} />;
      default:
        return <InitialLogin onNext={handleScreenChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopNavigation />
      <div className="flex h-[calc(100vh-56px)]">
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default Index;
