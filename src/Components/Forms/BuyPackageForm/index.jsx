// import Dropdown from "../../Dropdown";
// import CustomBtn from "../../CustomBtn";
// import { RxUpdate } from "react-icons/rx";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/Components/ui/select";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { PURCHASE_PLAN_API_ENDPOINT } from "@/lib/constants";
import { addNewTechnicianByAdmin } from "@/redux/features/admin/adminApi";
import {
  PURCHASE_PLAN_VALIDATION_SCHEMA,
  UPDATE_TECHNICIAN_VALIDATION_SCHEMA,
} from "@/Validations/Validations";
import {
  PURCHASE_PLAN_INITIAL_VALUES,
  UPDATE_TIME_PERIOD_INITIAL_VALUES,
} from "@/Validations/InitialValues";
// import { PhoneInput } from "@/components/ui/phone-input"; // If you have a phone input, otherwise use Input

const SUBSCRIPTION_PACKAGES = [
  { value: "enterprise", label: "Enterprise" },
  { value: "business", label: "Business" },
  { value: "starter", label: "Starter" },
];

const EMPLOYEE_OPTIONS = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-100", label: "51-100" },
  { value: "100+", label: "100+" },
];

const COUNTRY_CODES = [
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+91", label: "🇮🇳 +91" },
  // Add more as needed
];

const BuyPackageForm = () => {
  const dispatch = useDispatch();
  //   const [remiderDaysData, setRe    minderDaysData] = useState([]);

  //   const getTimePeriodFunc = () => {
  //     const data = {
  //       apiEndpoint: PURCHASE_PLAN_API_ENDPOINT,
  //     };
  //     dispatch(addNewTechnicianByAdmin(data)).then((res) => {
  //       if (res.type === "addNewTechnicianByAdmin/fulfilled") {
  //         setReminderDaysData(res?.payload?.data?.reminderNumber[0]);
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     getTimePeriodFunc();
  //   }, []);

  //   const updateTimePeriodFunc = (values) => {
  //     const data = {
  //       apiEndpoint: PURCHASE_PLAN_API_ENDPOINT,
  //       requestData: JSON.stringify(values),
  //     };
  //     dispatch(addNewTechnicianByAdmin(data)).then((res) => {
  //       if (res.type === "addNewTechnicianByAdmin/fulfilled") {
  //         getTimePeriodFunc();
  //       }
  //     });
  //   };

  return (
    <div className="flex align-center justify-center px-4 py-8 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold ">Your Enterprise</h3>
        <p className="text-gray-500 mb-4">
          Enter your company details and select package according to employees
        </p>
        <Formik
          initialValues={PURCHASE_PLAN_INITIAL_VALUES}
          validationSchema={PURCHASE_PLAN_VALIDATION_SCHEMA}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            errors,
            values,
            touched,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter company name"
                  value={values.companyName}
                  onChange={handleChange}
                  className={`px-6 border border-gray-400 rounded-full h-12 pr-12 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                {errors.companyName && touched.companyName && (
                  <div className="text-red-500 text-sm ">
                    {errors.companyName}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <div className="">
                  <div className="flex gap  -2 mt-2">
                    <Select
                      value={values.countryCode}
                      onValueChange={(val) => setFieldValue("countryCode", val)}
                    >
                      <SelectTrigger className="w-max py-6 border-gray-400 rounded-full ">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((code) => (
                          <SelectItem key={code.value} value={code.value}>
                            {code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="111 222 3333"
                      value={values.contactNumber}
                      onChange={handleChange}
                      className={`px-6 border border-gray-400 rounded-full h-12 pr-12 ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                      type="tel"
                    />
                  </div>
                  {errors.contactNumber && touched.contactNumber && (
                    <div className="text-red-500 text-sm">
                      {errors.contactNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscriptionPackage">
                  Subscription Package
                </Label>
                <Select
                  value={values.subscriptionPackage}
                  onValueChange={(val) =>
                    setFieldValue("subscriptionPackage", val)
                  }
                >
                  <SelectTrigger className="w-full py-6 border-gray-400 rounded-full ">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBSCRIPTION_PACKAGES.map((pkg) => (
                      <SelectItem key={pkg.value} value={pkg.value}>
                        {pkg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subscriptionPackage && touched.subscriptionPackage && (
                  <div className="text-red-500 text-sm">
                    {errors.subscriptionPackage}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">
                  How Much License Do You Wanna Buy?
                </Label>
                <Select
                  value={values.employees}
                  onValueChange={(val) => setFieldValue("employees", val)}
                >
                  <SelectTrigger className="w-full py-6 border-gray-400 rounded-full ">
                    <SelectValue placeholder="Select no. of employees" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employees && touched.employees && (
                  <div className="text-red-500 text-sm">{errors.employees}</div>
                )}
              </div>
              <Button type="submit" className="w-full h-12 rounded-full">
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
