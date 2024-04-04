import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import {fetchPlan} from "../../../redux/action/plan/plan"
function planDetails() {
    var token = localStorage.getItem("token");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPlan(token));
    }, [])
    const { loading, planInfo, error } =
    useSelector((store) => store) || " ";

const role = planInfo?.userInfo?.data;

    const columns = [
        {
            name: "Plan Name",
            selector: (row) => row?.planName,
        },
        {
            name: "price",
            selector: (row) => row?.price,
        },
        {
            name: "Duration",
            selector: (row) => row?.Duration,
        },
     
        {
            name: "Created At",
            selector: (row) => row?.createdAt,
            cell: (row) => new Date(row.createdAt).toDateString(),
        },
        {
            name: "Updated At",
            selector: (row) => row?.updatedAt,
            cell: (row) => new Date(row.updatedAt).toDateString(),
        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button>
                <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button>
            </div>
        },
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
                />
            </DataTableExtensions>
        </div>
    );
}

export default planDetails;
