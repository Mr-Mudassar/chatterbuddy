import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "@/Components/DataTable";
import { getAllUsers } from "@/redux/features/admin/adminApi";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import BuyPackageForm from "@/Components/Forms/BuyPackageForm";
import { Badge } from "@/Components/ui/badge";
import { StatusComponent } from "@/lib/function";
import CreateUserForm from "@/Components/Forms/CreateUserForm";

const UserManagement = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [allUsersData, setAllUsersData] = useState([]);
  const GetAllCompaniesFunc = () => {
    const data = {
      apiEndpoint: `/users/users?page=${page}&limit=10`,
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
    GetAllCompaniesFunc();
  }, []);

  const OnSuccessFunc = () => {
    GetAllCompaniesFunc();
    setCreateUserModal(false);
  };

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
    <div className="border rounded-md p-6 shadow-md bg-white">
      <div className="mb-6">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold text-xl">User Management </h2>
          <p className="text-gray-600"> | {allUsersData?.length} users</p>
        </div>
        <p className="text-sm text-gray-600">
          You can suspend or remove member from here
        </p>
      </div>

      <div className="mb-4 w-full flex justify-end">
        <Button
          className={"h-12 rounded-full px-4"}
          onClick={() => setCreateUserModal(true)}
        >
          <Plus className="w-5 h-5" /> Add User
        </Button>
      </div>

      <div className="rounded-lg">
        <DataTable
          pagination={true}
          selectableRows={true}
          expandableRows={false}
          allData={allUsersData}
          tableHeadings={allCompaniesHeading}
        />
      </div>

      <Dialog
        open={createUserModal}
        onOpenChange={() => setCreateUserModal(!createUserModal)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-scroll">
          <CreateUserForm onSuccess={OnSuccessFunc} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
