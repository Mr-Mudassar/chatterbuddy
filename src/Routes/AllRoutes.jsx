import { lazy } from "react";
import AdminRoutes from "./AdminRoutes";
import TechnicianRoutes from "./EnterpriseRoutes";

const routes = [
  {
    path: "/",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/SignIn")),
  },
  {
    path: "/login",
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
  {
    path: "/choosePlan",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/BuyPackage")),
  },
  {
    path: "/enterprise-new-password/:token",
    isPublic: true,
    component: lazy(() => import("../Pages/Auth/EnterpriseNewPassword")),
  },
  {
    isPublic: true,
    path: "/enterprise/paymentSuccessfull",
    component: lazy(() => import("@/Pages/Auth/PaymentSuccessfull")),
  },
]
  .concat(AdminRoutes)
  .concat(TechnicianRoutes);

export default routes;
