import React from "react";
import SuccessImage from "@/Assets/successfull.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/Components/ui/button";

const PaymentSuccessfull = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <Card className="w-full max-w-md rounded-none border-none shadow-none md:shadow-lg md:rounded-xl border-2 text-center px-8 pb-6">
        <CardHeader className="flex justify-center items-center">
          <img src={SuccessImage} className="w-80" />
        </CardHeader>
        <CardContent>
          <h4 className="font-bold text-2xl mb-4">Thank You !</h4>
          <p className="text-sm font-semibold text-center mb-4 text-gray-700">
            Your tip has been sent securely via Stripe.
          </p>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Got It</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessfull;
