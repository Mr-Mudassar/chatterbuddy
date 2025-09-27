import ThreeImage from "@/Assets/image-3.png";
import AuthWrapper from "@/Components/AuthWrapper";
import SuccessIcon from "@/Assets/success-icon.png";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentSuccessfullComp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex align-center justify-center px-4 py-8 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <div className="w-full flex-col justify-start space-y-6">
          <img src={SuccessIcon} alt="success-icon" className=" w-22 h-22" />
          <div className="">
            <h3 className="w-full text-4xl font-bold mb-2">Congratulations</h3>
            <p className="text-gray-500">
              Your account is created successfully
            </p>
          </div>
          <Button
            className="w-full h-12 rounded-full cursor-pointer"
            onClick={() => navigate("/enterprise/dashboard")}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccessfull = () => {
  return (
    <div>
      <AuthWrapper
        bgImage={ThreeImage}
        AuthForm={PaymentSuccessfullComp}
        imgHeading="Empower Your Residents with Chatter Buddy"
        imgDescription="Give your team unlimited access to smart conversations, insights, and knowledge sharing"
      />
    </div>
  );
};

export default PaymentSuccessfull;
