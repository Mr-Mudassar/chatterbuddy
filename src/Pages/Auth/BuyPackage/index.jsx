import SecondImage from "@/Assets/image-2.png";
import AuthWrapper from "@/Components/AuthWrapper";
import BuyPackageForm from "@/Components/Forms/BuyPackageForm";

const BuyPackage = () => {
  return (
    <div className="">
      <div className="">
        <AuthWrapper
          bgImage={SecondImage}
          AuthForm={BuyPackageForm}
          imgHeading="One Package. Unlimited Possibilities."
          imgDescription="Provide seamless, 24/7 AI assistance for every member of your company."
        />
      </div>
    </div>
  );
};

export default BuyPackage;
