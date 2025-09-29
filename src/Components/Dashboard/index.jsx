import React from "react";
import LineChart from "../Charts/LineChart";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/Components/ui/select";
import SubscriptionChart from "../Charts/DonutChart";
import DataTable from "../DataTable";
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";

const DashboardComponent = () => {
  const TechnicianListingTableHeadings = [
    {
      name: "User ID",
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
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.availability ? (
          <div className="border border-green-600 text-green-600 bg-green-200 rounded-sm px-2 py-1 text-center text-sm w-24">
            Available
          </div>
        ) : (
          <div className="border border-gray-600 text-gray-600 bg-gray-300 rounded-sm px-2 py-1 text-center text-sm w-24">
            Unavailable
          </div>
        ),
      sortable: true,
    },
  ];

  const dummyTableData = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 555-1234",
      availability: true,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "+1 555-5678",
      availability: false,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "+1 555-8765",
      availability: true,
    },
    {
      firstName: "Bob",
      lastName: "Williams",
      email: "bob.williams@example.com",
      phoneNumber: "+1 555-4321",
      availability: false,
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
          <Link to="/admin/employees" className="text-primary font-semibold">
            See All
          </Link>
        </div>
        <div className="px-6 rounded-lg">
          <DataTable
            pagination={true}
            selectableRows={false}
            expandableRows={false}
            allData={dummyTableData}
            tableHeadings={TechnicianListingTableHeadings}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
