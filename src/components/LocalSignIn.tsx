
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code2 } from 'lucide-react';

interface LocalSignInProps {
  onNext: (screen: string) => void;
}

const LocalSignIn = ({ onNext }: LocalSignInProps) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempt:', { userId, password });
  };

  const handleResetPassword = () => {
    onNext('reset-email');
  };

  return (
    <>
      {/* Left Section - Form */}
      <div className="w-1/4 bg-neutral-50 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-base text-neutral-900 font-medium mb-2">
              Open Development Platform
            </h2>
            <h3 className="text-lg text-neutral-800 font-medium">
              Local Sign in
            </h3>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-neutral-50 border-neutral-300 placeholder:text-neutral-500"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-50 border-neutral-300 placeholder:text-neutral-500"
            />

            <div className="flex gap-3">
              <Button
                onClick={handleLogin}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-sky-200"
              >
                Login
              </Button>
              <Button
                onClick={handleResetPassword}
                variant="outline"
                className="flex-1 border-sky-600 text-sky-600 hover:bg-sky-50"
              >
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Branded Area */}
      <div className="w-3/4 bg-neutral-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-neutral-800 rounded-lg flex items-center justify-center">
            <Code2 className="w-16 h-16 text-neutral-400" />
          </div>
          <h3 className="text-xl text-neutral-100 font-medium">
            Welcome Back
          </h3>
          <p className="text-neutral-400 max-w-md">
            Sign in to access your development workspace, manage projects, 
            and collaborate with your team.
          </p>
        </div>
      </div>
    </>
  );
};

export default LocalSignIn;
