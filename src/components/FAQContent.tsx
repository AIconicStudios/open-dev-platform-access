
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
    answer: 'Answer 04:'
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
    <SidebarInset className="flex-1 flex flex-col bg-neutral-50">
      {/* Main two-panel layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Categories */}
        <div className="w-80 bg-white border-r border-neutral-200 flex flex-col">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">Categories</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-colors text-sm
                    ${category.isSubcategory ? 'ml-6 pl-4' : ''}
                    ${selectedCategory === category.id 
                      ? 'bg-neutral-700 text-neutral-100' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                    }
                  `}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Q&A Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">FAQ Content</h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl space-y-6">
              {qaData.map((qa) => (
                <div key={qa.id} className="space-y-3">
                  <div className="text-neutral-900 font-semibold text-base">
                    {qa.question}
                  </div>
                  <div className="text-neutral-700 text-sm leading-relaxed pl-4 border-l-2 border-neutral-200">
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Chat Interface - Full Width */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex items-center space-x-4 max-w-6xl mx-auto">
          <div className="flex-1">
            <Input
              placeholder="F"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full h-12 px-4 border border-neutral-300 rounded-lg focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </SidebarInset>
  );
}
