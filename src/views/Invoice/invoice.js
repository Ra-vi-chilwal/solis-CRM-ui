import React, { useRef } from "react";
import solisTech from '../../assets/images/SoliTech-Logo-01.png'
import { PDFExport } from '@progress/kendo-react-pdf';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from "../../config";

function invoice() {
    var token = localStorage.getItem("token");
    const location = useLocation()

    const data = location.state;
  
    // console.log(data,"location")
    useEffect(() => {
        // const location = useLocation()
        // const data = location.state;
    }, [location])
    
    const [dailydata, setDailyData] = useState([])
    const pdfExportComponent = useRef(null);
    const currentDate = new Date();
    const handleDownloadPDF = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <>
            <p className="d-flex align-items-center justify-content-end"><button className="btn btn-info text-light " onClick={handleDownloadPDF}><i class="bi bi-printer-fill m-1"></i>Download PDF</button></p>
            <PDFExport
                ref={pdfExportComponent}
                paperSize="A3"
                fileName="invoice.pdf"
                landscape={false}
            >
                <div className="invoice px-5">
                    <div className="d-flex justify-content-between ">
                        <img src={solisTech} className="img-fluid" style={{ width: "14%" }} />

                    </div>
                    <div className="d-flex justify-content-between flex-column">
                        <div style={{fontSize:"13px"}}>
                            <p ><strong>INVOICE : {data && data.invoiceNumber}</strong></p>
                        <div style={{ fontSize: "13px" }}>
                            <p ><strong>INVOICE : {data && data.invoiceNumber}</strong></p>
                            <p>Solis Technology Private Limited</p>
                        </div>
                        <div>
                            <p className="align-items" style={{ fontSize: "13px" }}><strong>TAX VOICE</strong></p>
                        </div>

                    </div>
                    <div className="d-flex justify-content-between pt-3">
                        <div style={{ fontSize: "13px" }}>
                            <p><strong>supplier Details :</strong></p>
                            <p>A-24/14,First Floor,DLF Phase-1,<br />Golf Course Road,Gurugram,Haryana</p>
                            <p>GSTIN #.06ABACS8546F1Z9</p>

                        </div>
                        <div>
                            <p style={{fontSize:"13px"}}><strong>Date :</strong> {data && data.invoiceDate}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between pt-3">
                        <div style={{ fontSize: "13px" }}>
                            <p><strong>Bill To (Buyers) :</strong></p>
                            <p><strong>{data && data.billTo}</strong></p>
                            <p></p>

                        </div>
                        <div style={{ fontSize: "13px" }}>
                            <p><strong>SHIP TO</strong></p>
                            <p><strong>{data && data.shipTo}</strong></p>
                        </div>
                        <div></div>

                    </div>

                    <div className="pt-5" style={{ fontSize: "13px" }}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Item Description</th>

                                    <th scope="col">QTY</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Taxable Amount</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{data && data.items.sNo}</th>
                                    <td>{ data && data.items.name}</td>
                                    <td>{ data && data.items.quantity}</td>
                                    <td>{ data && data.items.rate}</td>
                                    <td>{ data && data.items.taxableAmount}</td>
                                    <td>{ data && data.items.rate}</td>
                                </tr>

                            </tbody>
                        </table>
                        <hr />
                        <div className="d-flex justify-content-end px-4" style={{ fontSize: "13px" }}>

                            <div className="px-4">
                                <p scope="row">IGST { data && data.igstPercent}%</p>
                                <p scope="row">CGST { data && data.cgstPercent}%</p>
                                <p scope="row">SGST { data && data.sgstPercent}%</p>
                                <p scope="row">Grand Total</p>

                            </div>
                            <div className="px-4">
                                <p scope="row">₹{ data && data.igstAmount.toFixed(2)} rupees</p>
                                <p scope="row">₹ { data && data.cgstAmount.toFixed(2)} rupees</p>
                                <p scope="row">₹ { data && data.sgstAmount.toFixed(2)} rupees</p>
                                <p scope="row">₹ { data && data.grandTotal.toFixed(2)} rupees</p>

                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-between pt-5" style={{ fontSize: "13px" }}>
                        <p><strong>THANK YOU FOR BUSINESS !</strong></p>
                        <div className="text-align-center">
                            <p><strong>For SolisTechnology Private Limited</strong></p>
                            <br />
                            <p><strong>Authorised Signatory</strong></p>
                        </div>
                    </div>

                </div>
                </div>
            </PDFExport>
        </>
    )
}
export default invoice;