import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from '../../config'
import { useDispatch, useSelector } from "react-redux";
import { fetchPlan } from "../../redux/action/plan/plan";
import Swal from 'sweetalert2'
import {  Link, useNavigate, useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';


function addInvoice(props) {


//button
useEffect(() => {
    const button = document.getElementById('invoice-close');
    if (button) {
      button.addEventListener('click', autoClickButton);
    }
    return () => {
      if (button) {
        button.removeEventListener('click', autoClickButton);
      }
    };
  }, []);
  function autoClickButton() {
    const button = document.getElementById('invoice-close');
    if (button) {
      button.click(); // This triggers a click event on the button
    }
  }

    const params = useParams()
    const id = params && params.id

    const navigate = useNavigate()
    var token = localStorage.getItem("token");
    const [durations, setDuration] = useState({})
    const showModal = props && props.showModal;
    const setShowModal = props && props.setShowModal;
    const { loading, userInfo, error } =
        useSelector((store) => store.userInfo) || " ";
    const checkrole = userInfo?.payload?.role?.[0]
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPlan(token));
    }, [])
    const { planInfo } = useSelector((store) => store) || " ";
    const plan = planInfo?.userInfo?.data;
    const initialValues = {
        name: "",
        quantity: "",
        rate: '',
        taxableAmount: "",
        shipTo: "",
        billTo: "",
        leadId:id
    };
    const validationSchema = Yup.object({
        name: Yup.string().required("item Name is required"),
        quantity: Yup.string().required("Quantity is required"),
        rate: Yup.string().required("Rate is required"),
        taxableAmount: Yup.string().required("Taxable Amount is required"),
        shipTo: Yup.string().required("Ship To is required"),
        billTo: Yup.string().required("Bill To is required"),
       
    });
    const onSubmit = async (values) => {
       
        try {
            const response = await axios.post(`${config.API_URL}/invoice/generate`,
                { ...values }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const userData = response.data;

            if (userData.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Woh...',
                    text: 'User Registered ',

                })
                navigate(`/invoice/${id}`)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: error,

            })
            setShowModal(false);
        }
        
    };
    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80">
                <div className="relative w-100 my-6 mx-auto max-w-sm  flex  justify-center">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-75 bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl ">Add Invoice Details</h3>
                            <div className='mt-2 ml-4 '><Link  to={`/invoice/${id}`}><CIcon icon={cilX} size="lg"  className="text-black"/></Link></div>

                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" id="invoice-close" aria-label="Close">
                             </button> */}
                        </div>
                        {/*body*/}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ values, setFieldValue, errors, dirty, isValid }) => {
                                return (
                                    <Form>
                                        <div className="relative p-6 flex-auto">
                                            <div className="-mx-4 flex flex-wrap">
                                                <div className="col-lg-6">
                                                    <label
                                                        htmlFor="name"
                                                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                                                    >
                                                        Product Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder='Product Name'
                                                        className="w-full rounded-md
                               border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    />
                                                    <ErrorMessage
                                                        name="name"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />

                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        htmlFor="quantity"
                                                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                                                    >
                                                        Quantity
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="quantity"
                                                        placeholder='Quantity'
                                                        className="w-full rounded-md
                               border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    />
                                                    <ErrorMessage
                                                        name="quantity"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />

                                                </div>
                                                <div className="col-lg-6 pt-3">
                                                    <label
                                                        htmlFor="rate"
                                                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                                                    >
                                                        Rate
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="rate"
                                                        placeholder='Rate'
                                                        className="w-full rounded-md
                               border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    />
                                                    <ErrorMessage
                                                        name="rate"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />

                                                </div>
                                                <div className="col-lg-6 pt-3">
                                                    <label
                                                        htmlFor="taxableAmount"
                                                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                                                    >
                                                        Taxable Amount
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="taxableAmount"
                                                        placeholder='Taxable Amount'
                                                        className="w-full rounded-md
                               border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    />
                                                    <ErrorMessage
                                                        name="taxableAmount"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />

                                                </div>


                                                <div className="col-lg-6 pt-3">
                                                    <label
                                                        htmlFor="billTo"
                                                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                                                    >
                                                        BILL TO
                                                    </label>
                                                    <Field
                                                        component="textarea"
                                                        name="billTo"
                                                        placeholder='Buyers Details'
                                                        className="w-full rounded-md
                               border border-transparent
                                py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    />
                                                    <ErrorMessage
                                                        name="billTo"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>
                                                <div className="col-lg-6 pt-3">
                                                    <label
                                                        htmlFor="shipTo"
                                                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                                                    >
                                                        SHIP TO
                                                    </label>
                                                    <Field
                                                        component="textarea"
                                                        name="shipTo"
                                                        placeholder='Shiping Details'
                                                        className="w-full rounded-md
                               border border-transparent
                                py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                    />
                                                    <ErrorMessage
                                                        name="shipTo"
                                                        render={(msg) => (
                                                            <small style={{ color: "red" }}>{msg}</small>
                                                        )}
                                                    />
                                                </div>
                                                <div className="w-75 px-4 pt-3 ">
                                                    <button
                                                        className="rounded-md py-2.5 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                                        style={{ background: "#3C4B64" }}
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>

                        {/*footer*/}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}

export default addInvoice;
