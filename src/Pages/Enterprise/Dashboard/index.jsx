import { Link } from "react-router-dom";
import { Card } from "@/Components/ui/card";  
import UserBlue from "@/Assets/user-blue.png";
import DataTable from "@/Components/DataTable";
import { StatusComponent } from "@/lib/function";
import UserPurple from "@/Assets/user-purple.png";
import UserYellow from "@/Assets/user-yellow.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enterpriseStats, getAllUsers } from "@/redux/features/admin/adminApi";

const EnterpriseDashboard = () => {
  const dispatch = useDispatch();
  const [allUsersData, setAllUsersData] = useState([]);
  const { user } = useSelector((state) => state?.user);
  const [dashboardCardData, setDashboardCardData] = useState([]);
  const companyId = user?.company?.id;
  const GetAllUserByCompanyFunc = () => {
    const data = {
      apiEndpoint: `/company/${companyId}/users?page=${1}`,
    };
    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        setAllUsersData(res?.payload?.data?.data);
      }
    });
  };

  const GetDashboardCardDataFunc = () => {
    const data = {
      apiEndpoint: `/company/${companyId}/users/statas`,
    };
    dispatch(enterpriseStats(data)).then((res) => {
      if (res?.type === "enterpriseStats/fulfilled") {
        setDashboardCardData(res?.payload?.data);
      }
    });
  };

  useEffect(() => {
    GetAllUserByCompanyFunc();
    GetDashboardCardDataFunc();
  }, []);

  const DashboardCardData = [
    {
      image: UserPurple,
      title: "Total Users",
      value: dashboardCardData?.totalUsers,
      description: "Number of registered users",
    },
    {
      image: UserYellow,
      title: "Active Users",
      value: dashboardCardData?.activeUsers,
      description: "Number of active users",
    },
    {
      image: UserBlue,
      title: "Restricted Users",
      description: "Number of restricted users",
      value: dashboardCardData?.restrictedUsers,
    },
  ];

  const allCompaniesHeading = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => StatusComponent(row?.isActive),
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DashboardCardData.map((card, index) => (
          <Card key={index} className="p-4 border rounded-lg shadow-md  ">
            <p className="text-lg text-black font-semibold">{card.title}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2 items-center">
                <p className="text-5xl font-semibold ">{card.value}</p>
              </div>
              <img
                src={card.image}
                alt={card.title}
                className="h-14 w-14 mr-4"
              />
            </div>
            <p className="text-sm">{card.description}</p>
          </Card>
        ))}
      </div>
      <div className="rounded-lg shadow-md bg-white border mt-4">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="font-semibold text-lg">User Listing</p>
          <Link
            to="/enterprise/my-enterprise "
            className="text-primary font-semibold"
          >
            See All
          </Link>
        </div>
        <div className="px-6 rounded-lg mb-6">
          <DataTable
            pagination={false}
            selectableRows={false}
            expandableRows={false}
            allData={allUsersData}
            tableHeadings={allCompaniesHeading}
          />
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
