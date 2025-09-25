import FirstImage from "@/Assets/image-1.png";
import AuthWrapper from "@/Components/AuthWrapper";
import ForgotPasswordForm from "@/Components/Forms/ForgetPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="">
      <div className=" border border-yellow-300">
        <AuthWrapper
          bgImage={FirstImage}
          AuthForm={ForgotPasswordForm}
          imgHeading="One Package. Unlimited Possibilities."
          imgDescription="Provide seamless, 24/7 AI assistance for every member of your company."
        ></AuthWrapper>
      </div>
    </div>
  );
};

export default ForgotPassword;
