import {
  newPassword,
  updateEnterpriseProfile,
} from "@/redux/features/admin/adminApi";
import * as Yup from "yup";
import User from "@/Assets/user.jpg";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "@/Components/LoadingScreen";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Enterprise_New_Password } from "@/Validations/Validations";
import PhoneNumberInputField from "@/Components/PhoneNumberInputField";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state?.user);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((s) => !s);
  const [udpateCompanyModal, setUpdateCompanyModal] = useState(false);

  if (loading === "pending") {
    return <LoadingScreen />;
  }

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Name is Required"),
    contact: Yup.string()
      .matches(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number")
      .required("Required"),
  });

  const initialValues = {
    companyName: user?.company?.name,
    contact: user?.company?.contact,
  };

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: `/company/${user?.company?.id}`,
      requestData: JSON.stringify(values),
    };

    dispatch(updateEnterpriseProfile(data)).then((res) => {
      if (res?.type === "updateEnterpriseProfile/fulfilled") {
      }
    });
  };

  const handleUpdatePassword = (values) => {
    const data = {
      apiEndpoint: "/auth/change-password",
      requestData: values,
    };

    dispatch(newPassword(data)).then((res) => {
      if (res.type === "newPassword/fulfilled") {
        setUpdateCompanyModal(false);
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-2 md:p-6 ">
      {/* Cover Image */}
      <div className="w-full h-44 bg-gradient-to-r from-sky-200 to-sky-300 relative rounded-lg">
        <div className="absolute left-6 -bottom-12 flex items-center">
          <img
            src={User}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold mt-8">
              {user?.firstName + " " + user?.lastName}
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-16 p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form className="space-y-8">
              {/* Account Details */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                <p className="text-sm text-gray-500 mb-4">
                  You can update your password from here
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Email{" "}
                      <span className="text-gray-400 text-xs">
                        (Can't be changed)
                      </span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      disabled={true}
                      placeholder="Enter email"
                      value={user?.email}
                      onChange={handleChange}
                      className={`px-6 border rounded-full h-12 pr-12 ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                  </div>

                  <Button
                    className={"h-12 rounded-full border-gray-300 mt-6"}
                    variant={"outline"}
                    type="button"
                    onClick={() => setUpdateCompanyModal(true)}
                  >
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Company Details */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Details</h3>
                <p className="text-sm text-gray-500 mb-4">
                  You can update your company details from here like updating
                  package
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Enter company name"
                      value={values.companyName}
                      onChange={handleChange}
                      className={`px-6 border rounded-full h-12 pr-12 ${
                        errors.companyName && touched.companyName
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />
                    {errors.companyName && touched.companyName && (
                      <div className="text-red-500 text-xs">
                        {errors.companyName}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <PhoneNumberInputField
                      className={`${
                        errors.contact && touched.contact
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      required={true}
                      name="contact"
                      label="Phone Number"
                      value={values.contact}
                      setFieldValue={setFieldValue}
                      error={
                        errors.contact && touched.contact ? errors.contact : ""
                      }
                    />
                  </div>

                  <Button
                    className={"h-12 rounded-full border-gray-300 mt-4"}
                    variant={"outline"}
                    type="button"
                    onClick={() => navigate("/enterprise/subscriptions")}
                  >
                    Change Plan
                  </Button>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 items-center ">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-full"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="h-12 rounded-full">
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Dialog open={udpateCompanyModal} onOpenChange={setUpdateCompanyModal}>
        <DialogContent>
          <div className="">
            <h3 className="w-full text-4xl font-bold ">Set Password</h3>
            <p className="text-gray-500 mb-4">
              Set the new password for your account
            </p>
            <div className="w-full">
              <Formik
                initialValues={{ password: "" }}
                validationSchema={Enterprise_New_Password}
                onSubmit={handleUpdatePassword}
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
                          className={`pl-6 pr-12 border border-gray-400 rounded-full h-12 ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 mb-4">
                      <Button
                        type="submit"
                        className="w-full h-12 rounded-full"
                      >
                        SET PASSWORD
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSettings;
