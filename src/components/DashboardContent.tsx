
import { SidebarInset } from "@/components/ui/sidebar";
import { AssetsView } from "@/components/AssetsView";

export function DashboardContent() {
  return (
    <SidebarInset className="flex-1 flex flex-col">
      <AssetsView />
    </SidebarInset>
  );
}
