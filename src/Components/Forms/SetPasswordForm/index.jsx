import { Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { newPassword } from "@/redux/features/admin/adminApi";
import { NEW_PASSWORD_INITIAL_VALUES } from "@/Validations/InitialValues";
import { NEW_PASSWORD_VALIDATION_SCHEMA } from "@/Validations/Validations";

const SetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    (!location?.state?.email || !location?.state?.code) && navigate("/");
  }, []);

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: "/auth/reset-password",
      requestData: JSON.stringify({
        ...values,
        email: location?.state?.email,
        code: location?.state?.code,
      }),
    };

    dispatch(newPassword(data)).then((res) => {
      if (res.type === "newPassword/fulfilled") {
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
            initialValues={{
              ...NEW_PASSWORD_INITIAL_VALUES,
              email: location?.state?.email,
            }}
            validationSchema={NEW_PASSWORD_VALIDATION_SCHEMA}
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
                    htmlFor="newPassword"
                    className="block font-medium mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={values.newPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`pl-12 pr-12 border border-gray-400 rounded-full h-12 ${
                        errors.newPassword && touched.newPassword
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
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
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

export default SetPasswordForm;
