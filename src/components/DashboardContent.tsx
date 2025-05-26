
import { User } from 'lucide-react';
import { SidebarInset } from "@/components/ui/sidebar";

export function DashboardContent() {
  return (
    <SidebarInset className="flex-1 flex flex-col">
      {/* Top bar with profile icon */}
      <div className="flex justify-end p-6 border-b border-neutral-200">
        <User className="w-6 h-6 text-neutral-600 hover:text-neutral-900 cursor-pointer" />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
            Dashboard
          </h1>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <p className="text-neutral-600">
              Welcome to the Open Development Platform. Select an option from the sidebar to get started.
            </p>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
