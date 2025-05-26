
import { User } from 'lucide-react';

const TopNavigation = () => {
  return (
    <nav className="w-full h-14 bg-neutral-900 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-base text-neutral-100 font-medium">
          Open Development Platform
        </h1>
      </div>
      <div className="flex items-center">
        <User className="w-6 h-6 text-neutral-100" />
      </div>
    </nav>
  );
};

export default TopNavigation;
