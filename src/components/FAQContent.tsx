
import { useState } from 'react';
import { X } from 'lucide-react';
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
  id: string;
  title: string;
  isSubcategory?: boolean;
}

interface QAPair {
  id: string;
  question: string;
  answer: string;
}

const categories: Category[] = [
  { id: 'cat01', title: 'Category 01' },
  { id: 'cat01-01', title: 'Category 01.01', isSubcategory: true },
  { id: 'cat02', title: 'Category 02' },
  { id: 'cat03', title: 'Category 03' }
];

const qaData: QAPair[] = [
  {
    id: 'q1',
    question: 'Question 01:',
    answer: 'Answer 01:'
  },
  {
    id: 'q2',
    question: 'Question 02:',
    answer: 'Answer 02:'
  },
  {
    id: 'q3',
    question: 'Question 03:',
    answer: 'Answer 03:'
  },
  {
    id: 'q4',
    question: 'Question 04:',
    answer: 'Answer 04:'
  }
];

export function FAQContent() {
  const [selectedCategory, setSelectedCategory] = useState('cat01');
  const [chatInput, setChatInput] = useState('');

  return (
    <SidebarInset className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        {/* Left Panel - Categories */}
        <div className="w-64 bg-white border-r border-neutral-200 p-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  w-full text-left p-2 rounded transition-colors
                  ${category.isSubcategory ? 'ml-4 text-sm' : 'text-base'}
                  ${selectedCategory === category.id 
                    ? 'bg-neutral-200 text-neutral-900' 
                    : 'text-neutral-700 hover:bg-neutral-100'
                  }
                `}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Panel - Q&A Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl space-y-6">
              {qaData.map((qa) => (
                <div key={qa.id} className="space-y-2">
                  <div className="text-neutral-900 font-medium">
                    {qa.question}
                  </div>
                  <div className="text-neutral-700">
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer - Chat Input */}
          <div className="border-t border-neutral-200 p-4 bg-white">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="F"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
