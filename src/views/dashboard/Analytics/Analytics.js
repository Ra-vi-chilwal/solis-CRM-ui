import React from 'react'
import Piechart from '../Analytics/leadchart/PieChart';
import Leadchart from '../Analytics/leadchart/Leadchart';
import PreviousMonthLead from '../Analytics/leadchart/PreviousMothLead';
import LeadType from './leadchart/LeadType';
const Analytics = () => {
  return (
    <>


      <div className='dashboard-chart'>

        <Leadchart />
        <Piechart />

      </div>
      <div className=''>

        <LeadType />
      </div>
      <PreviousMonthLead />



    </>
  )
}

export default Analytics
