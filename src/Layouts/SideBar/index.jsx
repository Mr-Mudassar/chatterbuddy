import {
  Mail,
  Flag,
  Users,
  Shield,
  SquareMenu,
  Loader2,
  Settings,
  Activity,
  FileText,
  MessageSquare,
  LayoutDashboard,
  Newspaper,
  Store,
  SlidersHorizontal,
  Building,
} from "lucide-react";
import {
  Sidebar,
  useSidebar,
  SidebarRail,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/Components/ui/sidebar";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/Assets/logo.png";

const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Enterprise", href: "/dashboard/posts", icon: Building },
  { name: "User Management", href: "/dashboard/reports", icon: Users },
];

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [loadingPath, setLoadingPath] = useState(null);
  // const { isMobile, setOpenMobile } = useSidebar();
  // const [loadingPath, setLoadingPath] = (useState < string) | (null > null);

  // // Close mobile sidebar when pathname changes
  // useEffect(() => {
  //   if (isMobile) {
  //     setOpenMobile(false);
  //   }
  // }, [pathname, isMobile, setOpenMobile]);

  // Reset loading state when pathname changes
  // useEffect(() => {
  //   setLoadingPath(null);
  // }, [pathname]);

  return (
    <Sidebar variant="floating" className="bg-[#f6f6f6] pt-3">
      <SidebarHeader>
        <Link href="/" className="flex justify-center items-center">
          <img
            src={Logo}
            alt="chatterbuddy logo"
            className="mt-4 mb-4 max-w-44"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 mb-2">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem
                    key={item.name}
                    className="mx-1 px-2 py-1" // Remove conditional bg-primary here
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={
                        isActive
                          ? "!bg-primary rounded-full !py-6  !text-white flex items-center gap-3 w-full px-4"
                          : "flex items-center gap-3 w-full !py-6 px-3"
                      }
                    >
                      <Link
                        to={item.href} // Use 'to' for react-router-dom Link
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="truncate font-medium">
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-3 text-xs text-gray-500 text-center border-t border-sidebar-border">
          GolfGuiders Orbit v1.0
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
