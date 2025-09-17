import AuthWrapper from "../../../Shared/AuthWrapper";
import ForgotPasswordForm from "../../../Shared/Forms/ForgetPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="">
      <div className=" border border-yellow-300">
        <AuthWrapper
          AuthForm={ForgotPasswordForm}
          headingText="Verify your Email!"
        ></AuthWrapper>
      </div>
    </div>
  );
};

export default ForgotPassword;
