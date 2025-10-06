import {
  getAllUsers,
  removeUserFromCompany,
} from "@/redux/features/admin/adminApi";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { StatusComponent } from "@/lib/function";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import CreateUserForm from "@/Components/Forms/CreateUserForm";
import { ConfirmationDialog } from "@/Components/ConfirmationDialog";
import { Ban, Check, EllipsisVerticalIcon, Gem, User, X } from "lucide-react";
import { Input } from "@/Components/ui/input";

const UserManagement = () => {
  const timer = useRef();
  const params = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const [allUsersData, setAllUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [maxUserLimit, setMaxUserLimit] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const GetAllCompaniesFunc = (pageNo) => {
    const data = {
      apiEndpoint: params?.id
        ? `/company/${params?.id}/users?limit=${rowsPerPage}&page=${pageNo}&search=${search}`
        : `/users/getallusers?limit=${rowsPerPage}&page=${pageNo}&search=${search}`,
    };

    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        setAllUsersData(res?.payload?.data?.data);
        setTotalRows(res?.payload?.data?.total);
        res?.payload?.data?.peoplelimit &&
          setMaxUserLimit(res?.payload?.data?.peoplelimit);
      }
    });
  };

  useEffect(() => {
    GetAllCompaniesFunc(page);
  }, [page, rowsPerPage, search]);

  const RemoveUserFromCompanyfunc = () => {
    const data = {
      apiEndpoint: `/company/users/${selectedUser?.id}?action=${mode}`,
    };

    dispatch(removeUserFromCompany(data)).then((res) => {
      if (res?.type === "removeUserFromCompany/fulfilled") {
        setPage(1);
        GetAllCompaniesFunc(1);
        setSelectedUser(null);
      }
    });
  };

  const OnSuccessFunc = () => {
    setPage(1);
    GetAllCompaniesFunc(1);
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
      <div className="flex justify-between mb-6">
        <div className="">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold text-xl">User Management </h2>
            <p className="text-gray-600">
              {totalRows} users
              {maxUserLimit !== 0 && ` out of ${maxUserLimit?.split("-")[1]}`}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            You can suspend or remove member from here
          </p>
        </div>

        <Input
          type="search"
          placeholder="Search..."
          className="h-12 rounded-full max-w-lg w-full"
          onChange={(e) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setSearch(e.target.value), 500);
          }}
        />
      </div>

      <div className="rounded-lg">
        <DataTable
          pagination={true}
          expandableRows={false}
          allData={allUsersData}
          tableHeadings={allCompaniesHeading}
          totalRows={totalRows}
          onChangePage={(page) => {
            setPage(page);
          }}
          onChangeRowsPerPage={(rowPerPage, page) => {
            setRowsPerPage(rowPerPage);
            setPage(page);
          }}
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
