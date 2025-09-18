import { lazy } from "react";

const TechnicianRoutes = [
  {
    isPublic: false,
    role: "enterprise",
    path: "/users",
    component: lazy(() => import("@/Pages/Enterprise/MyUsers")),
  },
  {
    isPublic: false,
    role: "enterprise",
    path: "/dashboard",
    component: lazy(() => import("@/Pages/Enterprise/Dashboard")),
  },
  {
    isPublic: false,
    role: "enterprise",
    path: "/subscriptions",
    component: lazy(() => import("@/Pages/Enterprise/SubscriptionPlans")),
  },
];

export default TechnicianRoutes;
