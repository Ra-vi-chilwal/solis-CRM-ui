import { Link } from 'react-router-dom';
import React from 'react'

import {
  CAvatar,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'
import img from '../../../assets/images/avatars/5.jpg'
import UserReport from './UserReport';
const Reports = () => {


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
        value: 90,
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
        value: 92,
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
        value: 28,
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
        value: 53,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
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
        value: 40,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Not Active',
    },
  ]
  return (
    <>
<div className='row'>
  <div className='col-lg-6'>
    
  <div className='p-6'>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell >User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell>Total Leads</CTableHeaderCell> 
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} className='cursor-pointer' />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="font-medium cursor-pointer" style={{fontSize:"13px", margin:"13px 0 0 0"}}>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          {item.Role}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <span style={{fontSize:"14px"}}>{item.usage.value}</span>
                          </div>
                          <div className="float-end">
                            {/* <small className="">{item.usage.period}</small> */}
                          </div>
                        </div>
                        <CProgress className="thin-progress-bar" thin color={item.usage.color} value={item.usage.value} />
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
  </div>
  <div className='col-lg-6'>
<UserReport/>
  </div>
</div>


              {/* ...................................... */}

    </>
  )
}

export default Reports
