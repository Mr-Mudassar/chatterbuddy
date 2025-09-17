import { Formik, Form } from "formik";
import OtpInput from "react-otp-input";
import CustomBtn from "../../CustomBtn";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailOtp } from "../../../Redux/features/Auth/authApi";
import { VERIFY_OTP_INITIAL_VALUES } from "../../../Validations/InitialValues";
import { VERIFY_OTP_VALIDATION_SCHEMA } from "../../../Validations/Validations";
import { VERIFY_OTP_API_URL } from "../../../lib/constant";

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
      apiEndpoint: VERIFY_OTP_API_URL,
      requestData: JSON.stringify(values),
    };

    dispatch(verifyEmailOtp(data)).then((res) => {
      if (res.type === "verifyEmailOtp/fulfilled") {
        navigate("/setNewPassword", {
          state: { email: location?.state?.email },
        });
      }
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="my-auto md:w-96 w-full">
        <div className="my-8">
          {/* <img width={150} src={Images.LOGO_IMG} alt="" /> */}
          <h3 className="m-auto text-2xl text-blacks font-bold text-center w-max px-2 border-b border-gray-300 py-2 rounded-lg shadow-lg shadow-[#0051de49]">
            Babylon WorkShop
          </h3>
        </div>
        <h3 className="w-full text-h3 font-bold  mb-4">Forgot Password</h3>
        <span className="text-center text-sm text-gray-500 mb-6">
          Your OTP has been sent to your email. Please enter the OTP below.
        </span>
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
                      className="rounded-lg text-center text-xl text-black border border-gray-300 transition-all hover:ring-[#0052DE] hover:ring-opacity-30 focus:outline-none focus:border-[#0052DE] focus:ring-[#0052DE] focus:ring-2 focus:ring-opacity-30"
                    />
                  )}
                />
                {errors.token && touched.token && (
                  <p className="text-sm text-red-500">{errors.token}</p>
                )}
              </div>

              <div className="flex justify-end items-center mb-4">
                <button
                  type="button"
                  // onClick={handleResendOtp}
                  className={`text-sm font-bold ${
                    isResendDisabled ? "text-gray-400" : "text-blue-500"
                  }`}
                  disabled={isResendDisabled}
                >
                  {isResendDisabled
                    ? `Resend OTP in ${timeLeft}s`
                    : "Resend OTP"}
                </button>
              </div>
              <CustomBtn
                text="Verify"
                type="submit"
                className="py-3 px-6 bg-blue-500 text-white rounded-sm w-full"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OtpForm;
