import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from '../../../config'
import { useDispatch, useSelector } from "react-redux";
import { fetchPlan } from "../../../redux/action/plan/plan";
import Swal from 'sweetalert2'
function AddRole(props) {
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
    company: "",
    email: "",
    plan: '',
    PurchasedOn: "",
    companyLogo: "",
    expireOn: "",
    GSTIN:"",
    address:""
  };
  const validationSchema = Yup.object({
    company: Yup.string().required("company is required"),
    email: Yup.string().required("email is required"),
    plan: Yup.string().required("plan is required"),
    PurchasedOn: Yup.string().required("PurchasedOn is required"),
    GSTIN: Yup.string().required("GSTIN is required"),
    address: Yup.string().required("GSTIN is required"),
  });
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/company/add`,
        { ...values, companyLogo: selected }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
          // Add any other headers you need
        }
      });
      const userData = response.data;
      console.log(userData)
      if (userData.code == "DUPLICATION") {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Company Already Exists',

        })
        setShowModal(false)
      }
      if (userData.code == "SUCCESS") {
        Swal.fire({
          icon: 'success',
          title: 'Woh...',
          text: 'User Registered ',

        })
        setShowModal(false)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error,

      })
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
              <h3 className="text-xl ">Add Company</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none  outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, errors, dirty, isValid }) => {

                const selectedDate = new Date(values?.PurchasedOn);
                const futureDate = new Date(selectedDate.getTime() + 365 * 24 * 60 * 60 * 1000);

                const formattedDate = `${futureDate.getDate().toString().padStart(2, "0")}-${(futureDate.getMonth() + 1).toString().padStart(2, "0")}-${futureDate.getFullYear().toString().padStart(4, "0")}`;
                return (
                  <Form>
                    <div className="relative p-6 flex-auto">
                      <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="company"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Company Name
                            </label>
                            <Field
                              name="company"
                              type="text"

                              placeholder="Enter your  Company Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="company"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="email"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              company Email
                            </label>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Enter Company Email"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="email"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="GSTIN"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                             Company GST Number
                            </label>
                            <Field
                              name="GSTIN"
                              type="text"

                              placeholder="Enter your company GST Number"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="GSTIN"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="address"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Company Address
                            </label>
                            <Field
                              name="address"
                              type="text"

                              placeholder="Enter your  Company Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="address"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="plan"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Plan
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="plan"

                              placeholder='Enter your Plan'
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option >--SELECT PLAN--</option>

                              {plan && plan.map((item) => {

                                return (

                                  <option key={item._id} value={item._id} >{item.planName}</option>

                                )
                              })}


                            </Field>
                            <ErrorMessage
                              name="plan"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="PurchasedOn"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              PurchasedOn
                            </label>
                            <Field
                              type="date"
                              name="PurchasedOn"
                              onChange={(e) => {
                                const expireOn = e.target.value
                                setFieldValue("PurchasedOn", e.target.value);
                                setFieldValue(
                                  "expireOn",
                                  new Date(
                                    new Date(expireOn).getTime() +
                                    365 * 24 * 60 * 60 * 1000
                                  ).toISOString()
                                    .toString()
                                    .substring(0, 10)
                                );
                              }}

                              placeholder='PurchasedOn date'
                              className="w-full rounded-md
                               border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="PurchasedOn"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              ExpireOn
                            </label>
                            <Field
                              type="text"
                              name="expireOn"
                              value={formattedDate}
                              defaultValue='dk'
                              disabled={true}
                              placeholder={formattedDate}
                              style={{ background: "#3a353d3d" }}
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="companyLogo"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              Company Logo
                            </label>
                            <Field
                              id="pdfFile"
                              type="file"
                              name="pdfFile"
                              className="form-control pt-1"
                              onChange={(e, element, param) => {
                                if ((element = e.target.files[0])) {
                                  setSelected(element);
                                } else {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Error",
                                    text: "Something went wrong",
                                    focusConfirm: true,
                                    toast: true,
                                    width: "450px",
                                  }).then(function () {
                                    navigate(0);
                                  });
                                }
                              }}
                            />
                            <ErrorMessage
                              name="companyLogo"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        <div className="w-75 px-4">
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

export default AddRole;
