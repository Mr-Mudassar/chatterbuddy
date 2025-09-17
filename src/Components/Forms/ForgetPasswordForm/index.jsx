import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { FORGET_PASSWORD_API_URL } from "@/lib/constants";
import { addNewTechnicianByAdmin } from "@/redux/features/admin/adminApi";
import { FORGOT_PASSWORD_SCHEMA } from "@/Validations/Validations";
import { FORGOT_PASSWORD_INITIAL_VALUES } from "@/Validations/InitialValues";
import { Button } from "@/Components/ui/button";

const ForgotPasswordForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: FORGET_PASSWORD_API_URL,
      requestData: JSON.stringify(values),
    };

    dispatch(addNewTechnicianByAdmin(data)).then((res) => {
      if (res.type === "forgotPassword/fulfilled") {
        console.log(res?.payload?.data);
        navigate("/verifyOtp", { state: { email: values?.email } });
      }
    });
  };

  return (
    <div className=" flex align-center justify-center px-4 py-8 h-full m-3">
      {/* {isLoading && <LoadingScreen />} */}
      <div className=" my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold ">Enter Your Email</h3>
        <p className="text-gray-500 mb-4">Enter you email here, So we will send the varifcation code on it.</p>
        <div className="w-full">
          <Formik
            validationSchema={FORGOT_PASSWORD_SCHEMA}
            initialValues={FORGOT_PASSWORD_INITIAL_VALUES}
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

                <div className="mt-6">
                  <Button type="submit" className="w-full h-12 rounded-full">
                    GET CODE
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

export default ForgotPasswordForm;
