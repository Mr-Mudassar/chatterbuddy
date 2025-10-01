import {
  getCurrentPlan,
  subscriptionHistory,
} from "@/redux/features/admin/adminApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusComponent } from "@/lib/function";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "@/Components/LoadingScreen";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.user);
  const [currentPlanData, setCurrentPlanData] = useState();
  const [subcriptionHistoryData, setSubscriptionHistoryData] = useState([]);

  if (loading === "pending") {
    return <LoadingScreen />;
  }

  const getCurrentPlanFunc = () => {
    const data = {
      apiEndpoint: "/subscriptions/status",
    };

    dispatch(getCurrentPlan(data)).then((res) => {
      if (res?.type === "getCurrentPlan/fulfilled") {
        setCurrentPlanData(res.payload.data);
      }
    });
  };

  const getSubscriptionHistory = () => {
    const data = {
      apiEndpoint: "/subscriptions/getSubscriptionHistorys",
    };

    dispatch(subscriptionHistory(data)).then((res) => {
      if (res?.type === "subscriptionHistory/fulfilled") {
        setSubscriptionHistoryData(res?.payload?.data?.history);
      }
    });
  };

  useEffect(() => {
    getCurrentPlanFunc();
    getSubscriptionHistory();
  }, []);

  return (
    <div className="rounded-lg shadow-lg border p-2 md:p-6">
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
                  {currentPlanData?.plan}{" "}
                  <span className="text-muted-foreground">Plan</span>
                  <br />
                  <span className="text-sm font-normal text-muted-foreground">
                    {currentPlanData?.peoplelimit} Users
                  </span>
                </span>
                <span className="text-2xl font-bold">
                  <span className="text-4xl font-bold text-gray-600">
                    ${currentPlanData?.monthlyPrice}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    /Month
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex justify-between items-center w-full">
                <p className="text-sm font-medium">
                  Expiry Date:{" "}
                  <span className="font-semibold">
                    {currentPlanData?.currentPeriodEnd
                      ? new Date(
                          currentPlanData.currentPeriodEnd
                        ).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Days Left:{" "}
                  <span className="font-semibold">
                    {currentPlanData?.currentPeriodEnd
                      ? Math.max(
                          0,
                          Math.ceil(
                            (new Date(currentPlanData.currentPeriodEnd) -
                              new Date()) /
                              (1000 * 60 * 60 * 24)
                          )
                        ) + " Days Left"
                      : ""}
                  </span>
                </p>
              </div>
            </CardContent>
            <Button
              className="h-12 rounded-full cursor-pointer w-max ml-6"
              onClick={() => {
                navigate("/enterprise/changeplan", {
                  state: { currentPlanOrder: currentPlanData?.order },
                });
              }}
            >
              Change Plan
            </Button>
          </Card>
        </div>

        {/* Subscription History */}
        <div>
          <h2 className="text-lg font-semibold">Subscription History</h2>
          <Separator className="my-4" />

          <div className="space-y-4">
            {subcriptionHistoryData?.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between border-b pb-3 last:border-none"
              >
                <div className="space-y-1">
                  <p className="font-medium flex items-center">
                    <span className={`h-3 w-3 mr-2 rounded-full bg-primary `} />
                    {sub?.plan} ({sub?.peoplelimit})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price: {sub?.monthlyPrice}
                    <br />
                    Subscription date:{" "}
                    <span className="font-semibold">
                      {sub?.currentPeriodStart
                        ? new Date(sub?.currentPeriodStart).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </span>
                    <br />
                    Expiration date:{" "}
                    <span className="font-semibold">
                      {sub?.currentPeriodEnd
                        ? new Date(sub?.currentPeriodEnd).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </span>
                  </p>
                </div>
                <span>{StatusComponent(sub?.isActive)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
