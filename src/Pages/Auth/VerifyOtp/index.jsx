import OtpForm from "../../../Shared/Forms/OtpForm";
import AuthWrapper from "../../../Shared/AuthWrapper";

const VerifyOtp = () => {
  const handleSubmit = (pin) => {
    console.log("Entered OTP:", pin);
  };

  return (
    <div className="">
      <div className=" border border-yellow-300">
        <AuthWrapper
          AuthForm={OtpForm}
          OtpHandleSubmit={handleSubmit}
          headingText="Enter OTP!"
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
