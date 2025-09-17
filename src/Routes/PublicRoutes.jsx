import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PublicRoute({ Component, props, role }) {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  const user = null;

  useLayoutEffect(() => {
    if (user) {
      user.role === "admin"
        ? navigate("/admin/dashboard")
        : user.role === "Technician"
        ? navigate("/technician/assignedVehicles")
        : navigate("/");
    }
  }, [user, navigate]);

  return <Component {...props} />;
}
