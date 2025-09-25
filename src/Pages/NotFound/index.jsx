import React from "react";
import NotFoundImg from "@/Assets/404.jpg";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="">
        <img
          src={NotFoundImg}
          alt="not-found"
          width={400}
          height={400}
          className="mx-auto mt-10 rounded-lg"
        />
        <Link to="/">
          <Button className="h-12 mt-4 w-full">BACK TO HOME PAGE</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
