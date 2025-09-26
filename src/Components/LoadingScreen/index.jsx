import Loader from "@/Assets/loader.gif";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
    <img alt="loader" src={Loader} className="w-44 h-44" />
  </div>
);

export default LoadingScreen;
