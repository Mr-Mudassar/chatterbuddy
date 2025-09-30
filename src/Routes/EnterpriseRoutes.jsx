import { lazy } from "react";

const TechnicianRoutes = [
  {
    isPublic: false,
    role: "ADMIN",
    path: "/enterprise/dashboard",
    component: lazy(() => import("@/Pages/Enterprise/Dashboard")),
  },
  {
    isPublic: false,
    role: "ADMIN",
    path: "/enterprise/my-enterprise",
    component: lazy(() => import("@/Pages/Enterprise/MyEnterprise")),
  },
  {
    isPublic: false,
    role: "ADMIN",
    path: "/enterprise/subscriptions",
    component: lazy(() => import("@/Pages/Enterprise/SubscriptionPlans")),
  },
  {
    isPublic: false,
    role: "ADMIN",
    path: "/enterprise/changePlan",
    component: lazy(() => import("@/Pages/EnterPrise/ChangePlan")),
  },
  {
    isPublic: false,
    role: "ADMIN",
    path: "/enterprise/profileSetting",
    component: lazy(() => import("@/Pages/Enterprise/ProfileSettings")),
  },
  {
    role: "ADMIN",
    path: "/profile-settings",
    isPublic: false,
    component: lazy(() => import("../Pages/Enterprise/ProfileSettings")),
  },

];

export default TechnicianRoutes;
