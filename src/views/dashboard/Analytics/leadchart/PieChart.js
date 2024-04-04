import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { piechartdata } from '../../../../redux/action/DashboardCards/piechart';
import config from '../../../../config';
import axios from 'axios';

const RADIAN = Math.PI / 180;

const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;
const value = 50;
<Tooltip
    content={({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p>Name: {dataPoint.name}</p>
                    <p>Value: {dataPoint.value}</p>
                </div>
            );
        }
        return "null";
    }}
/>
const needle = (value, assign, cx, cy, iR, oR, color) => {
    let total = 0;
    assign && assign.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
};




const Piechart = () => {
    var token = localStorage.getItem("token")
    // const data2 = useSelector((state) => state?.piechartReducer?.userInfo?.data)
    const [assign,setassign] = useState('')
    // useEffect(() => {
    //     dispatch(piechartdata(token))
    // }, [dispatch])
useEffect(()=>{
const fetchData = async () =>{
    try {
        const response = await axios.get(
           (`${config.API_URL}/dashboard/count/allLeads`),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        setassign(response && response.data && response.data.data)
    } catch (error) {
        console.log(error)

    }
}
fetchData()
},[])

// console.log(assign,'dfk')
    return (

        <div className='piechart'>
            <h6 className='p-3   underline-text' style={{background:"#edf0f4",borderRadius:"7px 7px 0 0 "}}>Total Number Of Leads</h6>
            <PieChart width={300} height={200} >
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={60}
                    data={assign}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"

                >
                    {assign && assign.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                {needle(value, assign, cx, cy, iR, oR, '#d0d000')}
            </PieChart>

        </div>
    );
}

export default Piechart;
