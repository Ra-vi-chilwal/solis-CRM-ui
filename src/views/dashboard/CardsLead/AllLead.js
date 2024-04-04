
import { useLocation } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "../../Source/ManualData/FilterComponent";
import Inprogess from '../../../assets/images/inprogress.jpg';
import Reject from '../../../assets/images/3712216.png';
import notAssigned from '../../../assets/images/support-illustration.svg'
import { fetchLeadSource } from "../../../redux/action/LeadSource/LeadSource";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import RejectModal from "../../Source/subManualData/RejectLeadModal";


function AllLeads() {
  const dispatch = useDispatch();
  const location = useLocation()
  // console.log(location,'location')
  const yourPropValue = location.state
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
const [data,setReject]=useState('')
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
      console.log(userData)
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

  const columns = useMemo(()=>
  [
    
    compairedAdmin?"":{
      name: 'Move To',
      cell: row =>
        <div className="d-flex">
          {row && row.users && row.users.length > 0 ? row && row.users && row.users.filter((item, index) => item?.id?._id == currentUser).map((ele) => {
            return (
              <div className>
                {ele.leadStatus == "REJECTED" ? <img src={Reject} className="img-fluid w-25" /> : ele.leadStatus == "ACCEPTED" ?
                  <img src={Inprogess} className="img-fluid w-25" /> :
                  <>
                    <button className="p-1" onClick={() => {actionFunction(row._id)}}><span className="move-icons">✅</span></button>
                    <button className="p-1" onClick={() => {rejectFunction(row._id)}}><span className="move-icons">❌</span></button>
                      </>}
                      {
                      ele.leadStatus == "REJECTED"?<button className="p-1"  type="button"
                      data-bs-toggle="modal"
                      onClick={ setReject(row._id) }
                      data-bs-target="#exampleModal">Reason</button>:""}
              </div>
            )
          })
            : <img src={notAssigned} className="img-fluid w-50" />}
        </div>
    },
 
    {
      name: "Full Name",
      selector: (row) =>
        <div >

          <a tabindex="0" data-toggle="popover" field="firstName" data-trigger="focus" title={`${row?.firstName} ${row?.lastName}`}>{row?.firstName} {row?.lastName}</a>
        </div>
    },
    {
      name: "Lead Status",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.leadType}`}>{row?.leadType}</a>,
    },
    {
      name: " Created By",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" field="leadOwner" title={`${row?.leadCreatedBy}`}>{row?.leadCreatedBy?.firstName}</a>,
    },
    compairedAdmin? {
      name: "Lead Owner", 
      selector: (row) => <a tabindex="0" data-toggle="popover" field="category" data-trigger="focus" title={`${row?.userAssociated}`}>{row && row.userAssociated }</a>
    }:"",
    // {
    //   name: "users Status",
    //   selector: (row) =>
    //     <div>
    //       {row && row.users && row.users.length == 0 ? <p style={{
    //           background: "radial-gradient(circle at 50% center, rgb(1 43 14), rgb(0 133 56))",
    //           // background: "rgb(219 255 98 / 62%)",
    //           color: "white",
    //           width:"8rem",
    //           padding: "10px 10px 10px 5px",
    //           borderRadius: "3px",
    //           fontSize:"12px",
    //           // borderBottom:"2px solid #071739",
    //           marginBottom:"0px"
    //         }}><strong>NotAssigned</strong></p>:
    //         (row && row.users && row.users.length > 0 && row.users.every(item => !item.currentUser)) || (row && row.users && row.users.find(item => item.id._id == currentUser && item.currentUser == false )) ? (
    //          <>
    //             <p style={{
    //               background: "#ff52529e",
    //               color: "#431010",
    //               padding: "6px",
    //               borderRadius: "0px",
    //               // borderBottom: "2px solid #071739",
    //               marginBottom: "0px"
    //             }}>
    //               <strong>Not-Attended</strong>
    //             </p>
    //          </>
    //           ) 
    //         : row && row.users && row.users.length > 0 ? row && row.users && row.users.filter((item, index) => (item.id._id == currentUser || compairedAdmin) && item.currentUser ).map((ele) => {
    //         return (
    //           <>
    //             {ele.leadStatus == "REJECTED" ? <p style={{
    //               background: "#ff52529e",
    //               color: "#431010",
    //               padding: "6px",
    //               borderRadius: "0px",
    //               borderBottom:"2px solid #071739",
    //               marginBottom:"0px"
    //             }}><strong>not-attended</strong> </p> : ele.leadStatus == "ACCEPTED" ?
    //               <p style={{
    //                 background: "#00b799",
    //                 background: "linear-gradient(to right, #00b799, #00ff3345)",
    //                 width:"5rem",
    //                 color: "white",
    //                 fontSize:"12px",
    //                 padding: "10px",
    //                 borderRadius: "3px",
    //               // borderBottom:"2px solid #071739",
    //               marginBottom:"0px"
    //               }}><strong>Attended</strong> </p> : <p style={{
    //                 background: "linear-gradient(to right, rgb(51, 136, 255), rgb(18 4 29 / 89%))",
    //                 // background: "#feb600",
    //                 width:"5rem",
    //                 color: "white",
    //                 padding: "10px",
    //                 fontSize:"12px",
    //                 borderRadius: "3px",
    //                 textAlign:"center",
    //                 marginBottom:"0px"
    //               }}><strong>Pending</strong></p>}
    //           </>
    //         )
    //       }): <p style={{
    //           background: "rgb(219 255 98 / 62%)",
    //           color: "#431010",
    //           width: "5rem",
    //           padding: "10px",
    //           borderRadius: "3px",
    //           fontSize:"12px",
    //           // borderBottom:"2px solid #071739",
              
    //         }}><strong>  -assigned</strong></p>}

    //     </div>
    // },
    {
      name: "Lead Source",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.leadSource}`}>{row?.leadSource}</a>,
    },
    {
      name: " Budget ",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.budget}`}>{row?.budget}</a>
      ,
    },
    {
      name: 'Action',
      cell: row => <div>
        <Link to={`${row._id}`} state={row} > <spna className><i class="bi bi-arrows-fullscreen" style={{ marginRight: "8px", fontSize: "14px" }}></i></spna></Link>
        {compairedData && row && row.users && row.users.length > 0 && row.users.filter((ele) => (ele.id === userInfo && userInfo.payload && userInfo.payload._id) && (ele && ele.leadStatus == "ACCEPTED") )   
         || compairedAdmin ? <Link to={`update/${row._id}`} state={row}><button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button></Link> : ""}
        {compairedAdmin ? <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button> : ""}
      </div>
    },
  ],[]
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
  
  const fetch = location.state[1]

  const[unassign,setunassign ] = useState([]);
  const newData = async()=>{
    try {
      console.log("enterrrrr")
      const response = await axios.get(`${config.API_URL}/dashboard/${fetch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type for file upload
            // Add any other headers you need
          },
        }
      );
      console.log(response,"response")
      setunassign( response.data.data.lead_data);
      
     
      
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });

    }
  }
  useEffect(()=>{
    newData()
  },[])
  console.log(fetch,"unassign")
  console.log(unassign , "unass")
  return (
    <>
   
      <div className="text-end mt-2 radius-sm d-flex justify-content-between  " >
        <div className='mt-2 ml-4 '><Link  to="/"><img src='	https://cdn-icons-png.flaticon.com/512/2732/2732652.png' width={30}/></Link></div>
        <div className='items-center'> <h5>{location.state[0]}</h5></div>
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText} />
          
      </div>
      {unassign ?<div className='p-4 row' >
        <div className="col-xl-12 col-lg-12  col-md-12">

          <div className="card shadow-sm ctm-border-radius grow">

            <div className="card-body align-center ">
              <div className="row" >
                <div className="col-md-12 react-table " >
                  <DataTable
                    columns={columns}
                    data={unassign}
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
      </div> :<div className="d-flex justify-content-center items-center h-full"> <Loader/></div>}
      {/* <RejectModal data={data} /> */}
    </>
  );
}


export default AllLeads;
