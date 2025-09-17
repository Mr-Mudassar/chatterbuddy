// import { TbCar } from "react-icons/tb";
// import { RxCross2 } from "react-icons/rx";
// import { LuSettings } from "react-icons/lu";
// import { TbCarGarage } from "react-icons/tb";
// import { LuUserRoundCog } from "react-icons/lu";
// import { IoCarSportOutline } from "react-icons/io5";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { MdLogout, MdOutlineSpaceDashboard } from "react-icons/md";
// import { customLogout } from "../../Redux/features/Auth/authSlice";
// import React, { memo, useCallback, useEffect, useState } from "react";

// const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
//   const location = useLocation();
//   const path = location.pathname;
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState("");
//   const { user } = useSelector((state) => state.user);

//   const LogOut = useCallback(() => {
//     dispatch(customLogout());
//   }, []);

//   const AdminPages = [
//     {
//       title: "Dashboard",
//       link: "/admin/dashboard",
//       icon: <MdOutlineSpaceDashboard size={22} />,
//     },
//     {
//       title: "Vehicles",
//       link: "/admin/allVehicles",
//       icon: <TbCar size={24} />,
//     },
//     {
//       title: "Delivered Vehicles",
//       link: "/admin/deliveredVehicles",
//       icon: <IoCarSportOutline size={24} />,
//     },
//     {
//       title: "Technicians",
//       link: "/admin/technicians",
//       icon: <LuUserRoundCog size={22} />,
//     },
//     {
//       title: "Settings",
//       link: "/admin/settings",
//       icon: <LuSettings size={20} />,
//     },
//   ];

//   const TechnicianPages = [
//     {
//       icon: <TbCar size={24} />,
//       title: "Vehicles",
//       link: "/technician/allVehicles",
//     },
//     {
//       title: "Delivered Vehicles",
//       icon: <IoCarSportOutline size={24} />,
//       link: "/technician/deliveredVehicles",
//     },
//     {
//       icon: <TbCarGarage size={24} />,
//       title: "Assigned Vehicles",
//       link: "/technician/assignedVehicles",
//     },
//   ];

//   const sideBarLinks = user?.role === "admin" ? AdminPages : TechnicianPages;

//   return (
//     isSidebarOpen && (
//       <div
//         className={`bg-slate-100 h-full border-r border-slate-200 justify-between fixed top-0 lg:top-16 transition-all w-64 overflow-y-auto z-50 `}
//       >
//         {/* Top Section */}
//         <div>
//           <div className="block lg:hidden">
//             <div className="flex justify-between items-center p-4">
//               <h3 className="font-semibold text-xl">Babylon WorkShop</h3>
//               <RxCross2
//                 size={24}
//                 onClick={toggleSidebar}
//                 className=" text-gray-600 hover:bg-gray-300 hover:text-red-600"
//               />
//             </div>
//           </div>

//           <div className="p-6 border-b">
//             <h2 className="text-lg font-bold">Hello {user?.role}!</h2>
//             <p className="text-gray-500 text-sm  break-words">{user?.email}</p>
//           </div>

//           <div className="flex flex-col p-4 space-y-4">
//             {sideBarLinks.map((item, index) => (
//               <Link
//                 to={item.link}
//                 key={index}
//                 className={`flex items-center p-3 space-x-3 w-full rounded-sm ${
//                   path === item.link
//                     ? "text-white bg-[#0052DE]"
//                     : "text-gray-600 hover:text-blue-700 hover:bg-blue-200"
//                 }`}
//               >
//                 {item.icon}
//                 <span className="text-sm font-medium">{item.title}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className="p-4">
//           <button
//             onClick={LogOut}
//             className={`flex items-center  p-3 space-x-3 w-full rounded-sm ${
//               activeTab === "logout"
//                 ? "text-white bg-[#0052DE]"
//                 : "text-gray-600 hover:text-blue-700 hover:bg-blue-200"
//             }`}
//           >
//             <MdLogout className="w-5 h-5" />
//             <span className="text-sm font-medium">LogOut</span>
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// export default memo(Sidebar);

import React from "react";

const Sidebar = () => {
  return <div>Sidebar</div>;
};

export default Sidebar;
