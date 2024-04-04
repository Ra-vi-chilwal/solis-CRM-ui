import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { fetchRole } from "../../../redux/action/role/role"
import Button from '@mui/material/Button';
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';
function RoleDetails() {
    const [show, setshow] = useState(false);
    const { loading, RoleData, error } =
        useSelector((store) => store) || " ";
    const role = RoleData?.userInfo?.data;
console.log(role,"role")

    const [columns, setColumns] = useState([
        {
            name: "Title",
            selector: (row) => row.title,

        },
        {
            name: "Created At",
            selector: "createdAt",
            cell: (row) =>
              row?.createdAt ? new Date(row.createdAt).toDateString() : "",
          },
          {
            name: "Updated At",
            selector: "updatedAt",
            cell: (row) =>
              row?.updatedAt ? new Date(row.updatedAt).toDateString() : "",
          },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button>
                <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button>
            </div>
        },
    ]);
    const ExpandableComponent = (props) => {
        return (
            <>
                <div className="p-4">
                    {role &&
                        role.map((item, index) => {
                    
                            return (
                               
                                <div className="d-flex align-items-center justify-content-between" key={index}>
                                    {/* <strong>{item.permission}</strong> */}
                                    <ul>
                                        {item.permission && (item.permission).map((p, index) => {
                                            console.log(p)
                                            return (
                                                
                                                <li key={index} style={{ float: "left" }}><div className='badge badge-sm badge-dark m-1'>{p.value}</div></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            );
                            
                        })}
                </div>
            </>
        );
    };



    const handleCheckboxChange = (event) => {
        const columnName = event.target.value;
        setColumns((prevDefs) =>
            prevDefs.map((colDef) => {
                if (colDef.name === columnName) {
                    return { ...colDef, hide: !colDef.hide };
                }
                return colDef;
            })
        );
    };
    const customStyles = {
        filter: {
            width: '200px',
            display: 'inline-block',
            border: "5px solid grey"
        },
    };
    return (
        <div className="active-projects style-1">
            <div className="customize-col">
                <button variant="contained" onClick={() => setshow((prev) => !prev)} style={{ margin: "20px 0 0 0" }} ata-tip="Your Tooltip Text"><CIcon icon={cilList} className="text-info" size="md" /></button>
        
                {/* <button
                    className=" text-white  font-bold uppercase text-sm px-4  py-1 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
                    type="button"
                    style={{background:"#3C4B64" }}
                    onClick={() => setshow((prev) => !prev)}>Customize Columns</button> */}
                {show && <div className="table-customize-checkboxes">
                    {columns.map((colDef) => (
                        <label key={colDef.name}>
                            <input
                                type="checkbox"
                                value={colDef.name}
                                checked={!colDef.hide}
                                onChange={handleCheckboxChange}

                            />
                            <span style={{ marginLeft: "1rem" }}>{colDef.name}</span>
                        </label>
                    ))}
                </div>}
            </div>

            <DataTableExtensions columns={columns.filter((coldef) => coldef.hide != true)} data={role}>
                <DataTable
                    columns={columns}
                    expandableRows={true}
                    expandableRowsComponent={ExpandableComponent}
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

export default RoleDetails;

// import React, { useState, useEffect, useRef } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { GridReadyEvent, GridApi, ColumnApi } from "ag-grid-community";
// import Button from '@mui/material/Button';

// function RoleDetails() {

//     const [rowData, setRowData] = useState([]);
//     const [show, setShow] = useState(false);

//     const { loading, RoleData } = useSelector((store) => store);
//     const role = RoleData?.userInfo?.data || [];
//     console.log(role)
//     const [columnDefs, setColumnDefs] = useState([
//         {
//             field: "title",
//             name: "Title",
//             sortable: true,

//         },
//         {
//             field: "createdAt",
//             name: "Created At",
//             sortable: true,

//             cell: (row) => new Date(row.createdAt).toDateString(),
//         },
//         {
//             field: "updatedAt",
//             name: "Updated At",

//             cell: (row) => new Date(row.updatedAt).toDateString(),
//         },
//         // {
//         //     field: "permission.read",
//         //     name: "Permission",

//         //     cell: (row) => (
//         //         <div>
//         //             <button className='btn btn-warning me-1 btn-sm'>
//         //                 <i className='icon-pencil'></i>
//         //             </button>
//         //             <button className='btn btn-danger btn-sm'>
//         //                 <i className='icon-trash'></i>
//         //             </button>
//         //         </div>
//         //     ),
//         // },

//     ]);

//     const toggleColumn = (field) => {
//         setColumnDefs((prevDefs) =>
//             prevDefs.map((colDef) => {
//                 if (colDef.field === field) {
//                     // Toggle the visibility of the column
//                     return { ...colDef, hide: !colDef.hide };
//                 }
//                 return colDef;
//             })
//         );
//     };


//     const [columnVisibility, setColumnVisibility] = useState(
//         columnDefs.reduce((visibility, colDef) => {
//             visibility[colDef.selector] = true; // Initialize all columns as visible
//             return visibility;
//         }, {})
//     );

//     const handleCheckboxChange = (event) => {
//         const columnName = event.target.value;
//         const updatedVisibility = { ...columnVisibility };
//         updatedVisibility[columnName] = !(event.target.checked);
//         setColumnVisibility(updatedVisibility);
//         toggleColumn(columnName);
//     };

//     console.log(columnVisibility, "visiblity")

//     return (

//         <>

//             <div
//                 className="custom-table " style={{ display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "end" }}>

//                 <div className="role-table-filter">

//                     <input
//                         type="text"
//                         id="filter-text-box"
//                         placeholder="Filter..."

//                     // onInput={onFilterTextBoxChanged}
//                     />
//                 </div>
//                 <div>
//                     <Button variant="contained" onClick={() => setShow((prev) => !prev)}>Customize Columns</Button>
//                     {show && <div className="table-customize-checkboxes">
//                         {columnDefs.map((colDef) => (
//                             <label key={colDef.field}>
//                                 <input
//                                     type="checkbox"
//                                     value={colDef.field}
//                                     checked={!columnVisibility[colDef.field]}
//                                     onChange={handleCheckboxChange}

//                                 />
//                                 <span style={{ marginLeft: "1rem" }}>{colDef.name}</span>
//                             </label>
//                         ))}
//                     </div>}
//                 </div>

//             </div>
//             <div style={{ height: "100vh" }}>
//                 <div style={{ height: "100%", width: "100%" }} className="ag-theme-balham">

//                     <div>

//                         <div style={{ height: "80vh" }}>
//                             <div style={{ height: "100%", width: "100%" }} className="ag-theme-balham">
//                                 <AgGridReact
//                                     rowSelection="multiple"
//                                     suppressRowClickSelection
//                                     columnDefs={columnDefs.filter((colDef) => columnVisibility[colDef.selector])}
//                                     rowData={role}
//                                 />
//                             </div>
//                         </div>
//                     </div>



//                 </div>
//             </div >
//         </>
//         // <div style={{ height: "80vh" }}>
//         //     <div style={{ height: "100%", width: "100%" }} className="ag-theme-balham">
//         //         {console.log(role,"role")}
//         //         <AgGridReact
//         //             rowSelection="multiple"
//         //             suppressRowClickSelection
//         //             columnDefs={columnDefs2}
//         //             // defaultColDef={defaultColDef}
//         //             rowData={rowData2}
//         //         />
//         //     </div>

//         // </div>
//     );
// }

// export default RoleDetails;
