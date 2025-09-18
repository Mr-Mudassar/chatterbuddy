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
];

export default AdminRoutes;
