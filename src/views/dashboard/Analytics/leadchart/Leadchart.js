
import React from "react";
import { useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Cell
} from "recharts";

import { useDispatch, useSelector } from 'react-redux';
import { barcharts } from "../../../../redux/action/DashboardCards/barchart";
export const colors = {
  blueTheme: ["rgb(70 25 210)","#c3184a","#185240",'rgb(53 152 21)'],
};
const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};
export default function Leadchart() {
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state?.fetchBarChartReducer?.userInfo?.data);

  var token = localStorage.getItem("token")
  useEffect(() => {
    dispatch(barcharts(token));
  }, [dispatch]);
  return (
    <div className="leadchart">
           <div className="card-header lead-status" style={{background:"#edf0f4" }}>Lead Status</div>
      <BarChart
        width={900}
        height={300}
        data={data2}
        margin={{
          top: 15,
          right: 0,
          left: 5,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="leadSource" tick={{ fontSize: 14, marginTop: 55 }} angle={0} />
        <YAxis tickCount={4} tick={{ fontSize: 12, format: (value) => Math.round(value) }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8"  barSize={40}>
          {colors.blueTheme.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors.blueTheme[index % 20]} />
          ))}
        </Bar>
      </BarChart>

    </div>
  );
}
