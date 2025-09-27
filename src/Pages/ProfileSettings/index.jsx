import React from "react";
import * as Yup from "yup";
import User from "@/Assets/user.jpg";
import { Formik, Form, Field } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PhoneNumberInputField from "@/Components/PhoneNumberInputField";
import { updateEnterpriseProfile } from "@/redux/features/admin/adminApi";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user);

  console.log("user in profile setting", user);

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

  return (
    <div className="bg-white rounded-lg shadow p-2 md:p-6 ">
      {/* Cover Image */}
      <div className="w-full h-32 bg-gradient-to-r from-sky-200 to-sky-300 relative rounded-lg">
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
            {/* <p className="text-sm text-gray-500">Update your information easily</p> */}
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
    </div>
  );
};

export default ProfileSettings;
