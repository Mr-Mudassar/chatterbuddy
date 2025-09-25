import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const subscriptions = [
  {
    plan: "Enterprise",
    licenses: 70,
    subscriptionDate: "03/25/2025",
    expiryDate: "04/25/2025",
    status: "active",
    color: "bg-green-500",
  },
  {
    plan: "Enterprise",
    licenses: 50,
    subscriptionDate: "03/25/2025",
    expiryDate: "04/25/2025",
    status: "expired",
    color: "bg-blue-500",
  },
  {
    plan: "Enterprise",
    licenses: 10,
    subscriptionDate: "03/25/2025",
    expiryDate: "04/25/2025",
    status: "expired",
    color: "bg-purple-500",
  },
];

export default function SubscriptionPlans() {
  return (
    <div className="rounded-lg shadow-lg border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Subscription */}
        <div className="border-r pr-8">
          <h2 className="text-lg font-semibold">Subscription Management</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Flexible license scaling for enterprise teams, adjust anytime.
          </p>

          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  Enterprise <span className="text-muted-foreground">Plan</span>
                  <br />
                  <span className="text-sm font-normal text-muted-foreground">
                    1 - 70 Employees
                  </span>
                </span>
                <span className="text-2xl font-bold">
                  $7,000
                  <span className="text-sm font-normal text-muted-foreground">
                    /Month
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Expiry Date: <span className="font-semibold">04/25/2025</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Days Left: <span className="font-semibold">5 Days Left</span>
                </p>
              </div>
            </CardContent>
            <Button className="h-12 rounded-full cursor-pointer w-max ml-6">
              change Plan
            </Button>
          </Card>
        </div>

        {/* Subscription History */}
        <div>
          <h2 className="text-lg font-semibold">Subscription History</h2>
          <Separator className="my-4" />

          <div className="space-y-4">
            {subscriptions.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between border-b pb-3 last:border-none"
              >
                <div className="space-y-1">
                  <p className="font-medium flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${sub.color}`} />
                    {sub.plan}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Licenses: {sub.licenses}
                    <br />
                    Subscription date: {sub.subscriptionDate}
                    <br />
                    Expiration date: {sub.expiryDate}
                  </p>
                </div>
                {sub.status === "active" ? (
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700">Expired</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
