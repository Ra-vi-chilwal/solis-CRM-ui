// import React, { useEffect } from 'react'
// import Mainbar from './Mainbar'
// import { useState } from 'react'
// const dummydata = [
//     {
//         relatedTo: "abcqw",
//         subject: "sfghjk",
//         Date: "dateeed",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "abcdfsec",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "xxxxxxxxxx",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "bbbbb",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "qqqqqqqqqqqqq",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "wwwwwwwwwww",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "aaaaaaaa",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "mmmmmmmmmmmm",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "lllllllllllll",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "jjjjjjjjjjjjj",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
//     {
//         relatedTo: "uuuuuuuuuuuu",
//         subject: "sfghjk",
//         Date: "datee",
//         purpose: "desss",
//         contactNo: "345678",
//         email: "aguio@solis.com",
//         role: "team leader"
//     },
// ]

// const Meetings = () => {
//     const [newData, setNewData] = useState([])
//     const handleclick = (item) => {
//         setNewData(item);
//     }
//     // useEffect(()=>{
//     //     handleclick();
//     // },[])
    
//     console.log(newData)
//     return (
//         <>
//             <div>
//                 <div width="100%" direction="left" height="50px" className='' style={{ background: "#1266f1", color: 'white', fontSize: "14px", padding: "1rem 0 1rem 2rem" }}>
//                     <i class="cil-home"></i> Meetings
//                 </div >
//             </div>
//             <div>
//                 <input
//                     placeholder='filter '
//                 />
//             </div>
//             <div className='flex gap-3 p-2 shadow-sm'>
//                 <div className='meeting-sidebar shadow'>
//                     {
//                         dummydata.map((item) =>

//                             <div className='meet-container' onClick={() => handleclick(item)}>
//                                 <span>{item.relatedTo}</span><br />
//                                 <span>{item.Date}</span><br />
//                                 <span>{item.subject}</span>
//                             </div>

//                         )
//                     }


//                 </div>
//                 <div className='meeting-mainbar shadow'>
//                     <span>{newData?.relatedTo}</span>
//                     {/* {
//                      newData.map((item)=>{
//                         <h1>{item.relatedTo}</h1>
//                      })   
//                     } */} 
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Meetings

import { Link } from 'react-router-dom'
import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import img from '../../../assets/images/avatars/5.jpg'
const Status = () => {


  const tableExample = [
    {
      avatar: { src: img, status: 'success' },
      currentstatus:"Active" ,
      Role: "Manager",
      user: {
        name: 'Ritik Rastogi',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: img, status: 'danger' },
      currentstatus:"Active" ,
      Role: "BDE",
      Role: "BDE",
      user: {
        name: 'Raman kumar',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: img, status: 'danger' },
      currentstatus:"Not Active" ,
      Role: "Manager",
      user: { name: 'Rajat Mehta', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '2 Days ago',
    },
    {
      avatar: { src: img, status: 'success' },
      currentstatus:"Active" ,
      Role: "BDE",
      user: { name: 'Satendra Singh' , new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Active',
    },
    {
      avatar: { src: img, status: 'success' },
      currentstatus:"Not  Active" ,
      Role: "BDE",
      user: {
        name: 'Manoj khanna',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: img, status: 'success' },
      currentstatus:"Not Active" ,
      Role: "BDE",
      user: {
        name: 'Lalit Kumar',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Not Active',
    },
  ]
  return (
    <>
       {/* <div class="col shadow-sm  mb-5 bg-white  m-2" style={{ width:"98%", color: "" }} >
                <div style={{ background: "#edf0f4", padding: "10px  ", borderRadius: "5px 5px 0 0" }} className='shadow-sm'><small>Status</small></div>

                <table class="table table-hover">
                  <thead style={{ fontWeight: "400", fontSize: "14px" }}>
                    <tr style={{ fontWeight: "400", fontSize: "14px" }}>
                      {/* <th scope="col">#</th> 
                      <th scope="" style={{ fontWeight: "400", fontSize: "14px" }}>Name</th>
                      <th scope="col" style={{ fontWeight: "400", fontSize: "14px" }}>Login Time</th>
                      <th scope="col" style={{ fontWeight: "400", fontSize: "14px" }}>Log Out Time</th>
                      <th scope="col" style={{ fontWeight: "400", fontSize: "14px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      {/* <th scope="row">1</th> 
                      <td><Link className=''>Sumit</Link></td>
                      <td>09:30AM</td>
                      <td>-</td>
                      <td ><span  style={{background:"green",color:"white",borderRadius:"15px",padding:" 0 1rem",fontSize:"13px"}}>Active</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      
                      <td><Link className=''>Rajat</Link></td>
                      <td>9:20PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"red",color:"white",borderRadius:"15px",padding:" 0 12px" ,fontSize:"13px"}}>NotActive</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      {/* <th scope="row">3</th> 
                      <td><Link className=''>Raman</Link></td>
                      <td>9:00 PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"green",color:"white",borderRadius:"15px",padding:" 0 1rem",fontSize:"13px"}}>Active</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      {/* <th scope="row">3</th> 
                      <td><Link className=''>Raman</Link></td>
                      <td>9:00 PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"green",color:"white",borderRadius:"15px",padding:" 0 1rem",fontSize:"13px"}}>Active</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      {/* <th scope="row">3</th> 
                      <td><Link className=''>Raman</Link></td>
                      <td>9:00 PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"green",color:"white",borderRadius:"15px",padding:" 0 1rem",fontSize:"13px"}}>Active</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      {/* <th scope="row">2</th> 
                      <td><Link className=''>Rajat</Link></td>
                      <td>9:20PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"red",color:"white",borderRadius:"15px",padding:" 0 12px" ,fontSize:"13px"}}>NotActive</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>
                      {/* <th scope="row">3</th>
                      <td><Link className=''>Raman</Link></td>
                      <td>9:00 PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"green",color:"white",borderRadius:"15px",padding:" 0 1rem",fontSize:"13px"}}>Active</span></td> 
                    </tr>
                    <tr style={{fontSize:"13px" , fontWeight:"500"}}>

                      <td><Link className=''>Raman</Link></td>
                      <td>9:00 PM</td>
                      <td>-</td>
                      <td ><span  style={{background:"green",color:"white",borderRadius:"15px",padding:" 0 1rem",fontSize:"13px"}}>Active</span></td> 
                    </tr>
                  </tbody>
                </table>

              </div> */}


              {/* ...................................... */}

            <div className='p-6'>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell >User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Login</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell> 
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell>Logout</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="font-medium" style={{fontSize:"13px", margin:"13px 0 0 0"}}>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          {/*   <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '} */}
                          {item.Role}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="md" title="09:00 AM" /> */}
                        <span style={{fontSize:"14px"}}>09:00 AM</span> 
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            {/* <span style={{fontSize:"14px"}}>{item.usage.value}%</span> */}
                          </div>
                          <div className="float-end">
                            {/* <small className="">{item.usage.period}</small> */}
                          </div>
                        </div>
                        {/* <CProgress className="thin-progress-bar" thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="sm" icon={item.payment.icon} /> */}
                        {/* <span style={{fontSize:"14px"}}>{item.currentstatus}</span>  */}

                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-sm-emphasis font-medium" style={{fontSize:"12px", margin:"10px 0 0 0"}}>-</div>
                        {/* <small className='font-medium' style={{fontSize:"12px"}}>{item.activity}</small> */}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable> 

              </div>
    </>
  )
}

export default Status
