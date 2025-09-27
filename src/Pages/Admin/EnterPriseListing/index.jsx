import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "@/Components/DataTable";
import { getAllCompanies } from "@/redux/features/admin/adminApi";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import BuyPackageForm from "@/Components/Forms/BuyPackageForm";
import { StatusComponent } from "@/lib/function";
import CreateEnterpriseForm from "@/Components/Forms/CreateEnterpriseForm";

const EnterpriseListing = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [createCompanyModal, setCreateCompanyModal] = useState(false);
  const [allCompaniesData, setAllCompaniesData] = useState([]);
  const GetAllCompaniesFunc = () => {
    const data = {
      apiEndpoint: `/company/companiesAdmin?page=${page}&limit=10`,
    };

    dispatch(getAllCompanies(data)).then((res) => {
      if (res?.type === "getAllCompanies/fulfilled") {
        setAllCompaniesData(res?.payload?.data?.data);
      }
    });
  };

  useEffect(() => {
    GetAllCompaniesFunc();
  }, []);

  const OnSuccessFunc = () => {
    GetAllCompaniesFunc();
    setCreateCompanyModal(false);
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
  ];

  return (
    <div className="border rounded-md p-6 shadow-md bg-white">
      <div className="mb-6">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold text-xl">Enterprises </h2>
          <p className="text-gray-600">
            {" "}
            | {allCompaniesData?.length} companies
          </p>
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
        />
      </div>

      <Dialog
        open={createCompanyModal}
        onOpenChange={() => setCreateCompanyModal(!createCompanyModal)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-scroll">
          <CreateEnterpriseForm onSucess={OnSuccessFunc} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnterpriseListing;
