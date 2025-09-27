import { Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { enterpriseNewPassword } from "@/redux/features/admin/adminApi";
import { Enterprise_New_Password } from "@/Validations/Validations";

const EnterpriseNewPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useParams();

  useEffect(() => {
    !token && navigate("/");
  }, []);

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: "/auth/change-password",
      requestData: values,
      token: token,
    };

    dispatch(enterpriseNewPassword(data)).then((res) => {
      if (res.type === "enterpriseNewPassword/fulfilled") {
        navigate("/");
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((s) => !s);

  return (
    <div className="flex align-center justify-center px-4 py-8 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold ">Set Password</h3>
        <p className="text-gray-500 mb-4">
          Set the new password for your account
        </p>
        <div className="w-full">
          <Formik
            initialValues={{ password: "" }}
            validationSchema={Enterprise_New_Password}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="">
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block font-medium mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`pl-12 pr-12 border border-gray-400 rounded-full h-12 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock size={18} />
                    </div>
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full h-12 rounded-full">
                    SET PASSWORD
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseNewPasswordForm;
