
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function DashboardContent() {
  return (
    <SidebarInset className="flex-1 flex flex-col">
      {/* Main content header */}
      <div className="flex justify-between items-center p-6 border-b border-neutral-200">
        <h1 className="text-3xl font-bold text-neutral-900">
          Open Assets
        </h1>
        <Button className="bg-sky-600 hover:bg-sky-700 text-sky-200">
          Join the team
        </Button>
      </div>
      
      {/* Workspace area */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg border border-neutral-200 p-6 h-full">
            <p className="text-neutral-600">
              Workspace area - This is where card/table views will be implemented.
            </p>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
