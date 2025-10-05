import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/Components/ui/select";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  createPaymentIntent,
  getAllPlans,
} from "@/redux/features/admin/adminApi";
import PhoneNumberInputField from "@/Components/PhoneNumberInputField";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { setToken } from "@/redux/features/admin/adminSlice";

// Validation schema with Yup
const PURCHASE_PLAN_VALIDATION_SCHEMA = Yup.object().shape({
  // name: Yup.string().required("Company name is required"),
  // contact: Yup.string()
  //   .required("Phone number is required")
  //   .matches(/^[0-9+\- ]+$/, "Invalid phone number"),
  // email: Yup.string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
  subscriptionPlan: Yup.string().required("Subscription plan is required"),
});

// Initial empty values (user must fill)
const INITIAL_VALUES = {
  subscriptionPlan: "",
};

const BuyPackageForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userRole } = useSelector((state) => state?.user);
  const [allSubscriptionPlans, setAllSubscriptionPlans] = useState([]);

  // useEffect(() => {
  //   if (!location.state?.accessToken) {
  //     toast.error("Please login first");
  //   }
  // }, []);

  const FetchAllPlansFunc = () => {
    const body = {
      apiEndpoint: "/subscriptions/plans",
    };
    dispatch(getAllPlans(body)).then((res) => {
      if (res.type === "getAllPlans/fulfilled") {
        setAllSubscriptionPlans(res.payload?.data);
      }
    });
  };

  useEffect(() => {
    FetchAllPlansFunc();
  }, []);

  const CreatePaymentIntentFunc = (values) => {
    const data = {
      planId: values.subscriptionPlan,
    };
    const body = {
      apiEndpoint: "/subscriptions/web-session",
      requestData: JSON.stringify(data),
      token: location?.state?.accessToken,
    };
    dispatch(createPaymentIntent(body)).then((res) => {
      if (res.type === "createPaymentIntent/fulfilled") {
        const redirectUrl = res.payload?.data?.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    });
  };

  const userData = location?.state?.userData;

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
          onSubmit={(values) => CreatePaymentIntentFunc(values)}
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
                  disabled={true}
                  placeholder="Enter company name"
                  value={userData?.company?.name}
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
                  disabled={true}
                  value={userData?.company?.contact}
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
                  disabled={true}
                  placeholder="Enter email"
                  value={userData?.email}
                  onChange={handleChange}
                  className={`px-6 border rounded-full h-12 pr-12 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs">{errors.email}</div>
                )}
              </div>

              {/* Subscription Plan */}
              <div className="space-y-2">
                <Label htmlFor="subscriptionPlan">Subscription Package</Label>
                <Select
                  value={values.subscriptionPlan}
                  onValueChange={(val) =>
                    setFieldValue("subscriptionPlan", val)
                  }
                >
                  <SelectTrigger
                    className={`w-full py-6 rounded-full ${
                      errors.subscriptionPlan && touched.subscriptionPlan
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {allSubscriptionPlans.map((pkg) => (
                      <SelectItem
                        key={pkg?.stripePriceId}
                        value={pkg?.stripePriceId}
                      >
                        {pkg?.name} ({pkg?.peoplelimit}) - ${pkg?.priceMonthly}
                        /month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subscriptionPlan && touched.subscriptionPlan && (
                  <div className="text-red-500 text-xs">
                    {errors.subscriptionPlan}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full mt-4"
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

export default BuyPackageForm;
