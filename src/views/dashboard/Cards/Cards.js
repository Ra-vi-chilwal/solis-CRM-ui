import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { dashboardcards } from '../../../redux/action/DashboardCards/dashboardcards'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import config from '../../../config';
import unassigned from '../../../assets/images/unassigned-image.png'
import assignedImage from '../../../assets/images/assignedImage.png'
import clients from '../../../assets/images/clients.png'
import totallead from '../../../assets/images/totallead-image.png'
import lostlead from '../../../assets/images/lost-image.png'
import { fetctAllLead } from '../../../redux/action/allleads/getalllead';
const Cards = () => {
    const dispatch = useDispatch();
    var token = localStorage.getItem("token")
    const data = useSelector((state) => state?.fetchCardReducer?.userInfo?.data)
    console.log(data)
    useEffect(() => {
        dispatch(dashboardcards(token));
    }, [dispatch])
    const { loading, userInfo, error } = useSelector(store => store.userInfo);
    const permissions = userInfo && userInfo.payload && userInfo.payload.role[0] && userInfo.payload.role[0].permission
    const allElements = ['create','read', 'delete', 'update']
    const sortedAdmin = allElements.slice().sort()
    const sortedPrmission = permissions.sort((a, b) => a.value.localeCompare(b.value));
    const objectValues = sortedPrmission && sortedPrmission.map(obj => obj.value);
    const ForAdmin = sortedAdmin.every(element => objectValues && objectValues.includes(element));
    const alllead = useSelector((state) => state?.fetchAllLeadReducer?.userInfo?.data?.lead_data)
    useEffect(() => {
        dispatch(fetctAllLead(token))
    }, [])
    const unassignedLead = alllead && alllead?.filter((item) => (item?.users?.length == 0))
const [assigned ,setassign ] = useState(0);
    const assignedData = async () => {

        try {
            const response = await axios.get(
               (`${config.API_URL}/dashboard/assigned`),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setassign((response?.data?.data?.lead_data).length)

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
        assignedData()
    },[])
    return (
        <div className='d-flex justify-content-between mb-4 mt-2 p-2'>
{ForAdmin ? <div className="card " style={{ width: "18%", fontWeight: 500, }}>
           <div className="card-body">
                    <img src={unassigned} width={55} />
                    <div className='d-flex  justify-content-between mt'>
                        <span className="card-text " ><Link to={{
                            pathname: '/source/custom/getAllLead',
                        }} state={['Un-Assigned leads', 'unassigned']}>UnAssigned Lead </Link></span>
                        <small className="card-title border-bottom-red " style={{ color: "", fontWeight: "500" }}>{unassignedLead?.length}</small>
                    </div>
                </div>
            </div>:""}
            <div className="card " style={{ width: "18%", color: "", fontWeight: 500, }}>
                <div className="card-body">
                    {/* {/ <img src='https://icon-library.com/images/homework-icon-black-and-white/homework-icon-black-and-white-22.jpg' width={40} /> /} */}
                    <img src={assignedImage} width={55} />
                    <div className='d-flex  justify-content-between mt'>
                        <span className="card-text " ><Link
                            to={{
                                pathname: '/source/custom/getAllLead',
                                // state: { label: 'Assigned leads', search: 'assigned' }
                            }}
                            state={["Assigned leads", "assigned"]}
                        >
                            Assigned Lead
                        </Link>
                        </span>
                        <small className="card-title border-bottom-red " style={{ color: "", fontWeight: "500" }}>{assigned}</small>
                    </div>
                </div>
            </div>
            <div className="card " style={{ width: "18%", color: "", fontWeight: 500, }}>
                <div className="card-body">
                    <img src={clients} width={55} />
                    <div className='d-flex  justify-content-between'>
                        <span className="card-text " ><Link to={{
                            pathname: '/source/custom/getAllLead',
                            state: { label: 'Closed leads', search: 'closed/leads' }
                        }}
                            state={['Closed leads', 'closed/leads']}
                        >Clients </Link></span>
                        <small className="card-title border-bottom-red " style={{ color: "", fontWeight: "500" }}>0</small>
                    </div>
                </div>
            </div>
            <div className="card bg-white" style={{ width: "18%", color: "", fontWeight: 500, }}>
                <div className="card-body">
                    {/* {/ <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZ9dAuf6883QmvF8kVU48-OXNCgyF0J8T1zSn1wNhlOQBVScLpFp2rjbMC2O6SqPMe9U&usqp=CAU' width={40} /> /} */}
                    <img src={lostlead} width={50} />
                    <div className='d-flex  justify-content-between mt-2'>
                        <span className="card-text " ><Link to={{
                            pathname: '/source/custom/getAllLead',

                        }}
                            state={['Lost leads', 'closed/leads']}>Lost Lead </Link></span>
                        <small className="card-title border-bottom-red " style={{ color: "", fontWeight: "500" }}>0</small>
                    </div>
                </div>
            </div>
            <div className="card bg-white" style={{ width: "18%", color: "", fontWeight: 500, }}>
                <div className="card-body">
                    {/* {/ <img src='https://www.caterease.com/wp-content/uploads/2021/02/group-of-users-silhouette.png' width={40} /> /} */}
                    <img src={totallead} width={55} />
                    <div className='d-flex justify-content-between mt'>
                        <span className="card-text " ><Link to={{
                            pathname: '/source/custom/getAllLead',
                            state: { label: 'Total leads', search: 'total/leads' }
                        }}
                            state={['Total leads', 'total/leads']}
                        >Total Lead </Link></span>
                        <small className="card-title border-bottom-red " style={{ color: "", fontWeight: "500" }}>{alllead?.length}</small>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Cards