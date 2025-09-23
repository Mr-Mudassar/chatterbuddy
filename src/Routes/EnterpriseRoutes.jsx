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
    isPublic: false,
    role: "ADMIN",
    path: "/subscriptions",
    component: lazy(() => import("@/Pages/Enterprise/SubscriptionPlans")),
  },
];

export default TechnicianRoutes;
