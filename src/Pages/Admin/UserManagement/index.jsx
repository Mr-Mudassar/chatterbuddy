import { useDispatch } from "react-redux";
import DataTable from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { StatusComponent } from "@/lib/function";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import {
  getAllUsers,
  removeUserFromCompany,
} from "@/redux/features/admin/adminApi";
import CreateUserForm from "@/Components/Forms/CreateUserForm";
import { Ban, Check, EllipsisVerticalIcon, Gem, User, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useParams } from "react-router-dom";
import { ConfirmationDialog } from "@/Components/ConfirmationDialog";

const UserManagement = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("");
  const [allUsersData, setAllUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createUserModal, setCreateUserModal] = useState(false);
  const GetAllCompaniesFunc = () => {
    const data = {
      apiEndpoint: params?.id
        ? `/company/${params?.id}/users?page=${page}`
        : `/users/users?page=${page}&limit=10`,
    };

    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        setAllUsersData(res?.payload?.data?.data);
      }
    });
  };

  useEffect(() => {
    GetAllCompaniesFunc();
  }, []);

  const RemoveUserFromCompanyfunc = () => {
    const data = {
      apiEndpoint: `/company/users/${selectedUser?.id}?action=${mode}`,
    };

    dispatch(removeUserFromCompany(data)).then((res) => {
      if (res?.type === "removeUserFromCompany/fulfilled") {
        GetAllCompaniesFunc();
        setSelectedUser(null);
      }
    });
  };

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
      selector: (row) => StatusComponent(row?.isActive),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="!bg-none cursor-pointer">
              <EllipsisVerticalIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuItem
              className={
                "cursor-pointer rounded-full py-3 px-4 !hover:bg-[#ccf0e8]"
              }
              onClick={() => {
                setMode("REMOVE");
                setSelectedUser(row);
              }}
            >
              <X className="w-5 h-5" />
              Remove User
            </DropdownMenuItem>
            {row?.isActive && (
              <DropdownMenuItem
                className={
                  "cursor-pointer rounded-full py-3 px-4 !hover:bg-[#ccf0e8]"
                }
                onClick={() => {
                  setMode("RESTRICT");
                  setSelectedUser(row);
                }}
              >
                <Ban className="w-5 h-5" />
                Restrict User
              </DropdownMenuItem>
            )}

            {!row?.isActive && (
              <DropdownMenuItem
                className={
                  "cursor-pointer rounded-full py-3 px-4 !hover:bg-[#ccf0e8]"
                }
                onClick={() => {
                  setMode("ACTIVE");
                  setSelectedUser(row);
                }}
              >
                <Check className="w-5 h-5" />
                Reactivate User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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

      <div className="rounded-lg">
        <DataTable
          pagination={true}
          selectableRows={false}
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

      <ConfirmationDialog
        title={`${
          mode === "REMOVE"
            ? "Remove"
            : mode === "RESTRICT"
            ? "Restrict"
            : "Reactivate"
        } User`}
        btnStyles={"bg-red-600 hover:bg-red-700"}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        description={`Are you sure you want to ${
          mode === "REMOVE"
            ? "Remove"
            : mode === "RESTRICT"
            ? "Restrict"
            : "Reactivate"
        } ${selectedUser?.firstName} ${
          selectedUser?.lastName
        } from your company?`}
        onConfirm={() => RemoveUserFromCompanyfunc()}
      />
    </div>
  );
};

export default UserManagement;
