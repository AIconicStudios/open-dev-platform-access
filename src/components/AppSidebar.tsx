
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { 
    title: "Assets", 
    hasSubmenu: true,
    submenu: [
      {
        title: "Research",
        hasSubmenu: true,
        submenu: [
          "Astronomy",
          "Automotive", 
          "Healthcare",
          "Manufacturing",
          "Security",
          "Sports"
        ]
      },
      { title: "Education", hasSubmenu: false },
      { title: "Technology", hasSubmenu: false }
    ]
  },
  { title: "Education", hasSubmenu: false }
];

const bottomMenuItems = [
  { title: "Community", hasSubmenu: false },
  { title: "Legal", hasSubmenu: false }
];

export function AppSidebar() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  return (
    <Sidebar className="border-r border-neutral-700" style={{ width: '280px' }}>
      <SidebarHeader className="p-6 border-b border-neutral-700">
        <h2 className="text-lg text-neutral-100 font-medium">
          Open Assets
        </h2>
      </SidebarHeader>
      
      <SidebarContent className="bg-neutral-800 flex flex-col justify-between">
        <SidebarMenu className="p-4 space-y-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() => item.hasSubmenu && toggleExpanded(item.title)}
                className="w-full justify-between text-neutral-100 hover:bg-neutral-700 hover:text-neutral-100 data-[active=true]:bg-neutral-700 data-[active=true]:text-neutral-100"
              >
                <span className="text-base">{item.title}</span>
                {item.hasSubmenu && (
                  expandedItems[item.title] ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                )}
              </SidebarMenuButton>
              
              {item.hasSubmenu && expandedItems[item.title] && (
                <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <SidebarMenuSubItem key={typeof subItem === 'string' ? subItem : subItem.title}>
                      {typeof subItem === 'string' ? (
                        <SidebarMenuSubButton className="text-neutral-200 hover:bg-neutral-700 hover:text-neutral-100 pl-4">
                          {subItem}
                        </SidebarMenuSubButton>
                      ) : (
                        <>
                          <SidebarMenuSubButton
                            onClick={() => toggleExpanded(subItem.title)}
                            className="w-full justify-between text-neutral-200 hover:bg-neutral-700 hover:text-neutral-100 pl-4"
                          >
                            <span>{subItem.title}</span>
                            {subItem.hasSubmenu && (
                              expandedItems[subItem.title] ? 
                                <ChevronDown className="h-4 w-4" /> : 
                                <ChevronRight className="h-4 w-4" />
                            )}
                          </SidebarMenuSubButton>
                          
                          {subItem.hasSubmenu && expandedItems[subItem.title] && (
                            <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                              {subItem.submenu?.map((nestedItem) => (
                                <SidebarMenuSubItem key={nestedItem}>
                                  <SidebarMenuSubButton className="text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 pl-6 text-sm">
                                    {nestedItem}
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}
                        </>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarFooter className="p-4">
          <SidebarMenu className="space-y-1">
            {bottomMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="w-full text-neutral-100 hover:bg-neutral-700 hover:text-neutral-100">
                  <span className="text-base">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
