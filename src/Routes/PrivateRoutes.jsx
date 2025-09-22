import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ Component, props, role }) {
  const navigate = useNavigate();
  // state shape uses adminSlice reducer
  const { user } = useSelector((state) => state?.user);
  console.log("User in private" ,user);

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    } else if (user) {
      // if role-based routing is needed, uncomment and adjust below
      // user.role !== role && navigate("/");
    }
  }, [navigate, user]);

  return <Component {...props} />;
}
