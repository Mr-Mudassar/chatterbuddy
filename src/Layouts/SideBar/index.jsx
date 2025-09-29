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
import Logo from "@/Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  Building,
  LogOut,
  Settings,
  SubscriptIcon,
  Gem,
} from "lucide-react";
import { customLogout } from "@/redux/features/admin/adminSlice";
import toast from "react-hot-toast";
import LoadingScreen from "@/Components/LoadingScreen";
import LoadingScreenHook from "@/hooks/loading-screen-hook";

const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Enterprise", href: "/admin/enterprises", icon: Building },
  { name: "User Management", href: "/admin/usersManagement", icon: Users },
];

const enterpriseNavigation = [
  { name: "Dashboard", href: "/enterprise/dashboard", icon: LayoutDashboard },
  { name: "My Enterprise", href: "/enterprise/my-enterprise", icon: Users },
  {
    name: "Subscription Management",
    href: "/enterprise/subscriptions",
    icon: Gem,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const { userRole } = useSelector((state) => state?.user);

  const CustomLogout = () => {
    dispatch(customLogout());
    toast.success("Logged out successfully");
  };

  const AllNavigation =
    userRole === "SUPERADMIN" ? adminNavigation : enterpriseNavigation;
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
            {userRole === "SUPERADMIN" ? "Administration" : "Enterprise"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {AllNavigation.map((item) => {
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
                          ? "!bg-primary rounded-full  !py-6  !text-white flex items-center gap-3 w-full px-4"
                          : "flex items-center gap-3 w-full !py-6 px-3 rounded-full"
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
        <div
          className="flex items-center gap-2 mx-2 hover:cursor-pointer hover:bg-gray-200 px-4 py-3 rounded-full"
          onClick={() => navigate("/profile-settings")}
        >
          <Settings className="h-4 w-4 text-gray-500" />
          <p className="text-gray-700 font-semibold">Profile Settings</p>
        </div>
        <div
          className="flex items-center gap-2 mx-2 mb-2 hover:cursor-pointer hover:bg-red-100 px-4 py-3 rounded-full"
          onClick={() => CustomLogout()}
        >
          <LogOut className="h-4 w-4 text-red-700" />
          <p className="text-sm text-red-700 font-semibold">Logout</p>
        </div>
      </SidebarFooter>
      <LoadingScreenHook />
      <SidebarRail />
    </Sidebar>
  );
}
