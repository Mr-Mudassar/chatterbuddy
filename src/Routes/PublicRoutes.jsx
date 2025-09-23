import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PublicRoute({ Component, props, role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log("Role props public", role, user);

  useLayoutEffect(() => {
    if (user) {
      user.role === "SUPERADMIN"
        ? navigate("/admin/dashboard")
        : user.role === "ADMIN"
        ? navigate("/dashboard")
        : navigate("/");
    }
  }, [user, navigate]);

  return <Component {...props} />;
}
