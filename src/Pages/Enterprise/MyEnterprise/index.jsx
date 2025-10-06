import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  getAllUsers,
  removeUserFromCompany,
} from "@/redux/features/admin/adminApi";
import { Plus, UploadCloud } from "lucide-react";
import DataTable from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { StatusComponent } from "@/lib/function";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import CreateUserForm from "@/Components/Forms/CreateUserForm";
import { Ban, Check, EllipsisVerticalIcon, X } from "lucide-react";
import { ConfirmationDialog } from "@/Components/ConfirmationDialog";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/Components/ui/label";
import UploadCsvForm from "@/Components/Forms/UploadCsvForm";

const MyEnterprise = () => {
  const timer = useRef();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("");
  const [method, setMethod] = useState("manual");
  const [allUsersData, setAllUsersData] = useState([]);
  const { user } = useSelector((state) => state?.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [maxUserLimit, setMaxUserLimit] = useState(0);
  const [search, setSearch] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const companyId = user?.company?.id;
  const GetAllUserByCompanyFunc = (pageNo = page) => {
    const data = {
      apiEndpoint: `/company/${companyId}/users?limit=${rowsPerPage}&page=${pageNo}&search=${search}`,
    };

    dispatch(getAllUsers(data)).then((res) => {
      if (res?.type === "getAllUsers/fulfilled") {
        setAllUsersData(res?.payload?.data?.data);
        setTotalRows(res?.payload?.data?.total);
        setMaxUserLimit(res?.payload?.data?.peoplelimit);
      }
    });
  };

  useEffect(() => {
    GetAllUserByCompanyFunc(page);
  }, [page, rowsPerPage, search]);

  const OnSuccessFunc = () => {
    GetAllUserByCompanyFunc();
    setCreateUserModal(false);
  };

  const RemoveUserFromCompanyfunc = () => {
    const data = {
      apiEndpoint: `/company/users/${selectedUser?.id}?companyId=${user?.company?.id}&action=${mode}`,
    };

    dispatch(removeUserFromCompany(data)).then((res) => {
      if (res?.type === "removeUserFromCompany/fulfilled") {
        GetAllUserByCompanyFunc();
        setSelectedUser(null);
      }
    });
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
          <p className="text-gray-600">
            {" "}
            | {totalRows} users
            {maxUserLimit !== 0 && ` out of ${maxUserLimit?.split("-")[1]}`}
          </p>
        </div>
        <p className="text-sm text-gray-600">
          You can suspend or remove member from here
        </p>
      </div>

      <div className="mb-4 w-full flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search..."
          className="h-12 rounded-full max-w-lg w-full"
          onChange={(e) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setSearch(e.target.value), 500);
          }}
        />
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
          expandableRows={false}
          allData={allUsersData}
          tableHeadings={allCompaniesHeading}
          totalRows={totalRows}
          onChangePage={(page) => {
            setPage(page);
          }}
          onChangeRowsPerPage={(rowPerPage, page) => {
            console.log("newPerPage", rowPerPage, page);
            setRowsPerPage(rowPerPage);
            setPage(page);
          }}
        />
      </div>

      <Dialog
        open={createUserModal}
        onOpenChange={() => setCreateUserModal(!createUserModal)}
      >
        <DialogContent>
          <div className="space-y-4">
            <div>
              <Label className="block text-md font-medium pl-2 mb-1">
                How would you like to add members?
              </Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger
                  className={"px-6 border rounded-full !h-12 pr-4 w-full"}
                >
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent className={""}>
                  <SelectItem value="manual">Add Manually</SelectItem>
                  <SelectItem value="csv">
                    Upload CSV file to create users
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <hr />

            {method === "manual" ? (
              <CreateUserForm onSuccess={OnSuccessFunc} />
            ) : (
              <UploadCsvForm onSuccess={OnSuccessFunc} />
            )}
          </div>
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

export default MyEnterprise;
