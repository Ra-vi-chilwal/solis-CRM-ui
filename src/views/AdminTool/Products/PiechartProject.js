import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 10, label: 'CRM' },
  { id: 1, value: 15, label: 'Websites' },
  { id: 2, value: 20, label: 'Applications' },
  { id: 3, value: 10, label: 'SEO' },
  { id: 4, value: 90, label: 'Web-Page' },
  { id: 5, value: 20, label: 'PPC' },
];

function PiechartProject() {
  return (
    <div className='pt-5'>
        <h4>Product-wise Production Statistics</h4>
        <div className='pt-3'>
        <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
     
      height={300}
    />
        </div>
 
    </div>
   
  );
}

export default PiechartProject;
