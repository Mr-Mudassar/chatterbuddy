import React, { memo } from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = (props) => {
  const {
    allData,
    totalRows,
    onChangePage,
    onRowClicked,
    tableHeadings,
    expandableRows,
    selectableRows,
    ExpandedComponent,
    clearSelectedRows,
    pagination = false,
    onChangeRowsPerPage,
    selectableRowDisabled,
    handleSelectedRowsChange,
  } = props;
  const data = allData;
  const columns = tableHeadings;

  const customStyles = {
    header: {
      style: {
        fontSize: "14px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        color: "black",
        backgroundColor: "#e6f8f4",
      },
    },
    rows: {
      style: {
        padding: "10px 0px",
        fontSize: "16px",
        fontWeight: "400",
      },
    },
    tableWrapper: {
      style: {
        zIndex: 1,
      },
    },
  };

  return (
    <DataTable
      striped
      sortable
      responsive
      data={data}
      theme={"light"}
      paginationServer
      highlightOnHover
      columns={columns}
      pagination={pagination}
      customStyles={customStyles}
      onRowClicked={onRowClicked}
      onChangePage={onChangePage}
      paginationTotalRows={totalRows}
      selectableRows={selectableRows}
      expandableRows={expandableRows}
      clearSelectedRows={clearSelectedRows}
      onChangeRowsPerPage={onChangeRowsPerPage}
      expandableRowsComponent={ExpandedComponent}
      selectableRowDisabled={selectableRowDisabled}
      onSelectedRowsChange={handleSelectedRowsChange}
      paginationRowsPerPageOptions={[10, 20, 30, 50, 75, 100]}
    />
  );
};

export default memo(DataTableComponent);
