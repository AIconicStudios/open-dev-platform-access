
import { useState } from 'react';
import { ChevronDown, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InitialLoginProps {
  onNext: (screen: string) => void;
}

const InitialLogin = ({ onNext }: InitialLoginProps) => {
  const [selectedOption, setSelectedOption] = useState('local-id');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = () => {
    if (acceptedTerms && selectedOption === 'local-id') {
      onNext('local-signin');
    }
  };

  return (
    <>
      {/* Left Section - Form */}
      <div className="w-1/4 bg-neutral-50 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-base text-neutral-900 font-medium mb-6">
              Open Development Platform
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-neutral-700 mb-2 block">
                Sign in with
              </label>
              
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger className="w-full bg-neutral-50 border-neutral-300">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neutral-600" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white border-neutral-300">
                  <SelectItem value="local-id">Local ID</SelectItem>
                  <SelectItem value="oauth">OAuth</SelectItem>
                  <SelectItem value="sso">SSO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="border-neutral-400"
              />
              <label 
                htmlFor="terms" 
                className="text-sm text-neutral-700 cursor-pointer"
              >
                Accept Terms and Conditions
              </label>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!acceptedTerms}
              className="w-full bg-sky-600 hover:bg-sky-700 text-sky-200 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - Branded Area */}
      <div className="w-3/4 bg-neutral-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-neutral-800 rounded-lg flex items-center justify-center">
            <Shield className="w-16 h-16 text-neutral-400" />
          </div>
          <h3 className="text-xl text-neutral-100 font-medium">
            Secure Development Environment
          </h3>
          <p className="text-neutral-400 max-w-md">
            Access your development tools and collaborate with your team in a secure, 
            integrated platform designed for modern development workflows.
          </p>
        </div>
      </div>
    </>
  );
};

export default InitialLogin;
