import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "../Source/ManualData/FilterComponent";
import Reject from '../../assets/images/3712216.png';
import notAssigned from '../../assets/images/support-illustration.svg'
import { fetchLeadSource } from "../../redux/action/LeadSource/LeadSource";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import RejectModal from "../Source/subManualData/RejectLeadModal";
import invoice from "../../assets/images/avatars/invoice.png";
import { fetctAllLead } from "../../redux/action/allleads/getalllead";
import Loader from "../../Loader";
import progressImage from "../../assets/images/progress-image.png";
import cross from '../../assets/images/cross.png'
import check from '../../assets/images/check.png'
// import { filter } from "core-js/core/array";
import {fetchUserApi} from '../../redux/action/UserApi/UserApi'

function Getalllead() {
  const dispatch = useDispatch();
  var token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchLeadSource(token));
    dispatch(fetchUserApi(token));
  }, []);

  const { LeadSource, error } = useSelector((store) => store) || " ";
  const leadSource = LeadSource && LeadSource.userInfo && LeadSource.userInfo.data;
  // const lead = leadSource && 
  const { userInfo } = useSelector((store) => store.userInfo) || " ";
  const { userApi } = useSelector((store) => store) || " ";
 const  users = userApi && userApi.userInfo && userApi.userInfo.data; 
  const currentUser = userInfo && userInfo.payload && userInfo.payload._id
  const userPermission = userInfo && userInfo.payload && userInfo.payload && userInfo.payload.role[0]?.permission;
  //for lead
  const [data, setReject] = useState('')
  const [selectedData, setSelectedData] = useState([])

  const expectedLead = ['read', 'create'];
  const expectedManager = ['read', 'create', 'update'];
  const expectedAdmin = ['read', 'create', 'update', 'delete'];
  const sortAdmin = expectedAdmin.slice().sort();
  const sortData = expectedManager.slice().sort();
  const sortExpectedLead = expectedLead.slice().sort();
  const sortedUserPermissions = userPermission.map(permission => permission.value).sort();
    const checkPermissionMatch = (permissions, expectedPermissions) => {
      const permissionValues = permissions.map((permission) => permission.value);
      return expectedPermissions.every((perm) => permissionValues.includes(perm)) && permissions.length === expectedPermissions.length;
    };

  const leadUsers = users && users.filter((user) =>
  checkPermissionMatch(user.role.permission, sortExpectedLead)
);
const managerUsers = users && users.filter((user) =>
  checkPermissionMatch(user.role.permission, sortData)
);
const adminUsers = users && users.filter((user) =>
  checkPermissionMatch(user.role.permission, sortAdmin)
);

const compairedAdmin = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortAdmin);
const compairedData = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortData);

const multipleLead = users && users.filter((ele)=>{

  // console.log(ele.role,'sortedmultipleLeads')
  const sortedmultipleLeads = ele && ele.role && ele.role.permission && ele.role.permission.map(permissions => permissions.value).sort()
  
  const permissionsLeadMatch = JSON.stringify(sortedmultipleLeads) === JSON.stringify(sortedUserPermissions);
  return permissionsLeadMatch;
})
const allUser = compairedAdmin?managerUsers:compairedData ? managerUsers && managerUsers.concat(leadUsers) :multipleLead
  const newData = async()=>{
 
    try {
      const response = await axios.get(
        fetchh != null
          ? `${config.API_URL}/dashboard/${fetchh}`
          : (`${config.API_URL}/dashboard/total/leads`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLeadsdata( response.data.data.lead_data)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });

    }
  }
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
        newData();
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
        newData();
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
  const columns = useMemo(() =>
    [
      compairedAdmin ? "" : {
        name: 'Move To',
        cell: row =>
          <div className="d-flex">
            {row && row.users && row.users.length > 0 ? row && row.users && row.users.filter((item, index) => item?.id?._id == currentUser).map((ele) => {

              return (
                <div className>
                  {ele.leadStatus == "REJECTED" ? "" : ele.leadStatus == "ACCEPTED" ?
                <div class="inprocessHead"><span class="inprocesstext">In-progess</span></div> :
                    <div className="d-flex">

                      <button className="p-3 m-2" style={{background:"green",color:"white"}} onClick={() => { actionFunction(row._id) }}>✓</button>
                      <button className="p-3 m-2" style={{background:"red",color:"white"}} onClick={() => { rejectFunction(row._id) }}>✘</button>
                
                    </div>}
                  {
                    ele.leadStatus == "REJECTED" ? <button className="p-1" type="button"
                      data-bs-toggle="modal"
                      onClick={setReject(row._id)}
                      data-bs-target="#exampleModal"><img src={Reject} className="img-fluid w-50" />Reason</button> : ""}
                </div>
              )
            })
              : <img src={notAssigned} className="img-fluid w-50" />}
          </div>
      },
      {
        name: "Full Name",
        selector: (row) =>
          <div style={{ color: "black" ,width:"30rem" }} >
            <Link to={`${row._id}`} state={row} style={{ color: "black" ,width:"14rem" }} tabindex="0" data-toggle="popover" field="firstName" data-trigger="focus" title={`${row?.firstName} ${row?.lastName}`}>{row?.firstName} {row?.lastName}</Link>,
          </div>
      },
      {
        name: " Created By",
        selector: (row) => <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" data-trigger="focus" field="leadOwner" title={`${row?.leadCreatedBy}`}>{row?.leadSource == "facebook" ? "facebook" : row?.leadCreatedBy?.firstName}</Link>,
      },
      compairedAdmin && {
        name: "Lead Owner",
        selector: (row) => <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" field="category" data-trigger="focus" title={`${row?.userAssociated}`}>{row && row.userAssociated}</Link>
      },
      {
        name: "Lead Status",
        selector: (row) => <Link to={`${row._id}`} state={row} style={{ color: "black" }} tabindex="0" data-toggle="popover" data-trigger="focus" field="leadOwner" title={`${row?.leadType}`}>{row?.leadType == "hot-lead"? <p style={{color:"red"}}>Hot-Lead</p>:row?.leadType == "cold-lead"?<p style={{color:"goldenrod"}}>Cold Lead</p>:row?.leadType == "warm-lead"?<p style={{color:"yellowgreen"}}>Warm Lead</p>:row?.leadType == "client"?<p style={{color:"#00bd46"}}><strong>Client</strong></p>:<p>{row.leadType}</p>}</Link>,
      },
      {
        name: "users Status",
        selector: (row) =>
          <div >
            {row && row.users && row.users.length == 0 ? <p style={{
              background: "#f52c2ca3",
              color: "white",
              fontSize:"12px",
              padding: "8px 10px 3px 2px",
              borderRadius: "4px",
              width:"6rem",
                borderBottom:"2px solid #071739",
              marginBottom: "0px"
            }}><span>Not-assigned</span></p> :
              (row && row.users && row.users.length > 0 && row.users.every(item => !item.currentUser)) || (row && row.users && row.users.find(item => item && item.id && item.id._id == currentUser && item && item.currentUser == false)) ? (
                <>
                  <p style={{
                    background: "#ff52529e",
                    color: "white",
                    width: "5.5rem",
                    padding: "10px 4px ",
                    fontSize: "12px",
                    borderRadius: "3px",
                    borderBottom: "2px solid #071739",
                    marginBottom: "0px",
                  }}>
                    Not-attended
                  </p>
                </>
              )
                : row && row.users && row.users.length > 0 ? row && row.users && row.users.filter((item, index) => (item && item.id && item.id._id == currentUser || compairedAdmin) && item.currentUser).map((ele) => {

                  return (
                    <>
                      {ele.leadStatus == "REJECTED" ? <p style={{
                        background: "#ff52529e",
                        color: "white",
                        padding: "10px 4px ",
                        fontSize: "12px",
                        width: "5.5rem",
                        borderRadius: "4px",
                        borderBottom: "2px solid #071739",
                        marginBottom: "0px"
                      }}><span>Not-attended</span> </p> : ele.leadStatus == "ACCEPTED" ?
                        <p style={{
                          background: "green",
                          fontSize: "12px",
                          width:"6rem",
                          color: "white",
                          width: "5.5rem",
                          padding: "6px",
                          borderRadius: "4px",
                          borderBottom: "2px solid #071739",
                          marginBottom: "0px"
                        }}><strong>Attended</strong> </p> : <p style={{
                          background: "orange",
                          fontSize: "12px",
                          width:"6rem",
                          color: "white",
                          padding: "6px",
                          borderRadius: "4px",
                          borderBottom:"2px solid #071739",
                          marginBottom: "0px"
                        }}>Pending</p>}
                    </>
                  )
                }) : <p style={{
                  background: "rgb(219 255 98 / 62%)",
                  color: "white",
                  padding: "6px",
                  width:"6rem",
                  borderRadius: "0px",
                  borderBottom: "2px solid #071739",

                }}><span>Not-assigned</span></p>}

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
      {
        name: 'Action',
        cell: row => <div>

          {compairedData && row && row.users && row.users.length > 0 && row.users.filter((ele) => (ele.id === userInfo && userInfo.payload && userInfo.payload._id) && (ele && ele.leadStatus == "ACCEPTED"))
            || compairedAdmin ? <Link to={`/source/custom/update/${row._id}`} state={row}><button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button></Link> : ""}

          {/* {/ {compairedAdmin ? <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button> : ""} /} */}
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

  const handleSelectedRowsChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  const alllead = useSelector((state) => state?.fetchAllLeadReducer?.userInfo?.data?.lead_data)
  useEffect(() => {
    dispatch(fetctAllLead(token))
  }, [])

const handleDelete = ()=>{
}
const location = useLocation()
// console.log(location.state[1],"loo")

const fetchh = location && location.state && location.state[1] 
const[leadsdata,setLeadsdata ] = useState([]);
const filteredItems = leadsdata && leadsdata.filter(
  item =>
    JSON.stringify(item)
      .toLowerCase()
      .indexOf(filterText.toLowerCase()) !== -1
);
useEffect(()=>{
  newData()
},[])
//assign multiple user
const [ids,setIds] = useState('')
const multiValues =  selectedData.map(obj => obj._id);

const assignUser = async () =>{
  try {
    const response = await axios.post(`${config.API_URL}/leadSource/leads/assign/multiple`,{
      leadIds:multiValues,
      userId:ids
    },{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type for file upload
        // Add any other headers you need
      },
    })
  if(response.data.success){
    Swal.fire({
      icon: "success",
      title: "Woh...",
      text: "Lead Assigned ",
    });
  }
   
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: error, // Access the error message from the response data
    });
  }
}
  return (
    <>
      <div className="text-end d-flex justify-content-between  mt-4 mb-4" >
      <div>{selectedData.length > 0 && <button className='btn btn-danger btn-sm p-2 ' onClick={handleDelete}><i className=' icon-trash mr-2'></i>Delete  </button>}
        </div>
       { selectedData.length > 0 && <div><select className="p-2" style={{border:"1px solid gray", borderRadius:"7px"}}  onChange={(event) => setIds(event.target.value)}>
        <option>--SELECT USER--</option>
        {allUser && allUser.map((ele)=>{
          return (
            <option key={ele._id} value={ele._id}>
              <p>{ele && ele.firstName} {ele && ele.lastName}</p>
             <p> ({ele && ele.email})</p> </option>
          )
        })}
      </select>
      <button className="btn btn-success m-2 p-2" onClick={assignUser}>Assign</button>
      </div> }
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText} />
      </div>

      {alllead ? <div className='row '  style={{marginTop :"3rem"}}>
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
      </div> : <div className="d-flex justify-content-center items-center h-full"> <Loader /></div>}
      <RejectModal data={data} />
    </>
  );
}


export default Getalllead;