import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ Component, props, role }) {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  const user = null;

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    } else if (user) {
      user.role !== role && navigate("/");
    }
  }, [navigate, user]);

  return <Component {...props} />;
}
