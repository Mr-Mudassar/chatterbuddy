import AuthWrapper from "@/Components/AuthWrapper";
import ThirdImage from "@/Assets/image-3.png";
import SetPasswordForm from "@/Components/Forms/SetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="">
      <div className="">
        <AuthWrapper
          bgImage={ThirdImage}
          AuthForm={SetPasswordForm}
          headingText="Set New Password!"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
