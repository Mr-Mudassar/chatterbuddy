import { lazy } from "react";

const AdminRoutes = [
  {
    role: "admin",
    isPublic: true,
    path: "/admin/login",
    component: lazy(() => import("@/Pages/Admin/SignIn")),
  },
  {
    role: "admin",
    isPublic: false,
    path: "/admin/dashboard",
    component: lazy(() => import("@/Pages/Admin/Dashboard")),
  },
  {
    role: "admin",
    isPublic: false,
    path: "/admin/enterprises",
    component: lazy(() => import("@/Pages/Admin/EnterPriseListing")),
  },
  {
    role: "admin",
    isPublic: false,
    path: "/admin/usersManagement",
    component: lazy(() => import("@/Pages/Admin/UserManagement")),
  },
];

export default AdminRoutes;
