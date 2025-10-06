import {
  adminStats,
  getAllUsers,
  getUserStatsByMonths,
} from "@/redux/features/admin/adminApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/Components/ui/card";
import UserBlue from "@/Assets/user-blue.png";
import DataTable from "@/Components/DataTable";
import { StatusComponent } from "@/lib/function";
import UserPurple from "@/Assets/user-purple.png";
import UserYellow from "@/Assets/user-yellow.png";
import React, { useEffect, useState } from "react";
import LineChart from "@/Components/Charts/LineChart";
import SubscriptionChart from "@/Components/Charts/DonutChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [cardsData, setCardsData] = useState();
  const [allUsersData, setAllUsersData] = useState([]);
  const [userDataForGraph, setUserDataForGraph] = useState([]);
  const [userAndEnterpriseRatio, setUserAndEnterpriseRatio] = useState([]);
  const GetAllUsersFunc = () => {
    const data = {
      apiEndpoint: `/users/getallusers?page=${1}&limit=10`,
    };

    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        setAllUsersData(res?.payload?.data?.data);
      }
    });
  };

  const DashboardCardsDataFunc = () => {
    const data = {
      apiEndpoint: `/users/users`,
    };

    dispatch(adminStats(data)).then((res) => {
      if (res?.type === "adminStats/fulfilled") {
        console.log("Respone of all companies listing", res?.payload);
        setCardsData(res?.payload?.data);
      }
    });
  };

  const GetUsersDataByMonthForGraph = () => {
    const data = {
      apiEndpoint: `/users/getUserStatsByMonth?year=${new Date().getFullYear()}`,
    };

    dispatch(getUserStatsByMonths(data)).then((res) => {
      if (res?.type === "getUserStatsByMonths/fulfilled") {
        console.log("Line", res?.payload?.data);
        setUserDataForGraph(res?.payload?.data[0]?.months);
      }
    });
  };

  const GetUserAndEnterpriseRationFunc = () => {
    const data = {
      apiEndpoint: `/users/getSubscriptionDistribution`,
    };

    dispatch(getUserStatsByMonths(data)).then((res) => {
      if (res?.type === "getUserStatsByMonths/fulfilled") {
        console.log("Pie", res?.payload?.data);
        setUserAndEnterpriseRatio(res?.payload?.data?.enterpriseVsOthers);
      }
    });
  };

  useEffect(() => {
    GetAllUsersFunc();
    DashboardCardsDataFunc();
    GetUsersDataByMonthForGraph();
    GetUserAndEnterpriseRationFunc();
  }, []);

  const DashboardCardData = [
    {
      value: cardsData?.totalCompanies || 0,
      title: "Total Enterprise",
      image: UserYellow,
      description: "Number of registered enterprises",
    },
    {
      value: cardsData?.restrictedUserCount + cardsData?.activeUserCount || 0,
      title: "Total Users",
      image: UserPurple,
      description: "Number of registered users",
    },
    {
      value: cardsData?.activeUserCount || 0,
      title: "Active Users",
      image: UserBlue,
      description: "Number of active users",
    },
  ];

  const allCompaniesHeading = [
    {
      name: "User Name",
      selector: (row) => row?.firstName + " " + row?.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Subscription",
      selector: (row) => row?.subscriptionPlan,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => StatusComponent(row?.isActive),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DashboardCardData.map((card, index) => (
          <Card key={index} className="p-4 border rounded-lg shadow-md  ">
            <p className="text-lg text-black font-semibold">{card.title}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2 items-center">
                <p className="text-5xl font-semibold ">{card.value}</p>
                <ArrowUpRight className="h-7 w-7  text-green-500 mt-2" />
              </div>
              <img
                src={card.image}
                alt={card.title}
                className="h-10 w-10 mr-4"
              />
            </div>
            <p className="text-sm">{card.description}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md h-full col-span-2 border">
          <div className="flex  justify-between items-center">
            <p className="font-semibold text-lg">Overview</p>
            {/* <Select onValueChange={(val) => setFieldValue("employees", val)}>
              <SelectTrigger className=" py-2      border-gray-400 rounded-full ">
                <SelectValue placeholder="Overview" />
              </SelectTrigger>
              <SelectContent>
                {["Yearly", "Montly", "Daily"].map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
          <LineChart mode={"RedemptionsGraph"} graphData={userDataForGraph} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md h-full border ">
          <p className="font-semibold text-lg mb-2">Subscriptions</p>
          <SubscriptionChart graphData={userAndEnterpriseRatio} />
        </div>
      </div>

      <div className="rounded-lg shadow-md bg-white  border ">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="font-semibold text-lg">User Listing</p>
          <Link
            to="/admin/usersManagement"
            className="text-primary font-semibold"
          >
            See All
          </Link>
        </div>
        <div className="px-6 rounded-lg mb-8">
          <DataTable
            pagination={false}
            selectableRows={false}
            expandableRows={false}
            allData={allUsersData?.slice(-5)}
            tableHeadings={allCompaniesHeading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
