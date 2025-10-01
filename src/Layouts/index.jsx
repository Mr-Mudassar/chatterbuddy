import Navbar from "./Navbar";
import { AppSidebar } from "./SideBar";
import LoadingScreenHook from "@/hooks/loading-screen-hook";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-4 md:pl-1 md:pt-0 md:pr-3 bg-[#f6f6f6]">
          <LoadingScreenHook />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
