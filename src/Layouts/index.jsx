import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

const UserLayout = ({ isPrivate, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth >= 1024 ? true : false
  );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {isPrivate && <Navbar toggleSidebar={toggleSidebar} />}
      {isPrivate && (
        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      )}
      <div className={`border bg-gray-100 min-h-screen ${isPrivate ? "lg:ml-64" : ""}`}>{children}</div>
    </div>
  );
};

export default UserLayout;
