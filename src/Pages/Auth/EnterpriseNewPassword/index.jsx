import ThirdImage from "@/Assets/image-3.png";
import AuthWrapper from "@/Components/AuthWrapper";
import EnterpriseNewPasswordForm from "@/Components/Forms/EnterpriseNewPasswordForm";

const EnterpriseNewPassword = () => {
  return (
    <div className="">
      <div className="">
        <AuthWrapper
          bgImage={ThirdImage}
          AuthForm={EnterpriseNewPasswordForm}
          headingText="Set New Password!"
        />
      </div>
    </div>
  );
};

export default EnterpriseNewPassword;
