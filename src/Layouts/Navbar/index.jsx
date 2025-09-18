import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/Components/ui/sidebar";
import { Bell } from "lucide-react";

const Navbar = () => {
  const { state } = useSidebar();
  const isSidebarCollapsed = state === "collapsed";

  return (
    <header className="flex h-18 shrink-0 items-center justify-between pr-3 pl-1 bg-[#f6f6f6] gap-3">
        {/* <div className="flex items-center space-x-2">
          <SidebarTrigger className=" text-gray-700 " />
        </div> */}
      <Input
        placeholder="Search..."
        className="w-full h-12 py-6 border-none rounded-md bg-white shadow-md"
        type="search"
      />
      <div className="bg-white p-3 rounded-md hover:cursor-pointer hover:bg-gray-200 transition shadow-md">
        <Bell className="h-6 w-6 text-gray-600" />
      </div>
    </header>
  );
};

export default Navbar;
