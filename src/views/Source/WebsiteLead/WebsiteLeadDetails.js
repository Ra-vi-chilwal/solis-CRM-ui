import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "../ManualData/FilterComponent";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { cilSortAscending } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { fetchWebsiteLeadSource } from "../../../redux/action/LeadSource/WebsiteLeadSource";
import { Link } from "react-router-dom";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
import Loading from '../../../components/Loader/loader'
import { useMemo } from "react";
function ManualdataDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWebsiteLeadSource());
  }, []);
  const { loading, WebsiteLeadSource, error } = useSelector((store) => store) || " ";
  const leadSource = WebsiteLeadSource && WebsiteLeadSource.userInfo && WebsiteLeadSource.userInfo.data;

  // const lead = leadSource && 
const actionFunction = (data)=>{
   
}
  const columns = [
   
    {
      name: "First Name",
      selector: (row) =>
        <div >

          <a tabindex="0" data-toggle="popover" field="firstName" data-trigger="focus" title={`${row?.firstName}`}>{row?.firstName}</a>
        </div>
    },
    {
      name: "Last Name",
      selector: (row) => <a tabindex="0" data-toggle="popover" field="lastName" data-trigger="focus" title={`${row?.lastName}`}>{row?.lastName}</a>,
    },
    {
      name: "Email",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" field="email" title={`${row?.email}`}>{row?.email}</a>,
    },
    {
      name: "Phone",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" field="phone" title={`${row?.phone}`}>{row?.phone}</a>,
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
          <Link to={`${row._id}`} state={row}><button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button></Link>
          <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button>
        </div>
      },
  ];
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = leadSource && leadSource.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const ExpandableComponent = ({ data }) => {

    return (
      <div>
        <>
          <ul className="p-4 bg-light">
        
            <p style={{ fontSize: "13px" }}><strong>Description : </strong>{data && data.message}</p>
          </ul>
        </>
      </div>

    );
  };
  return (
    <>
      <div className="text-end pt-5" >
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)} filterText={filterText} />
      </div>
      <div className='row pt-5' >
        <div className="col-xl-12 col-lg-12  col-md-12">

          <div className="card shadow-sm ctm-border-radius grow">

            <div className="card-body align-center">
              <div className="row" >
                <div className="col-md-12 react-table " >
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                    FixedHeader
                    fixedHeaderScrollHeight='450px'
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}
                    subHeaderComponent={subHeaderComponent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default ManualdataDetails;

