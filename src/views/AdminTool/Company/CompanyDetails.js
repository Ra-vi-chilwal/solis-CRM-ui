import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { fetchCompany } from "../../../redux/action/company/company";
function RoleDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompany());
  }, []);
  const { loading, companyInfo, error } = useSelector((store) => store) || " ";
  const role = companyInfo?.userInfo?.data;
  const columns = [
    {
      name: "Company logo",
      selector: (row) => (
        <>
        <img src="http://localhost:5000/uploads/companyLogo-1697774994324-671600759.png"  alt="company logo" />
        </>
      ),
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row?.company,
      sortable: true,
    },
    {
      name: "Company Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Plan",
      selector: (row) => row?.plan,
      sortable: true,
    },
    {
      name: "Purchased On",
      selector: (row) => new Date(row?.PurchasedOn).toDateString(),
      sortable: true,
    },
    {
      name: "Expire On",
      selector: (row) => new Date(row?.expireOn).toDateString(),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row?.createdAt,
      cell: (row) => new Date(row.createdAt).toDateString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => row?.updatedAt,
      cell: (row) => new Date(row.updatedAt).toDateString(),
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div>
    //       <button className="btn btn-warning me-1 btn-sm">
    //         <i className="icon-pencil"></i>
    //       </button>
    //       <button className="btn btn-danger btn-sm">
    //         <i className=" icon-trash"></i>
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="active-projects style-1">
      <DataTableExtensions columns={columns} data={role}>
        <DataTable
          columns={columns}
          data={role}
          direction="auto"
          fixedHeader
          fixedHeaderScrollHeight="1000px"
          pagination
          responsive
          striped
          subHeaderAlign="right"
          subHeaderWrap
          defaultSortField="company"
          defaultSortAsc={false}
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}

export default RoleDetails;
