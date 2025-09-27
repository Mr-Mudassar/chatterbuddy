import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { changePlan, getAllPlans } from "@/redux/features/admin/adminApi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Dummy subscription plans
const plans = [
  { id: 1, name: "Enterprise", users: "1 - 10 Users", price: 1000 },
  { id: 2, name: "Enterprise", users: "1 - 50 Users", price: 5000 },
  {
    id: 3,
    name: "Enterprise",
    users: "1 - 70 Users",
    price: 7000,
    current: true,
  },
  { id: 4, name: "Enterprise", users: "1 - 100 Users", price: 10000 },
  { id: 5, name: "Enterprise", users: "1 - 250 Users", price: 13000 },
  { id: 6, name: "Enterprise", users: "1 - 500 Users", price: 15000 },
];

export default function ChangePlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [allSubscriptionPlans, setAllSubscriptionPlans] = useState([]);

  const FetchAllPlansFunc = () => {
    const body = {
      apiEndpoint: "/subscriptions/plans",
    };
    dispatch(getAllPlans(body)).then((res) => {
      if (res.type === "getAllPlans/fulfilled") {
        setAllSubscriptionPlans(res.payload?.data);
      }
    });
  };

  useEffect(() => {
    if (!location?.state?.currentPlanOrder) {
      navigate("/enterprise/subscriptions");
      toast.error("Please click on the change plan to change your plan");
    }
    FetchAllPlansFunc();
  }, []);

  const ChangePlanFunc = () => {
    let data;
    if (location?.state?.currentPlanOrder <= selectedPlan?.displayOrder) {
      data = {
        apiEndpoint: "/subscriptions/upgrade",
        requestData: {
          newPlan: selectedPlan?.name,
        },
      };
    } else {
      data = {
        apiEndpoint: "/subscriptions/downgrade",
        requestData: {
          newPlan: selectedPlan?.name,
        },
      };
    }

    dispatch(changePlan(data)).then((res) => {
      if (res.type === "changePlan/fulfilled") {
        const redirectUrl =
          res.payload?.data?.paymentIntent?.checkoutSessionUrl;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          navigate("/enterprise/subscriptions");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-4">
      <div className="max-w-2xl space-y-6 ">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">Change Plan</h2>
          <p className="text-sm text-muted-foreground">
            Unlimited time per employee, no matter the team size. Change your
            plan according to your requirement
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {allSubscriptionPlans?.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`cursor-pointer transition-all ${
                selectedPlan?.id === plan.id
                  ? "border-2 border-primary"
                  : "hover:border-muted"
              }`}
            >
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-base  font-medium">
                    {plan.name}{" "}
                    <span className="text-muted-foreground font-normal ml-1">
                      Plan
                    </span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.users}</p>
                </div>

                <div className="flex items-end">
                  <span className="text-4xl font-bold text-gray-600">
                    ${plan.priceMonthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/Month</span>
                  {plan.current && (
                    <Badge className="bg-green-500 text-white">Current</Badge>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end items-center gap-4 pt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/enterprise/subscriptions")}
            className="h-12 rounded-full cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedPlan}
            onClick={ChangePlanFunc}
            className="h-12 rounded-full cursor-pointer"
          >
            Change Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
