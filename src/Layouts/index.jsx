import Navbar from "./Navbar";
import { AppSidebar } from "./SideBar";
import LoadingScreenHook from "@/Hooks/loading-screen-hook";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";


export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <Navbar /> */}
        {/* <SidebarTrigger className="text-gray-700 bg-white h-12 w-12 shadow-md border" /> */}

        <main className="flex-1 p-4 md:pl-1 md:pt-0 md:pr-3 !pt-3 bg-[#f6f6f6]">
          <LoadingScreenHook />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
