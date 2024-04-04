import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "./FilterComponent";
import Reject from '../../../assets/images/missed-call.png';
import notAssigned from '../../../assets/images/no-profile.png'
import { fetchLeadSource } from "../../../redux/action/LeadSource/LeadSource";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import RejectModal from "../subManualData/RejectLeadModal";
import invoice from "../../../assets/images/avatars/invoice.png";
import check from '../../../assets/images/check.png';
import cross from '../../../assets/images/cross.png';
import progressImage from "../../../assets/images/progress-image.png";
import './ManualDetails.css';
function ManualdataDetails() {
  const dispatch = useDispatch();
  var token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchLeadSource(token));
  }, []);

  const { loading, LeadSource, error } = useSelector((store) => store) || " ";
  const leadSource = LeadSource && LeadSource.userInfo && LeadSource.userInfo.data;
  // const lead = leadSource && 
  const { userInfo } = useSelector((store) => store.userInfo) || " ";
  const currentUser = userInfo && userInfo.payload && userInfo.payload._id
  const userPermission = userInfo && userInfo.payload && userInfo.payload && userInfo.payload.role[0]?.permission
  //for lead
  const expectedAdmin = ["read", "create", "update", 'delete'];
  const sortAdmin = expectedAdmin.slice().sort();
  const sortedUserPermissions = userPermission.map(permission => permission.value).sort();
  const compairedAdmin = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortAdmin);
  // for Manager filter :
  const expectedManager = ["read", "create", "update"];
  const sortData = expectedManager.slice().sort();
  // const sortedUserPermissions = userPermission.map(permission => permission.value).sort();
  const compairedData = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortData);
  // Check the condition: If the user is null, managers cannot update the leads data because if they are assigned leads, the lead flow is blocked.
  const [data, setReject] = useState('')
  const [selectedData, setSelectedData] = useState([])
  const actionFunction = async (leadId) => {
    try {
      const response = await axios.post(`${config.API_URL}/leadSource/accept`, {
        leadId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type for file upload
            // Add any other headers you need
          },
        }
      );
      const userData = response;
      if (userData.data.code == "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Woh...",
          text: "Lead accepted ",
        });

      }
      else if (userData.code == "ERROROCCURED") {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: error,
        });

      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });

    }
  }
  const rejectFunction = async (leadId) => {
    try {
      const response = await axios.post(`${config.API_URL}/leadSource/reject`, {
        leadId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type for file upload
            // Add any other headers you need
          },
        }
      );
      const userData = response;
      if (userData.data.message == "Lead rejected and updated successfully") {
        Swal.fire({
          icon: "success",
          title: "Woh...",
          text: "Lead Rejected ",
        });
      }
      else if (userData.code == "ERROROCCURED") {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: error,
        });

      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });
    }
  }
  //reject function 
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
  console.log(filteredItems)
  const columns = useMemo(() =>
    [
      compairedAdmin ? "" : {
        name: 'Move To',
        cell: row =>
          <div className="d-flex">
            {row && row.users && row.users.length > 0 ? row && row.users && row.users.filter((item, index) => (item?.id?._id == currentUser)).map((ele) => {
              return (
                <div className>
                  {ele.leadStatus == "ACCEPTED" ?
                  <div class="inprocessHead"><span class="inprocesstext">In-progess</span></div> :ele.leadStatus == "PENDING" ?
                    <div className="d-flex">
                      <button className="p-3 m-2" style={{background:"green",color:"white"}} onClick={() => { actionFunction(row._id) }}>✓</button>
                      <button className="p-3 m-2" style={{background:"red",color:"white"}} onClick={() => { rejectFunction(row._id) }}>✘</button>
                    </div> 
                  :<div style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  onClick={setReject(row._id)}
                  data-bs-target="#exampleModal"
                >
                  <div class="blockHead"><span class="blocktext">🚫</span>
                  </div>
                  </div>
                  }
                 
                </div>
              )
            })
              : <img src={notAssigned} className="img-fluid " style={{width:"40%"}} />}
          </div>
      },
      {
        name: "Full Name",
        selector: (row) =>
          <div >
            <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" field="firstName" data-trigger="focus" title={`${row?.firstName} ${row?.lastName}`}>{row?.firstName} {row?.lastName}</Link>,
          </div>
      },
 
      {
        name: " Created By",
        selector: (row) => <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" data-trigger="focus" field="leadOwner" title={`${row?.leadCreatedBy}`}>{row?.leadSource == "facebook" ? "facebook" : row?.leadCreatedBy?.firstName}</Link>,
      },
      {
        name: "Lead Status",
        selector: (row) => <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" data-trigger="focus" field="leadOwner" title={`${row?.leadType}`}>{row?.leadType == "hot-lead"? <p style={{color:"red"}}>Hot-Lead</p>:row?.leadType == "cold-lead"?<p style={{color:"goldenrod"}}>Cold Lead</p>:row?.leadType == "warm-lead"?<p style={{color:"yellowgreen"}}>Warm Lead</p>:row?.leadType == "client"?<p style={{color:"#00bd46"}}><strong>Client</strong></p>:<p>{row.leadType}</p>}</Link>,
      },
      compairedAdmin ? {
        name: "Lead Owner",
        selector: (row) => <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" field="category" data-trigger="focus" title={`${row?.userAssociated}`}>{row?.leadSource == "facebook" ? "admin" : row && row.userAssociated}</Link>
      } : "",
      {
        name: "users Status",
        selector: (row) =>
          <div style={{ width: "50rem" }}>
            {row && row.users && row.users.length == 0 ? <p style={{
              background: "#f52c2ca3",
              color: "white ",
              // width:"6rem",
              fontSize: "12px",
              padding: "10px 5px 10px 2px ",
              borderRadius: "4px",
              borderBottom: "2px solid #071739",
              marginBottom: "0px"
            }}><strong>Not-assigned</strong></p> :
              (row && row.users && row.users.length > 0 && row.users.every(item => !item.currentUser)) || (row && row.users && row.users.find(item => item && item.id && item.id._id == currentUser && item && item.currentUser == false)) ? (
                <>
                  <p style={{
                    // background: "#ff52529e",
                    color: "red",
                    padding: "10px 4px ",
                    fontSize: "12px",
                    borderRadius: "3px",
                    // borderBottom: "2px solid #071739",
                    marginBottom: "0px",
                  }}>
                    Not-attended
                  </p>
                </>
              )
                : row && row.users && row.users.length > 0 ? row && row.users && row.users.filter((item, index) => (item && item.id && item.id._id == currentUser || compairedAdmin)).map((ele) => {
                  return (
                    <>
                      {ele.leadStatus == "REJECTED" ? <p style={{
                        // background: "#ff52529e",
                        color: "red",
                        padding: "10px 4px ",
                        fontSize: "12px",
                        borderRadius: "4px",
                        // borderBottom:"2px solid #071739",
                        marginBottom: "0px"
                      }}><strong>Not-attended</strong> </p> : ele.leadStatus == "ACCEPTED" ?
                        <div className="d-flex"> <p style={{
                          // background: "green",
                          fontSize: "13px",
                          color: "green",
                          padding: "6px",
                          borderRadius: "4px",
                          // borderBottom:"2px solid #071739",
                          marginBottom: "0px"
                        }}><>Attended by {ele && ele.id.firstName}</> </p></div> : <>
                          <div className="d-flex gap-2" ><p className="m-0" style={{
                            // background: "#ffa500",
                            fontSize: "13px",
                            color: "Orange",
                            padding: "7px",
                            borderRadius: "3px",
                            // borderBottom:"2px solid #071739",
                            marginBottom: "0px"
                          }}>Pending on {ele && ele.id.firstName} </p>
                    
                          </div></>}
                    </>
                  )
                }) : <p style={{
                  background: "rgb(219 255 98 / 62%)",
                  color: "white",
                  padding: "6px",
                  width: "3rem",
                  borderRadius: "4px",
                  borderBottom: "2px solid #071739",

                }}><strong>Not-assigned</strong><div></div></p>}

          </div>
      },
      {
        name: "Lead Source",
        selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.leadSource}`}>{row?.leadSource}</a>,
      },
      {
        name: " Budget ",
        selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.budget}`}>{row?.budget}</a>
        ,
      },
      // {
      //   name: 'Action',
      //   cell: row => <div>

      //     { compairedAdmin || (compairedData && row && row.users && row.users.length > 0 && row.users.filter((ele) => ((ele.id._id== userInfo && userInfo.payload && userInfo.payload._id   && (ele && ele.leadStatus == "ACCEPTED"))  ) ) ? <Link to={`update/${row._id}`} state={row}><button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button></Link> : "")}
          
      //   </div>
      // },
       {
        name: 'Action',
        cell: row => <div>

          { compairedAdmin ||   (row && row.users && row.users.length >0 && row.users.filter((ele)=>ele.leadStatus == "ACCEPTED")) ? <Link to={`update/${row._id}`} state={row}><button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button></Link> : ""}
          
        </div>
      },
      {
        name: " Invoice ",
        cell: row => <div>
          <Link to={`/invoice/${row._id}`}><img src={invoice} alt="invoice" className="w-25" /></Link>
        </div>
        ,
      },
    ], []
  )
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

  const handleSelectedRowsChange = (state) => {
    const selectedRowsIds = state.selectedRows.map((item) => item && item._id);
    setSelectedData([...selectedData, ...selectedRowsIds]);
  };
  const handleDelete = () => {

  }
  const ExpandableComponent = ({ data }) => {
    return (
      <div>
        <>
          <ul className="p-4 bg-light">
            <p style={{ fontSize: "13px" }}> <strong>Email:</strong> {data && data.email}</p>
            <p style={{ fontSize: "13px" }}> <strong>Phone:</strong> {data && data.phone}</p>
            <p style={{ fontSize: "13px" }}><strong>Description : </strong>{data && data.description}</p>
          </ul>
        </>
      </div>
    );
  };


  return (
    <>
      {selectedData.length > 0 && <button className='btn btn-danger btn-sm p-2 ' onClick={handleDelete}><i className=' icon-trash mr-2'></i>Delete  </button>}

      <div className="text-end" >
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText} />
      </div>
      <div className='row' >
        <div className="col-xl-12 col-lg-12  col-md-12">

          <div className="card shadow-sm ctm-border-radius grow">

            <div className="card-body align-center ">
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
                    selectableRows
                    onSelectedRowsChange={handleSelectedRowsChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RejectModal data={data} />
    </>
  );
}


export default ManualdataDetails;
