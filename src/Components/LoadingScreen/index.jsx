import Loader from "@/Assets/loader.gif";
const LoadingScreen = () => (
  <div>
    <img alt="loader" src={Loader} className={"fixed top-1/2 left-1/2 z-50"} />
  </div>
);

export default LoadingScreen;
