import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pipelineImg from '../../../assets/images/pipeline.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import React from 'react';
function Pipeline() {
    const { loading, userInfo, error } = useSelector((store) => store.userInfo) || " ";
    const user = userInfo && userInfo.payload && userInfo.payload._id
    var token = localStorage.getItem("token")
    const [assigned, setassign] = useState([]);
    const assignedData = async () => {

        try {
            const response = await axios.get(
                (`${config.API_URL}/dashboard/pipeline/leads`),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setassign(response?.data?.data)

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: error,
            });

        }
    }
    useEffect(() => {
        assignedData()
    }, [])
    console.log(assigned, 'assigned')
    return (
        <>

            <div class="col shadow-sm mb-5 bg-white rounded m-2 " style={{ padding: 0, color: "", flex: 2 }}>
                <div style={{ background: "#edf0f4", padding: "10px  ", borderRadius: "5px 5px 0 0" }} className='shadow-sm pt-2'><small>Pipelining</small>
                </div>

                <table class="table table-hover">
                    <thead style={{ fontWeight: "400", fontSize: "12px", borderBottom: "1px solid lightgrey" }}>
                        <tr >
                        
                            <th scope="col" style={{ fontWeight: "500", fontSize: "12px" }}>Lead Name</th>
                           
                            <th scope="col" style={{ fontWeight: "500", fontSize: "12px" }}>Email</th>
                            <th scope="col" style={{ fontWeight: "500", fontSize: "12px" }}> Assigned Date </th>
                            <th scope="col" style={{ fontWeight: "500", fontSize: "12px" }}> Assigned Time </th>
                            <th scope="col" style={{ fontWeight: "500", fontSize: "12px" }}>Lead Source</th>
                        </tr>
                    </thead>
                    <tbody className='t-body'>

                        {assigned && assigned.length > 0 ? assigned && assigned.map((item) => {
                            return (
                                <tr>
                                    <td style={{ fontSize: "13px" }}><Link to={`/source/custom/getAllLead/${item._id}`} state={item}  style={{ textDecoration: "none" }}>{item?.firstName}   {item?.lastName}</Link></td>
                                    <td style={{ fontSize: "13px" }}>{item?.email} </td>
                                    {item && item.users && item.users.map((ele) => {
                                        const inputDate = ele && ele.assignedDate;
                                        const dateParts = inputDate && inputDate.split('-');
                                        console.log(dateParts)
                                        const year = dateParts && dateParts[0];
                                        const day = dateParts && dateParts[1];
                                        const month = dateParts && dateParts[2];
                                        
                                        const formattedDate = `${day}-${month}-${year}`;
                                        if (ele.id === user) {
                                            return (
                                                <React.Fragment key={ele.id}>
                                                    <td style={{ fontSize: "13px" }}>{formattedDate}</td>
                                                    <td style={{ fontSize: "13px" }}>{ele.assignedTime}</td>
                                                </React.Fragment>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* <td style={{ fontSize: "13px" }}>34567888 </td> */}
                                    <td style={{ fontSize: "13px" }}>{item?.leadSource}</td>
                                </tr>
                            )
                        }) : <div className='d-flex justify-content-end ml-4'><img src={pipelineImg} /></div>}

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Pipeline;