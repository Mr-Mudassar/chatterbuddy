import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/Components/ui/select";
import DataTable from "../DataTable";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import DashboardCard from "./DashboardCard";
import LineChart from "../Charts/LineChart";
import React, { useEffect, useState } from "react";
import SubscriptionChart from "../Charts/DonutChart";
import { getAllUsers } from "@/redux/features/admin/adminApi";
import { StatusComponent } from "@/lib/function";

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const [allUsersData, setAllUsersData] = useState([]);
  const GetAllUsersFunc = () => {
    const data = {
      apiEndpoint: `/users/users?page=${1}&limit=10`,
    };

    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        setAllUsersData(res?.payload?.data?.data);
      }
    });
  };

  useEffect(() => {
    GetAllUsersFunc();
  }, []);

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
      name: "Scription",
      selector: (row) => row?.subscriptionPlan,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => StatusComponent(row?.status),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => StatusComponent(row?.status),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4 ">
      <DashboardCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md h-full col-span-2 border">
          <div className="flex  justify-between items-center">
            <p className="font-semibold text-lg">Overview</p>
            <Select onValueChange={(val) => setFieldValue("employees", val)}>
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
            </Select>
          </div>
          <LineChart
            mode={"RedemptionsGraph"}
            graphData={[
              34, 4343, 56454, 5454634, 6465436436, 636436, 46436, 46436, 46436,
              46436, 46436, 46436,
            ]}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md h-full border ">
          <p className="font-semibold text-lg mb-2">Subscriptions</p>
          <SubscriptionChart />
        </div>
      </div>

      <div className="rounded-lg shadow-md bg-white  border">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="font-semibold text-lg">User Listing</p>
          <Link to="/admin/usersManagement" className="text-primary font-semibold">
            See All
          </Link>
        </div>
        <div className="px-6 rounded-lg">
          <DataTable
            pagination={false}
            selectableRows={false}
            expandableRows={false}
            allData={allUsersData.slice(-5)}
            tableHeadings={allCompaniesHeading}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
