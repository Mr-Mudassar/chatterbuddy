import { memo } from "react";
import Logo from "@/Assets/logo.png";
import BgImage from "@/Assets/admin-auth-img.png";
import LoadingScreenHook from "@/Hooks/loading-screen-hook";

const AuthWrapper = (props) => {
  const { AuthForm, imgDescription, imgHeading, bgImage = BgImage } = props;
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 min-h-screen overflow-hidden">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <img src={Logo} alt="chatterbuddy logo" className="mt-12" />
        {AuthForm && <AuthForm length={5} />}
      </div>
      <div className="justify-center items-center m-3 md:block hidden">
        <div
          className="flex justify-center items-end h-full w-full  bg-cover bg-no-repeat rounded-4xl"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="mb-4 mx-24">
            <h1
              className="font-bold text-3xl mb-2 text-white text-center"
              style={{
                textShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              {imgHeading}
            </h1>
            <p
              className="text-white text-center mb-2 font-semibold text-md"
              style={{
                textShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              {imgDescription}
            </p>
          </div>
        </div>
      </div>
      <LoadingScreenHook />
    </div>
  );
};

export default memo(AuthWrapper);
