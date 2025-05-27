
import { Search, File, Bell, User, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const TopNavigation = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    admin: true // Admin starts expanded as indicated by inverted caret
  });

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <nav className="w-full h-14 bg-neutral-900 flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <h1 className="text-base text-neutral-100 font-medium">
          Open Development
        </h1>
        <div className="text-neutral-400">|</div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center text-neutral-100 hover:text-neutral-300 transition-colors"
            onClick={() => toggleExpanded('admin')}
          >
            <span className={`mr-1 transform transition-transform ${expandedItems.admin ? 'rotate-180' : ''}`}>
              ^
            </span>
            Admin
          </button>
          <button className="text-neutral-100 hover:text-neutral-300 transition-colors">Assets</button>
          <button className="text-neutral-100 hover:text-neutral-300 transition-colors">Projects</button>
          <button className="text-neutral-100 hover:text-neutral-300 transition-colors">Education</button>
          <button className="text-neutral-100 hover:text-neutral-300 transition-colors">Events</button>
          <button className="text-neutral-100 hover:text-neutral-300 transition-colors">Publications</button>
          <button className="text-neutral-100 hover:text-neutral-300 transition-colors">Network</button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-neutral-100 hover:text-neutral-300 cursor-pointer transition-colors" />
        <File className="w-5 h-5 text-neutral-100 hover:text-neutral-300 cursor-pointer transition-colors" />
        <Bell className="w-5 h-5 text-neutral-100 hover:text-neutral-300 cursor-pointer transition-colors" />
        <User className="w-5 h-5 text-neutral-100 hover:text-neutral-300 cursor-pointer transition-colors" />
        <div className="text-neutral-400">⋮</div>
        <div className="w-5 h-5 bg-neutral-600 hover:bg-neutral-500 cursor-pointer transition-colors flex items-center justify-center">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1 h-1 bg-neutral-100"></div>
            <div className="w-1 h-1 bg-neutral-100"></div>
            <div className="w-1 h-1 bg-neutral-100"></div>
            <div className="w-1 h-1 bg-neutral-100"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
