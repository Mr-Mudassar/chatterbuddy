import { lazy } from "react";

const AdminRoutes = [
  {
    role: "SUPERADMIN",
    isPublic: true,
    path: "/admin/login",
    component: lazy(() => import("@/Pages/Admin/SignIn")),
  },
  {
    role: "SUPERADMIN",
    isPublic: false,
    path: "/admin/dashboard",
    component: lazy(() => import("@/Pages/Admin/Dashboard")),
  },
  {
    role: "SUPERADMIN",
    isPublic: false,
    path: "/admin/enterprises",
    component: lazy(() => import("@/Pages/Admin/EnterPriseListing")),
  },
  {
    role: "SUPERADMIN",
    isPublic: false,
    path: "/admin/usersManagement",
    component: lazy(() => import("@/Pages/Admin/UserManagement")),
  },
];

export default AdminRoutes;
