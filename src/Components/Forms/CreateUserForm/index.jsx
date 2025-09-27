import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import * as Yup from "yup";
import { createCompany } from "@/redux/features/admin/adminApi";
import { Eye, EyeOff } from "lucide-react";

// ✅ Validation schema with Yup
const REGISTER_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),
});

// ✅ Initial values
const INITIAL_VALUES = {
  email: "",
  password: "",
};

const CreateUserForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((s) => !s);
  const handleRegister = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      providerId: Date.now().toString(),
    };

    const body = {
      apiEndpoint: "/company/create-company-user",
      requestData: JSON.stringify(payload),
    };

    dispatch(createCompany(body)).then((res) => {
      if (res.type === "createCompany/fulfilled") {
        onSuccess();
      }
    });
  };

  return (
    <div className="flex align-center justify-center px-2 py-2 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold">Add User</h3>
        <p className="text-gray-500 mb-4">
          You can add employees by uploading a file or can add them manually
        </p>

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={REGISTER_VALIDATION_SCHEMA}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ errors, values, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  className={`px-6 border rounded-full h-12 pr-12 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  className={`px-6 border rounded-full h-12 pr-12  ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />

                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-6 top-12  -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <Button type="submit" className="w-full h-12 rounded-full mt-4 mb-8">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUserForm;
