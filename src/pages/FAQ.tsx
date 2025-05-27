
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FAQContent } from "@/components/FAQContent";
import TopNavigation from "@/components/TopNavigation";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <TopNavigation />
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full" style={{ height: 'calc(100vh - 56px)' }}>
          <AppSidebar />
          <FAQContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default FAQ;
