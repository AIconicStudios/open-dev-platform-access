
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";
import TopNavigation from "@/components/TopNavigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <TopNavigation />
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full" style={{ height: 'calc(100vh - 56px)' }}>
          <AppSidebar />
          <DashboardContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
