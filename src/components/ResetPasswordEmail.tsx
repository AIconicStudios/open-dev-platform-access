
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

interface ResetPasswordEmailProps {
  onNext: (screen: string, email?: string) => void;
}

const ResetPasswordEmail = ({ onNext }: ResetPasswordEmailProps) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email) {
      onNext('reset-password', email);
    }
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
              Enter email
            </h3>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-50 border-neutral-300 placeholder:text-neutral-500"
            />

            <Button
              onClick={handleResetPassword}
              disabled={!email}
              className="w-full bg-sky-600 hover:bg-sky-700 text-sky-200"
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - Branded Area */}
      <div className="w-3/4 bg-neutral-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-neutral-800 rounded-lg flex items-center justify-center">
            <Mail className="w-16 h-16 text-neutral-400" />
          </div>
          <h3 className="text-xl text-neutral-100 font-medium">
            Password Recovery
          </h3>
          <p className="text-neutral-400 max-w-md">
            Enter your email address and we'll send you instructions 
            to reset your password securely.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordEmail;
