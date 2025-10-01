import Loader from "@/Assets/loader.gif";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center !z-[50] bg-black/20">
    <img alt="loader" src={Loader} className="w-26 h-26" />
  </div>
);

export default LoadingScreen;
