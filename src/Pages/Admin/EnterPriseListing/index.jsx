import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/Components/DataTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { StatusComponent } from "@/lib/function";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import {
  getAllCompanies,
  updateEnterpriseProfile,
} from "@/redux/features/admin/adminApi";
import { Ban, EllipsisVerticalIcon, Gem, User, X } from "lucide-react";
import CreateEnterpriseForm from "@/Components/Forms/CreateEnterpriseForm";
import { ConfirmationDialog } from "@/Components/ConfirmationDialog";

const EnterpriseListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [allCompaniesData, setAllCompaniesData] = useState([]);
  const [createCompanyModal, setCreateCompanyModal] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const GetAllCompaniesFunc = ({ pageNo = page }) => {
    const data = {
      apiEndpoint: `/company/companiesAdmin?limit=${rowsPerPage}&page=${pageNo}`,
    };

    dispatch(getAllCompanies(data)).then((res) => {
      if (res?.type === "getAllCompanies/fulfilled") {
        setAllCompaniesData(res?.payload?.data?.data);
        setTotalRows(res?.payload?.data?.total);
      }
    });
  };

  useEffect(() => {
    GetAllCompaniesFunc(page);
  }, [page, rowsPerPage]);

  const OnSuccessFunc = () => {
    GetAllCompaniesFunc();
    setCreateCompanyModal(false);
  };

  const HandleUpdateStatusFunc = (values) => {
    const data = {
      apiEndpoint: `/company/${selectedCompany?.companies[0]?.id}`,
      requestData: JSON.stringify({
        status: mode,
      }),
    };

    dispatch(updateEnterpriseProfile(data)).then((res) => {
      if (res?.type === "updateEnterpriseProfile/fulfilled") {
        setSelectedCompany(null);
        GetAllCompaniesFunc();
      }
    });
  };

  const allCompaniesHeading = [
    {
      name: "User Info",
      selector: (row) => (
        <div className="">
          <p className="text-sm">{row?.firstName + " " + row?.lastName}</p>
          <p className="text-sm">{row?.email}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row?.companies[0]?.name,
      sortable: true,
    },
    {
      name: "Members",
      selector: (row) => row?.companies[0]?.totalmember,
      sortable: true,
    },

    {
      name: "Scription",
      selector: (row) => row?.companies[0]?.subscriptionPlan,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => StatusComponent(row?.isActive),
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
                setSelectedCompany(row);
                setMode("REMOVE");
              }}
            >
              <X className="w-5 h-5" />
              Remove Enterprise
            </DropdownMenuItem>
            {row?.isActive && (
              <DropdownMenuItem
                className={
                  "cursor-pointer rounded-full py-3 px-4 !hover:bg-[#ccf0e8]"
                }
                onClick={() => {
                  setSelectedCompany(row);
                  setMode("RESTRICTED");
                }}
              >
                <Ban className="w-5 h-5" />
                Restrict Enterprise
              </DropdownMenuItem>
            )}
            {!row?.isActive && (
              <DropdownMenuItem
                className={
                  "cursor-pointer rounded-full py-3 px-4 !hover:bg-[#ccf0e8]"
                }
                onClick={() => {
                  setSelectedCompany(row);
                  setMode("ACTIVE");
                }}
              >
                <Check className="w-5 h-5" />
                Activate Enterprise
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className={
                "cursor-pointer rounded-full py-3 px-4 !hover:bg-[#ccf0e8]"
              }
              onClick={() =>
                navigate(`/admin/usersManagement/${row?.companies[0]?.id}`)
              }
            >
              <User className="w-5 h-5" /> View Members
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="border rounded-md p-6 shadow-md bg-white">
      <div className="mb-6">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold text-xl">Enterprises </h2>
          <p className="text-gray-600"> | {totalRows} companies</p>
        </div>
        <p className="text-sm text-gray-600">
          You can suspend or remove enterprise from here
        </p>
      </div>

      <div className="mb-4 w-full flex justify-end">
        <Button
          className={"h-12 rounded-full px-4"}
          onClick={() => setCreateCompanyModal(true)}
        >
          <Plus className="w-5 h-5" /> Create Company
        </Button>
      </div>

      <div className="rounded-lg">
        <DataTable
          pagination={true}
          selectableRows={true}
          expandableRows={false}
          allData={allCompaniesData}
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
        open={createCompanyModal}
        onOpenChange={() => setCreateCompanyModal(!createCompanyModal)}
      >
        <DialogContent>
          <CreateEnterpriseForm onSucess={OnSuccessFunc} />
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
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        description={`Are you sure you want to ${
          mode === "REMOVE"
            ? "Remove"
            : mode === "RESTRICT"
            ? "Restrict"
            : "Reactivate"
        } ${selectedCompany?.firstName} ${
          selectedCompany?.lastName
        } from your company?`}
        onConfirm={() => HandleUpdateStatusFunc()}
      />
    </div>
  );
};

export default EnterpriseListing;
