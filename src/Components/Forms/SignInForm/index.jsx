import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/redux/features/admin/adminApi";
import { SIGNIN_INITIAL_VALUES } from "@/Validations/InitialValues";
import { SIGNIN_VALIDATION_SCHEMA } from "@/Validations/Validations";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (values) => {
    const data = {
      apiEndpoint: "/auth/login",
      requestData: JSON.stringify(values),
    };

    dispatch(login(data)).then((res) => {
      if (res?.type === "login/fulfilled") {
        if (res?.payload?.data?.user?.userRole === "SUPERADMIN") {
          navigate("/admin/dashboard");
        } else {
          if (!res?.payload?.data?.user?.onboardingCompleted) {
            navigate("/choosePlan", {
              state: {
                accessToken: res?.payload?.data?.accessToken,
                userData: res?.payload?.data?.user,
              },
            });
          }
        }
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((s) => !s);

  return (
    <div className="flex align-center justify-center px-4 py-8 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold ">Log In</h3>
        <p className="text-gray-500 mb-4">Login with your existing account</p>
        <div className="w-full">
          <Formik
            initialValues={SIGNIN_INITIAL_VALUES}
            validationSchema={SIGNIN_VALIDATION_SCHEMA}
            onSubmit={handleLoginSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="block font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`px-6 border border-gray-400 rounded-full h-12 pr-12 ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail size={18} />
                    </div>
                  </div>
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="block font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`px-6 border border-gray-400 rounded-full h-12  pr-12 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                    />

                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                <div className="flex items-center justify-end mb-6">
                  <Link to="/forgotPassword">
                    <p className="text-right mb-0 text-primary text-sm font-semibold">
                      Forgot password
                    </p>
                  </Link>
                </div>
                <div className="mt-3">
                  <Button type="submit" className="w-full h-12 rounded-full">
                    LOG IN
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

export default SignInForm;
