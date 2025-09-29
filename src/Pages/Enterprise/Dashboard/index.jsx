import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/Components/DataTable";
import { getAllUsers } from "@/redux/features/admin/adminApi";
import DashboardCard from "@/Components/Dashboard/DashboardCard";
import { StatusComponent } from "@/lib/function";

const EnterpriseDashboard = () => {
  const dispatch = useDispatch();
  const [allUsersData, setAllUsersData] = useState([]);
  const { user } = useSelector((state) => state?.user);

  const companyId = user?.company?.id;
  const GetAllUserByCompanyFunc = () => {
    const data = {
      apiEndpoint: `/company/${companyId}/users?page=${1}`,
    };

    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        console.log(
          "Respone of all companies listing",
          res?.payload?.data?.data
        );
        setAllUsersData(res?.payload?.data?.data);
      }
    });
  };

  useEffect(() => {
    GetAllUserByCompanyFunc();
  }, []);

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
    {
      name: "Action",
      selector: (row) => StatusComponent(row?.isActive),
      sortable: true,
    },
  ];

  return (
    <div>
      <DashboardCard />
      <div className="rounded-lg shadow-md bg-white border mt-4">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="font-semibold text-lg">User Listing</p>
          <Link to="/enterprise/my-enterprise " className="text-primary font-semibold">
            See All
          </Link>
        </div>
        <div className="px-6 rounded-lg">
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
