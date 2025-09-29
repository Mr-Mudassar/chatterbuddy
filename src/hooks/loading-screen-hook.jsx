import React from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "@/Components/LoadingScreen";

const LoadingScreenHook = () => {
  const loading = useSelector((state) => state?.user?.loading);

  return loading === "pending" && <LoadingScreen />;
};

export default LoadingScreenHook;
