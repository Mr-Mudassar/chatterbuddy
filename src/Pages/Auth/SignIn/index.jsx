import AuthWrapper from "@/Components/AuthWrapper";
import SignInForm from "@/Components/Forms/SignInForm";

const SignUp = () => {
  return (
    <div>
      <AuthWrapper AuthForm={SignInForm} headingText="Let’s Get Started!" />
    </div>
  );
};

export default SignUp;
