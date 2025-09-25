import { lazy } from "react";

const TechnicianRoutes = [
  {
    isPublic: false,
    role: "ADMIN",
    path: "/users",
    component: lazy(() => import("@/Pages/Enterprise/MyUsers")),
  },
  {
    isPublic: false,
    role: "ADMIN",
    path: "/dashboard",
    component: lazy(() => import("@/Pages/Enterprise/Dashboard")),
  },
  {
    isPublic: true,
    role: "ADMIN",
    path: "/subscriptions",
    component: lazy(() => import("@/Pages/Enterprise/SubscriptionPlans")),
  },
  {
    isPublic: true,
    role: "ADMIN",
    path: "/changePlan",
    component: lazy(() => import("@/Pages/EnterPrise/ChangePlan")),
  },
  {
    isPublic: true,
    role: "ADMIN",
    path: "/paymentSuccessfull",
    component: lazy(() => import("@/Pages/Enterprise/PaymentSuccessfull")),
  },
  {
    isPublic: true,
    role: "ADMIN",
    path: "/profileSetting",
    component: lazy(() => import("@/Pages/Enterprise/ProfileSettings")),
  },
];

export default TechnicianRoutes;
