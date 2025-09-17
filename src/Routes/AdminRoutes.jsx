import { lazy } from "react";

const AdminRoutes = [
  {
    role: "admin",
    isPublic: true,
    path: "/admin/login",
    component: lazy(() => import("@/Pages/Admin/SignIn")),
  },
];

export default AdminRoutes;
