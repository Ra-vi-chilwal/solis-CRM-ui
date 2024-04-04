import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import CIcon from '@coreui/icons-react';
import {cilList} from '@coreui/icons';
import Loader from '../../../components/Loader/loader'
function UserDetails() {
  const[show,setshow] = useState(false);
   const { loading, userApi, error } =
    useSelector((store) => store) || " ";
const role = userApi?.userInfo?.data
    const [columns,setColumns] = useState([
        {
            name: "Company",
            selector: (row) => row?.company?.company,
        },
        {
            name: "Full Name",
            selector: (row) => row?.firstName + " "+ row?.lastName,
        },
        // {
        //     name: "Last Name",
        //     selector: (row) => row?.lastName,
        // },
        {
            name: "Email",
            selector: (row) => row?.email,
        },
        {
            name: "Role",
            selector: (row) => row?.role?.title,
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
        // {
        //     name: 'Action',
        //     cell: row => <div>
        //         <button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button>
        //         <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button>
        //     </div>
        // },
    ])
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
 
    return (
        loading==true ?<Loader/>:
        <div className="active-projects style-1">
          <div className="customize-col">
                <button variant="contained" onClick={() => setshow((prev) => !prev)} style={{marginTop:"20px"}}><CIcon icon={cilList} className="text-info" size="md" /></button>
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

export default UserDetails;

