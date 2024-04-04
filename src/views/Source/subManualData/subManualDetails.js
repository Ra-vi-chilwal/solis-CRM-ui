import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchUserApi } from '../../../redux/action/UserApi/UserApi';
import LeadHistory from './LeadHistory';
import "../../../scss/style.scss"
function subManualDetails() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserApi(token));
    }, [])
    var token = localStorage.getItem("token");
    const location = useLocation();
    const receivedData = location && location.state;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div>
            <div className='d-flex justify-content-between mt-4'>
                <div className='w-50'>
                    <div className='row ' style={{ background: "white", margin: "20px 20px" }}>
                        <h1 className='pb-3  p-2' style={{ fontSize: "16px", background: "#edf0f4", borderRadius: "10px 10px 0 0 " }}>Basic Information :</h1>
                        <div className='d-flex flex-col' style={{ fontSize: "16px" }}>
                            <div><small className='fw-bold'>Name : </small> <small className='ml-4'> {receivedData && receivedData.firstName} {receivedData && receivedData.lastName}</small></div>
                            <div><small className='fw-bold'>Email : </small> <small className='ml-4'> <a href='a href="mailto:Info@Digitalpolaris.com'>{receivedData && receivedData.email}</a></small></div>
                            <div><small className='fw-bold'>Phone : </small> <small className='ml-4'>{receivedData && receivedData.phone}</small></div>
                            <div><small className='fw-bold'>Address : </small> <small className='ml-4'>{receivedData && receivedData.city} {receivedData && receivedData.state} {receivedData && receivedData.country}</small></div>
                            <div><small className='fw-bold'>Lead Owner : </small><small className='ml-4'>{receivedData && receivedData.leadOwner}</small></div>


                        </div>
                       
                    </div>
                </div>
                {/* {/ {/ meeting Info /} /} */}
                <div className='w-50 round'>
                    <div className='row round' style={{ background: "white", margin: "20px 20px" }}>
                        <h1 className='pb-3 round p-2 ' style={{ fontSize: "16px", background: "#edf0f4", borderRadius: "10px 10px 0 0 " }}>Lead Information:</h1>

                        <div className='d-flex flex-col'>
                            <div><small className='fw-bold'>Lead Status : </small> <small className='ml-4'>{receivedData && receivedData.leadStatus == null || "" ? "-" : receivedData && receivedData.leadStatus}</small></div>
                            <div><small className='fw-bold'>Lead Source : </small> <small className='ml-4'>{receivedData && receivedData.leadSource == null || "" ? "-" : receivedData && receivedData.leadSource}</small></div>
                            <div><small className='fw-bold'>Budget : </small> <small className='ml-4'>{receivedData && receivedData.budget == null || "" ? "-" : receivedData && receivedData.budget}</small></div>
                            <div><small className='fw-bold'>Layout : </small><small className='ml-4'>{receivedData && receivedData.layout == null || "" ? "-" : receivedData && receivedData.layout}</small></div>
                            <div><small className='fw-bold'>Date & Time : </small><small className='ml-4'>{receivedData && receivedData.date == null || "" ? "-" : new Date(receivedData && receivedData.date).toLocaleDateString('en-US', options)}
                                {" "}
                                {receivedData && receivedData.time == null || "" ? "-" : receivedData && receivedData.time} </small></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {/ {/ <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>Description Information : </h1> /} /} */}
            <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
                <h1 className='pb-3 round p-2 ' style={{ fontSize: "16px", background: "#edf0f4", borderRadius: "10px 10px 0 0 " }}>Description Information :</h1>
                <div className='col-8 p-5'>
                    <p>{receivedData && receivedData.description}</p>
                </div>
            </div>
            {receivedData && receivedData.followUpInfo && receivedData.followUpInfo.length > 0 ?
                <>
                    {/* <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>Meeting Information</h1> */}
                    {receivedData && receivedData.followUpInfo.map((ele, index) => {  
                        return (
                            <>
                                {/* {/ {/ <h6 className='pb-3 fw-bolder' style={{ margin: "2px 20px" }}> {index + 1}. Meeting</h6> /} /} */}
                                <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
                                    <h1 className='pb-3 round p-2 ' style={{ fontSize: "16px", background: "#edf0f4", borderRadius: "10px 10px 0 0 " }}>Meeting :</h1>
                                    <div className='col-4 text-start py-5 px-3' >
                                        <p className='fw-bold F' >Subject : </p>
                                        <p className='fw-bold F'>Purpose : </p>
                                        <p className='fw-bold F'>Target Time : </p>
                                        <p className='fw-bold F'>Target Date : </p>
                                        <p className='fw-bold F'>Location :     </p>
                                        <p className='fw-bold F'>Notes :     </p>
                                        <p className='fw-bold F'>Meeting Hightlight :     </p>
                                    </div>
                                    <div className='col-8 p-5'>
                                        <p>{ele && ele.subject}</p>
                                        <p>{ele && ele.purpose}</p>
                                        <p>{ele && ele.targetTime}</p>
                                        <p><a>{ele && ele.targetTime && ele.targetDate.substring(0, 10)}</a></p>
                                        <p>{ele && ele.location}</p>
                                        <p>{ele && ele.notes}</p>
                                        <p>{ele && ele.meetingHighlight}</p>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </> : ""}

            {/* {/ {/ <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>History</h1> /} /} */}
            <div className='row mt-4' style={{ background: "white", margin: "2px 20px" }}>
                <h1 className='pb-3 round p-2 ' style={{ fontSize: "16px", background: "#edf0f4", borderRadius: "10px 10px 0 0 " }}>History:</h1>

                <div className='col-12 text-start py-5 px-5'>


                    <LeadHistory receivedData={receivedData} />
                </div>
            </div>
        </div>
    )
}

export default subManualDetails