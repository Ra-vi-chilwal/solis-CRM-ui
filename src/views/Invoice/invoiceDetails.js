import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import "./invoice.css";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import loader from "../../components/Loader/loader";
import Loader from "../../Loader";
import CIcon from '@coreui/icons-react';
import { cilCaretLeft ,cilChevronCircleLeftAlt} from '@coreui/icons';

function invoiceDetails() {
  const params = useParams()
  const id = params && params.id
  const [invoice, setInvoice] = useState([])
  var token = localStorage.getItem("token");

  useEffect(() => {
    const asyncFetchDailyData = async () => {
      const response = await axios.get(`${config.API_URL}/invoice/fetch/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response, "response")
      const invoiceData = response && response?.data && response?.data?.data;
      setInvoice(invoiceData)
    }


    asyncFetchDailyData();

  }, [])




  return (
    <>
      <div className="d-flex justify-between pr-5 pl-3">
        <div className='mt-2 ml-4 d-flex items-center'><Link to="/source/custom"><CIcon icon={cilChevronCircleLeftAlt} size="xxl"  className="text-black"/></Link></div>
        {/* <div className='mt-2 ml-4 d-flex items-center'><Link to="/source/custom"><img src='	https://cdn-icons-png.flaticon.com/512/2732/2732652.png' width={30} /></Link></div> */}

        <Link to={{ pathname: `/invoice/add/${id}`, }}><Button variant="contained" className="my-3"  > + Add Invoice</Button></Link>
      </div>
      <hr className="h-0" />

     { invoice.length>0 ? <div className="p-5">

        <table>
          <tr >
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Taxable Amount</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Tax Total</th>
          </tr>
          {invoice && invoice.map((ele) => {
            return (
              <tr className="table-container" >

                <Link to={{
                  pathname: `/invoice/get/${ele._id}`,
                  state: { ele }
                }} state={ele}><td >{ele?.items?.name}</td></Link>
                <td><>{ele?.items?.quantity}</></td>
                <td><>{ele?.items?.rate}</></td>
                <td><>{ele?.items?.taxableAmount}</></td>
                <td><>{ele?.invoiceNumber}</></td>
                <td><>{ele?.invoiceDate}</></td>
                <td><>{ele?.taxTotal.toFixed(2)}</></td>

              </tr>

            )
          })}

        </table>
      </div> : 
      <div className="d-flex justify-content-center items-center h-full ">
        <img src="https://www.kreuzbergkinder.com/_nuxt/img/search_no.1ddc8c4.jpg" width={600}/><br/>
        {/* <span>No data Availabel</span> */}
        </div>}

    </>





  );
}

export default invoiceDetails;