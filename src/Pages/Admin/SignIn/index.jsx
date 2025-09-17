import AuthWrapper from "@/Components/AuthWrapper";
import SignInForm from "@/Components/Forms/SignInForm";

const SignUp = () => {
  return (
    <div>
      <AuthWrapper
        AuthForm={SignInForm}
        imgHeading="Empower Your Residents with Chatter Buddy"
        imgDescription="Give your team unlimited access to smart conversations, insights, and knowledge sharing"
      />
    </div>
  );
};

export default SignUp;
