import React from "react";
import { Card } from "../../ui/card";
import { ArrowUpRight } from "lucide-react";
import UserBlue from "@/Assets/user-blue.png";
import UserPurple from "@/Assets/user-purple.png";
import UserYellow from "@/Assets/user-yellow.png";
const DashboardCard = () => {
  const DashboardCardData = [
    {
      value: 1500,
      title: "Total Users",
      image: UserPurple,
      description: "Number of registered users",
    },
    {
      value: 1500,
      title: "Total Enterprise",
      image: UserYellow,
      description: "Number of registered users",
    },
    {
      value: 1500,
      title: "Active Users",
      image: UserBlue,
      description: "Number of registered users",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {DashboardCardData.map((card, index) => (
        <Card key={index} className="p-4 border rounded-lg shadow-md  ">
          <p className="text-lg text-black font-semibold">{card.title}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2 items-center">
              <p className="text-5xl font-semibold ">{card.value}</p>
              <ArrowUpRight className="h-7 w-7  text-green-500 mt-2" />
            </div>
            <img src={card.image} alt={card.title} className="h-10 w-10 mr-4" />
          </div>
          <p className="text-sm">{card.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCard;
