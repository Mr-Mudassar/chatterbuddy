import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { StatusComponent } from "@/lib/function";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/redux/features/admin/adminApi";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import CreateUserForm from "@/Components/Forms/CreateUserForm";

const MyEnterprise = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [allUsersData, setAllUsersData] = useState([]);
  const [createUserModal, setCreateUserModal] = useState(false);

  const { user } = useSelector((state) => state?.user);

  const companyId = user?.company?.id;
  const GetAllUserByCompanyFunc = () => {
    const data = {
      apiEndpoint: `/company/${companyId}/users?page=${page}`,
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

  const OnSuccessFunc = () => {
    GetAllUserByCompanyFunc();
    setCreateUserModal(false);
  };

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
        <DialogContent >
          <CreateUserForm onSuccess={OnSuccessFunc} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyEnterprise;
