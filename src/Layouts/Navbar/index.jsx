// import { HiUser } from "react-icons/hi2";
// import { TbLogout } from "react-icons/tb";
// import { useLocation } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { MdOutlineSettings } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import Images from "../../../HelperMethods/ImgConstants";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { customLogout } from "../../Redux/features/Auth/authSlice";

// const Navbar = ({ toggleSidebar }) => {
//   const menuRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);

//   const LogOut = useCallback(() => {
//     dispatch(customLogout());
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className="w-full h-16 bg-[#151D20] flex justify-between items-center px-4 md:px-10 sticky top-0 z-50">
//         <h3 className="text-2xl text-white font-semibold">Babylon WorkShop</h3>

//         <span className="flex space-x-4 items-center">
//           <HiUser
//             size={34}
//             className="text-white border border-white hover:bg-[#0052DE] rounded-full p-1 relative"
//             onClick={() => {
//               setShowMenu(!showMenu);
//             }}
//           />
//           <GiHamburgerMenu
//             size={30}
//             onClick={toggleSidebar}
//             className="text-white active:text-[#0052DE] block lg:hidden"
//           />

//           {showMenu && (
//             <div
//               className="py-2 px-2 rounded-sm bg-[#151D20] absolute top-[68px] right-14 flex flex-col items-start space-y-2 z-40"
//               ref={menuRef}
//             >
//               <Link
//                 to="/signIn"
//                 onClick={LogOut}
//                 className="text-white hover:bg-[#0052DE] ps-4 pr-14 py-2 rounded-sm text-semibold cursor-pointer w-full text-left"
//               >
//                 <TbLogout size={20} className="inline mr-2" />
//                 LogOut
//               </Link>
//             </div>
//           )}
//         </span>
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React from "react";

const Navbar = () => {
  return <div>Navbar</div>;
};

export default Navbar;
