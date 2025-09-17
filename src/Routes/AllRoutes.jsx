import { lazy } from "react";
import AdminRoutes from "./AdminRoutes";
import TechnicianRoutes from "./TechnicianRoutes";

const routes = [
  {
    path: "/",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/SignIn")),
  },
  {
    path: "/signIn",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/SignIn")),
  },
  {
    path: "/verifyOtp",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/VerifyOtp")),
  },
  {
    isPublic: true,
    path: "/forgotPassword",
    component: lazy(() => import("../Pages/Auth/ForgetPassword")),
  },
  {
    path: "/setNewPassword",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/SetPassword")),
  },
]
  .concat(AdminRoutes)
  .concat(TechnicianRoutes);

export default routes;
