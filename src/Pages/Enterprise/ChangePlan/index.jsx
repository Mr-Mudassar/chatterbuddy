import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const [selectedPlan, setSelectedPlan] = useState(null);

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
          {plans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`cursor-pointer transition-all ${
                plan.current
                  ? "border-2 border-green-500"
                  : selectedPlan === plan.id
                  ? "border-2 border-primary"
                  : "hover:border-muted"
              }`}
            >
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-base font-medium">
                    {plan.name}{" "}
                    <span className="text-muted-foreground font-normal">
                      Plan
                    </span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.users}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ${plan.price.toLocaleString()}
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
            className="h-12 rounded-full cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedPlan}
            className="h-12 rounded-full cursor-pointer"
          >
            Change Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
