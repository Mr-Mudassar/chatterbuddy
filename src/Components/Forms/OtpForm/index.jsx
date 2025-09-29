import { Formik, Form } from "formik";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verfiyOtp } from "@/redux/features/admin/adminApi";
import { VERIFY_OTP_INITIAL_VALUES } from "@/Validations/InitialValues";
import { VERIFY_OTP_VALIDATION_SCHEMA } from "@/Validations/Validations";
import { Button } from "@/Components/ui/button";

const OtpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(10);
  const [userEmail, setUserEmail] = useState(10);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    !location?.state?.email && navigate("/");
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: "/auth/verify-otp",
      requestData: JSON.stringify({
        code: values?.token,
        email: location?.state?.email,
      }),
    };

    dispatch(verfiyOtp(data)).then((res) => {
      if (res.type === "verfiyOtp/fulfilled") {
        navigate("/setNewPassword", {
          state: { email: location?.state?.email, code: values?.token },
        });
      }
    });
  };

  const handleResendOtp = () => {
    const data = {
      apiEndpoint: "/auth/re-send-otp",
      requestData: JSON.stringify({
        email: location?.state?.email,
      }),
    };

    dispatch(resendOtp(data)).then((res) => {
      // if (res.type === "resendOtp/fulfilled") {
      // }
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="my-auto md:w-96 w-full">
        <h3 className="w-full text-4xl font-bold ">Verify OTP</h3>
        <p className="text-gray-500 mb-4">
          Enter the verification code sent to your email address.
        </p>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            ...VERIFY_OTP_INITIAL_VALUES,
            email: location?.state?.email,
          }}
          validationSchema={VERIFY_OTP_VALIDATION_SCHEMA}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email OTP
                </label>
                <OtpInput
                  value={values.token}
                  numInputs={6}
                  onChange={(token) =>
                    handleChange({
                      target: { name: "token", value: token },
                    })
                  }
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      name="token"
                      onBlur={handleBlur}
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                      className="rounded-lg text-center text-xl text-black border border-gray-300 transition-all hover:ring-[#00B48D] hover:ring-opacity-30 focus:outline-none focus:border-[#00B48D] focus:ring-[#00B48D] focus:ring-2 focus:ring-opacity-30"
                    />
                  )}
                />
                {errors.token && touched.token && (
                  <p className="text-sm text-red-500">{errors.token}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-12 rounded-full">
                VERIFY
              </Button>
              <div className="flex justify-center items-center mb-4 mt-2">
                <p className="text-gray-500 mr-2 text-sm">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className={`text-sm font-bold ${
                    isResendDisabled ? "text-gray-400" : "text-primary"
                  }`}
                  disabled={isResendDisabled}
                >
                  {isResendDisabled
                    ? `Resend OTP in ${timeLeft}s`
                    : "Resend OTP"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OtpForm;
