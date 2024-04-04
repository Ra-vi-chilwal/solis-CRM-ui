import React, { useEffect, useState } from 'react'
import Cards from './Cards/Cards';
import Taskbar from './Taskbar/Taskbar';
import Analytics from './Analytics/Analytics';
import Products from '../AdminTool/Products';
import Reports from './Report/Reports';
import Meetings from './Status/Status';
import RejectModal from '../Source/subManualData/RejectLeadModal';
import NotesModal from './NotesModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadSource } from '../../redux/action/LeadSource/LeadSource';
import Status from './Status/Status';
import { Link } from 'react-router-dom';
import AddRole from '../AdminTool/Role/AddRole';
import { fetchMeetings } from '../../redux/action/meetings/Meetings';
import { verifyUserInfo } from '../../redux/action/user';
import { fetchTodayLead } from '../../redux/action/TodayLead/TodayLead';
import empty from '../../assets/images/empty-image.jpg'
import Pipeline from './Pipeline/Pipeline';


const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const handleState = (tabName) => {
    setSelectedTab(tabName);
  };
  const [modal, setModal] = useState(false)
  const handleNotes = () => {
    setModal((prev) => !prev);
  }
  var date = new Date();
  var todayDate = date.getDate
  // const [todayLead, setTodaylead] = useState([]);
  var token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeadSource(token))
    dispatch(fetchTodayLead(token))
  }, [])

  // const alllead = useSelector((state) => console.log(state?.LeadSource?.data?.data, "leed"))
  const meeting = useSelector((state) => state?.fetchMeetingsReducer?.data?.data)
  const todayLead = useSelector((state) => state?.TodayLeadReducer?.TodayLead?.data)
  // const { loading, userInfo, error } = useSelector(store => store.userInfo);

  useEffect(() => {
    dispatch(fetchLeadSource(token))
    dispatch(fetchMeetings(token))
  }, []) 
  return (
    <>
      {modal ? (
        <>
          <NotesModal showModal={modal} setShowModal={setModal} />
        </>
      ) :
        <>
          <div className='dashboard-navbar-items' style={{ cursor: "pointer" }}>
            <span className="p-2" onClick={() => handleState("Dashboard")} data-tab="Dashboard" style={selectedTab == "Dashboard" ? { background: "aliceblue", color: "black", margin: "1px", } : {}}>Dashboard</span>
            <span className="p-2" onClick={() => handleState("Analytics")} data-tab="Analytics" style={selectedTab == "Analytics" ? { background: "aliceblue", color: "black", margin: "1px", } : {}}>Analytics</span>
            <span className="p-2" onClick={() => handleState("Reports")} data-tab="Reports" style={selectedTab == "Reports" ? { background: "aliceblue", color: "black", margin: "1px", } : {}}>Reports</span>
            <span className="p-2" onClick={() => handleState("Status")} data-tab="Status" style={selectedTab == "Status" ? { background: "aliceblue", color: "black", margin: "1px", } : {}}>Team Status</span>
            <span className="p-2" onClick={() => handleState("Products")} data-tab="Products" style={selectedTab == "Products" ? { background: "aliceblue", color: "black", margin: "1px", } : {}}>Products</span>
          </div>
          <div className='bg rounded-sm dashboard-navbar' style={{}}>
            <div width="100%" direction="left" height="50px" className='' style={{ color: '', fontSize: "14px", padding: "1rem 0 1rem 2rem" }}>
              <i class="cil-home"></i> Home ▶   {selectedTab}
            </div >
            {selectedTab == "Dashboard" && <Cards />}
          </div>


          {selectedTab == "Dashboard" ?
            <>
              <div className='container gap-3' style={{ padding: "1rem !important" }}>
                <div class="row">
                  <div class="col shadow-sm mb-5 bg-white rounded m-2 " style={{ padding: 0, color: "" }}>
                    <div style={{ background: "#edf0f4", padding: "10px  ", borderRadius: "5px 5px 0 0" }} className='shadow-sm pt-2'><small> Today's Lead</small>
                    </div>
                    <table class="table table-hover">
                      <thead style={{ fontWeight: "400", fontSize: "14px", borderBottom: "1px solid lightgrey" }}>
                        <tr style={{ fontWeight: "400", fontSize: "14px" }}>
                          <th scope="" style={{ fontWeight: "500", fontSize: "14px" }}>Lead Name</th>
                          <th scope="col" style={{ fontWeight: "500", fontSize: "14px" }}>Email</th>
                          <th scope="col" style={{ fontWeight: "500", fontSize: "14px" }}>Lead Source</th>
                          {/* <th scope="col" style={{ fontWeight: "500", fontSize: "14px" }}>Products</th> */}
                        </tr>
                      </thead>
                      <tbody className='t-body'>

                        {todayLead && todayLead.length > 0 ? todayLead && todayLead.map((item) => {
                          return (
                            <tr>
                              <td style={{ fontSize: "13px" }}><Link to={`/source/custom/getAllLead/${item._id}`} state={item}  style={{ textDecoration: "none" }}>{item?.firstName}   {item?.lastName}</Link></td>
                              <td style={{ fontSize: "13px" }}>{item?.email} </td>
                              {/* <td style={{ fontSize: "13px" }}>34567888 </td> */}
                              <td style={{ fontSize: "13px" }}>{item?.leadSource}</td>
                            </tr>
                          )
                        }) : <div className='d-flex justify-content-end ml-4'><img src={empty} /></div>}
                      </tbody>
                    </table>
                  </div>
                  <div class="col shadow-sm  mb-5 bg-white  m-2" style={{ padding: 0, color: "" }} >
                    <div style={{ background: "#edf0f4", padding: "10px  ", borderRadius: "5px 5px 0 0" }} className='shadow-sm'><small>Meetings</small></div>

                    <table class="table table-hover">
                      <thead style={{ fontWeight: "400", fontSize: "14px", borderBottom: "1px solid lightgrey" }}>
                        <tr style={{ fontWeight: "400", fontSize: "14px" }}>
                          <th scope="" style={{ fontWeight: "500", fontSize: "14px" }}>Title</th>
                          <th scope="col" style={{ fontWeight: "500", fontSize: "14px" }}>From</th>
                          <th scope="col" style={{ fontWeight: "500", fontSize: "14px" }}>To</th>
                          <th scope="col" style={{ fontWeight: "500", fontSize: "14px" }}>Related to</th>
                        </tr>
                      </thead>
                      {/* <th /> */}
                      {meeting && meeting?.length > 0 ? (
                        meeting.map((item, index) => (
                          <tbody class="border-0">
                            <tr key={index}>
                              <td style={{ fontSize: "13px" }}>{item.purpose}</td>
                              <td style={{ fontSize: "13px" }}>{item.targetTime}</td>
                              <td style={{ fontSize: "13px" }}>{item.completionTime}</td>
                              <td style={{ fontSize: "13px" }}><Link to={`/source/custom/getAllLead`} >{item.relatedTo}</Link></td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <tbody className='t-body d-flex justify-content-center border-none' style={{ width: "100%" }}>
                          <div className='m-auto w-full'>
                            <div className='d-flex justify-content-end ml-4'><img src={empty} /></div>
                           </div>
                         </tbody>
                      )}


                    </table>

                  </div>
                </div>

              </div>

              {/* Second Section */}
              {/* <NotesModal /> */}
              <div className='container gap-3' style={{ padding: "1rem !important" }}>
                <div class="row pr-2">
                 <Pipeline/>

                  <div class="justify-content-end col w-25  mb-5 bg-white  m-2 mr-4 " style={{ padding: 0, color: "", flex: 0.8 }} >
                    <div style={{ width: "" }}>
                      <div className="d-flex justify-content-between flex-direction-col align-items-center" style={{ background: "lightyellow", padding: "10px 0 0 10px  ", borderRadius: "5px 5px 0 0", fontWeight: "600" }} >
                        <small className='font-bold'>Sticky Notes</small>
                        <div className='text-2xl mr-4 bg-black text-white rounded-circle  text-center' style={{ width: "37px" }}>
                          <Link to="/source/notes"> <button style={{ color: "white" }} >+  </button></Link>
                        </div></div>

                      <div className='' style={{ fontSize: "12px", background: "" }}>
                        <div className=" h-50 text-black rounded p-4  font-weight-medium" style={{ fontSize: "12px", background: "lightyellow" }}>
                          <span>
                            Hey ,the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                            recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            ets containing Lorem Ipsum passages, and more
                            recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ip
                          </span>
                        </div>
                        {/* {notes.map((item,index) => {
                      return (
                        <li style={{ color: "green", listStyle: "none", fontSize: "12px", padding: "12px 0 0 1rem", fontWeight:500 }}>  {item}  </li>)
                    }
                    )} */}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </>
            :
            (selectedTab == "Analytics" ? <Analytics /> : (selectedTab == "Reports" ? <Reports /> : (selectedTab == "Status" ? <Status /> :selectedTab == "Products" ? <Products />: "")))}


        </>

      }
    </>
  )
}

export default Dashboard
