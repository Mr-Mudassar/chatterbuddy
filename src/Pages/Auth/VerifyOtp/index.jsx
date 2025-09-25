import SecondImage from "@/Assets/image-2.png";
import OtpForm from "@/Components/Forms/OtpForm";
import AuthWrapper from "@/Components/AuthWrapper";

const VerifyOtp = () => {
  return (
    <div className="">
      <div className=" border border-yellow-300">
        <AuthWrapper
          bgImage={SecondImage}
          AuthForm={OtpForm}
          imgHeading="One Package. Unlimited Possibilities."
          imgDescription="Provide seamless, 24/7 AI assistance for every member of your company."
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
