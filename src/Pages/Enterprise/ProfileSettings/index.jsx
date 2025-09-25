import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const ProfileSettings = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
    companyName: Yup.string().required("Required"),
    contactNumber: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .required("Required"),
  });

  const initialValues = {
    email: "daniel.ethan25@gmail.com",
    password: "",
    companyName: "Dexterz Technologies",
    contactNumber: "+44 1122 3333",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">User Profile</h2>
        <Button>Edit Profile</Button>
      </div>
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        />
        <h3 className="text-lg font-medium">Daniel Ethan</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Account Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    className="w-full"
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  ) : null}
                  <Button variant="link" className="text-green-500 p-0 h-auto">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Company Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Field
                    as={Input}
                    id="companyName"
                    name="companyName"
                    className="w-full"
                  />
                  {errors.companyName && touched.companyName ? (
                    <p className="text-red-500 text-sm">{errors.companyName}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Field
                    as={Input}
                    id="contactNumber"
                    name="contactNumber"
                    className="w-full"
                  />
                  {errors.contactNumber && touched.contactNumber ? (
                    <p className="text-red-500 text-sm">
                      {errors.contactNumber}
                    </p>
                  ) : null}
                  <Button variant="link">Change Plan</Button>
                </div>
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSettings;
