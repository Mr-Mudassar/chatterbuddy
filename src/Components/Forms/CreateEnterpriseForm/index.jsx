import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import { createCompany } from "@/redux/features/admin/adminApi";
import PhoneNumberInputField from "@/Components/PhoneNumberInputField";
import * as Yup from "yup";

// Validation schema with Yup
const PURCHASE_PLAN_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  contact: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\- ]+$/, "Invalid phone number"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

// Initial empty values (user must fill)
const INITIAL_VALUES = {
  name: "",
  contact: "",
  email: "",
};

const CreateEnterpriseForm = ({ onSucess }) => {
  const dispatch = useDispatch();

  const handleCreateCompany = (values) => {
    const payload = {
      name: values.name,
      contact: values.contact,
      email: values.email,
    };

    const body = {
      apiEndpoint: "/company/create",
      requestData: JSON.stringify(payload),
    };

    dispatch(createCompany(body)).then((res) => {
      if (res.type === "createCompany/fulfilled") {
        onSucess();
      }
    });
  };

  return (
    <div className="flex align-center justify-center px-2 py-2 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold">Your Enterprise</h3>
        <p className="text-gray-500 mb-4">
          Enter your company details and select package according to employees
        </p>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={PURCHASE_PLAN_VALIDATION_SCHEMA}
          onSubmit={(values) => handleCreateCompany(values)}
        >
          {({
            errors,
            values,
            touched,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter company name"
                  value={values.name}
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

              {/* Contact (Phone Number) */}
              <div className="space-y-2">
                <PhoneNumberInputField
                  className={`${
                    errors.contact && touched.contact
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  required={true}
                  name="contact"
                  value={values.contact}
                  label="Phone Number"
                  setFieldValue={setFieldValue}
                  error={
                    errors.contact && touched.contact ? errors.contact : ""
                  }
                />
              </div>

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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full"
              >
                DONE
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateEnterpriseForm;
