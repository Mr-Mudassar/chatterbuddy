import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ Component, props, role }) {
  const navigate = useNavigate();
  // state shape uses adminSlice reducer
  const { user } = useSelector((state) => state?.user);

  useEffect(() => { 
    if (!user) {
      navigate("/login");
    } else if (user) {
      user.role !== role && navigate("/");
    }
  }, [navigate, user]);

  return <Component {...props} />;
}
