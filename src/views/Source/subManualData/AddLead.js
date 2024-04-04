import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import RejectModal from "./RejectLeadModal";
import Button from '@mui/material/Button';

function AddLead(props) {
  var token = localStorage.getItem("token");
  const showModal = props && props.showModal;
  const setShowModal = props && props.setShowModal;
  const { companyInfo } = useSelector((store) => store) || " ";
  const company = companyInfo?.userInfo?.data;
  const { loading, userInfo, error } = useSelector((store) => store.userInfo) || " ";
  const companyData = userInfo?.payload?.company
  const { userApi } = useSelector((store) => store) || " ";
  const userDetails = userApi?.userInfo?.data;
  const companyId = userInfo?.payload?.company;
  const filterUser = userDetails && userDetails.filter((ele) => {
    return ele.company._id === companyId;
  });

  const expectedManager = ["read", "create", "update"];
  const expectedValues = ["read"];
  //role
  const { RoleData } = useSelector((store) => store) || " ";
  const role = RoleData?.userInfo?.data;
  const initialValues = {

    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    leadType: "",
    leadSource: "",
    budget: "",
    date: "",
    time: "",
    state: "",
    city: "",
    country: "",
    description: "",
    assignedManager: "",
    alternateManager: "",
    product:"",
    company: companyData,
    followUpInfo: [{
      subject: "",
      targetTime: "",
      targetDate: new Date().toLocaleDateString('en-GB'),
      purpose: "",
      notes: "",
      location: "",
      completionTime: "",
      completionDate: new Date().toLocaleDateString('en-GB'),

    }],
  };
  const validationSchema = Yup.object({
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    leadSource: Yup.string().required("Lead Source is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    description: Yup.string().required("Description is required"),
  });
  const expectedAdmin = ["read", "create", "update", 'delete'];
  const userPermission = userInfo && userInfo.payload && userInfo.payload && userInfo.payload.role[0]?.permission;
  const inputFieldForManager =
    userPermission.length === expectedAdmin.length &&
    userPermission.every(perm => expectedAdmin.includes(perm.value));
  const inputfiledforLead = userPermission.every((perm, index) => perm.value === expectedManager[index]) && userPermission.length === expectedManager.length;
  const onSubmit = async (values) => {
    let targetTime = new Date(Date.now() + 60 * 60 * 1000);

    try {
      const response = await axios.post(`${config.API_URL}/leadSource/add`, {
        ...values,
        ...(inputFieldForManager === true
          ? {
            users: [
              {
                "id": values.assignedManager,
                "targetTime": targetTime,
                "currentUser": true,
                "reasonForRejection": null,
                "role": "TM1"
              },
              {
                "id": values.alternateManager,
                "targetTime": targetTime,
                "currentUser": false,
                "reasonForRejection": null,
                "role": "TM2"
              }
            ]
          }
          : {})
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type for file upload
          // Add any other headers you need
        },
      });

      const userData = response.data;

      if (userData.code == "DUPLICATEDATA") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "User Already Exists",
        });
        setShowModal(false);
      } else if (userData.code == "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Woh...",
          text: "Lead Registered ",
        });
        setShowModal(false);
      } else if (userData.code == "ERROROCCURED") {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: userData.error, // Access the error message from the response data
        });
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.message, // Access the error message from the caught error object
      });
      setShowModal(false);
    }
  }

  //Product Get Api
  const [response,setResponse] = useState([])
  const [lead,setLead] = useState(0)
useEffect( ()=>{
  const fetchData = async () => {
      try {
          const response = await axios.get(`${config.API_URL}/product/fetch`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }) 
            setResponse(response.data.data )
            setLead(lead+1)
      } catch (error) {
          console.log(error)
      }
  }
  fetchData();
},[lead])
  return (
    <div style={{ background: "" }}>
      <div className=" items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80">
        <div className="relative w-100 my-6 mx-auto max-w-sm  flex  ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-100 bg-white outline-none focus:outline-none">
            {/*header*/}
            <h3 className="p-4 text-bolder" style={{ fontWeight: "600", background: "" }}>
              Lead Information
            </h3>
            {/*body*/}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, errors, dirty, isValid }) => {
                return (
                  <Form style={{ background: "" }}>
                    <div className="relative p-6 flex-auto">
                      <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1/2">

                          <div className="mb-8">
                            <label
                              htmlFor="firstName"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              First Name
                            </label>
                            <Field
                              name="firstName"
                              type="text"
                              placeholder="Enter your  First Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="firstName"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="lastName"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Last Name
                            </label>
                            <Field
                              name="lastName"
                              type="text"
                              placeholder="Enter your  Last Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="lastName"
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
                              Email
                            </label>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Enter your Email"
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
                              htmlFor="phone"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Phone
                            </label>
                            <Field
                              type="number"
                              name="phone"
                              placeholder="Enter your phone"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="phone"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        {/* project */}
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="phone"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Product Name
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="product"
                              placeholder="Enter your Product Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                                          <option>--SELECT PRODUCT--</option>
                                  {response && response.map((ele) => {

                                    return (
                                      <>
                                        <option value={ele.slug}>{(ele.name).charAt(0).toUpperCase() + ele.name.slice(1)} </option>
                                      </>
                                    )
                                  })}
                              </Field>
                            <ErrorMessage
                              name="product"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="budget"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              What is Your Budget
                            </label>
                            <Field
                              type="text"
                              name="budget"
                              placeholder="Enter your Your Budget"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="budget"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        {/* {inputFieldForManager ?
                          <>
                            <div className="w-full px-4 md:w-1/2">
                              <div className="mb-8">
                                <label
                                  htmlFor="assignedManager"
                                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                >
                                  Team Leader
                                </label>
                                <Field
                                  as="select"
                                  type="text"
                                  name="assignedManager"
                                  placeholder="Enter your lead Source"
                                  className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                >
                                  <option>--SELECT TEAM LEADER--</option>
                                  {filterUser && filterUser.filter(item => item && item.role && item.role.permission.every((prem, index) => prem.value === expectedManager[index]) && item?.role?.permission.length === expectedManager.length).map((ele) => {

                                    return (
                                      <>
                                        <option value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                      </>
                                    )
                                  })}
                                </Field>

                                <ErrorMessage
                                  name="assignedManager"
                                  render={(msg) => (
                                    <small style={{ color: "red" }}>{msg}</small>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                              <div className="mb-8">
                                <label
                                  htmlFor="alternateManager"
                                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                >
                                  Alternate Team Leader
                                </label>
                                <Field
                                  as="select"
                                  type="text"
                                  name="alternateManager"
                                  style={{ background: values.assignedManager == "" || null ? "#d8caca" : "" }}
                                  disabled={values.assignedManager == "" || null}
                                  placeholder="Enter your lead Source"
                                  className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                >
                                  <option>--SELECT TEAM LEADER--</option>
                                  {filterUser && filterUser.filter(item => item?.role?.permission.every((perm, index) => perm.value === expectedManager[index]) && item?.role?.permission.length === expectedManager.length && values.assignedManager !== item._id).map((ele) => {

                                    return (
                                      <>
                                        <option value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                      </>
                                    )
                                  })}
                                </Field>
                              </div>
                            </div>
                          </>
                          : ""} */}

                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="leadType"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Lead Status
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="leadType"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT LEAD STATUS--</option>
                              <option value="none">NONE</option>
                              <option value="attempted-to-contact">
                                Attempted to Contact
                              </option>
                              <option value="cold-lead">Cold Lead</option>
                              <option value="warm-lead">Warm Lead</option>
                              <option value="hot-lead">Hot Lead</option>
                              <option value="contact-in-future">
                                Contact in Future
                              </option>
                              <option value="Contacted">Contacted</option>
                              <option value="Junk-lead">Junk Lead</option>
                              <option value="Lost-lead">Lost Lead</option>
                              <option value="not-Contacted">
                                Not Contacted
                              </option>
                              <option value="Pre-Qualified">
                                Pre-Qualified
                              </option>
                              <option value="not-Qualified">
                                Not Qualified
                              </option>
                              <option value="client">
                                Closed (Client)
                              </option>
                            </Field>

                            <ErrorMessage
                              name="leadType"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="leadSource"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Lead Source
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="leadSource"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT LEAD SOURCE--</option>
                              <option value="none">NONE</option>
                              <option value="advertisement">
                                Advertisement
                              </option>
                              <option value="facebook">facebook</option>
                              <option value="employee-ref">Employee Referral</option>
                              <option value="web-referal">Web Referal</option>
                              <option value="google">Google</option>
                              <option value="linkdin">Linkdin</option>
                              <option value="just-dial">
                                Justdial
                              </option>
                              <option value="other">
                                Other
                              </option>
                            </Field>

                            <ErrorMessage
                              name="leadSource"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>



                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="date"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              date
                            </label>
                            <Field
                              type="date"
                              name="date"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="date"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="time"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Time
                            </label>
                            <Field
                              type="time"
                              name="time"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="time"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        <div className="w-full  ">
                          {" "}
                          <h3
                            className="p-4 text-bolder"
                            style={{ fontWeight: "600" }}
                          >
                            Address Information
                          </h3>{" "}
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8 pt-2">
                            <label
                              htmlFor="state"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              State
                            </label>
                            <Field
                              type="text"
                              name="state"
                              placeholder="Enter your  state"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="state"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="city"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              City
                            </label>
                            <Field
                              type="text"
                              name="city"
                              placeholder="Enter your  city"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="city"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="country"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Country
                            </label>
                            <Field
                              type="text"
                              name="country"
                              placeholder="Enter your  Country"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="country"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        <div className="w-full px-4">
                          <div className="mb-8">
                            <fieldset> <h3
                              className="p-4 text-bolder"
                              style={{ fontWeight: "600" }}
                            >
                              Meeting Information
                            </h3>{" "}
                              <FieldArray
                                name="followUpInfo"
                                render={arrayHelpers => (
                                  <>
                                    <div className="col d-flex justify-content-end">
                                      <div className="mt-4 mb-3">
                                        {values.followUpInfo &&
                                          values.followUpInfo.length >= 0 ? (
                                          <>
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-primary"
                                              style={{ marginRight: "4px", background: "green", border: "1px solid green" }}
                                              onClick={() =>
                                                arrayHelpers.remove("")
                                              } // remove a contact from the list
                                            >
                                              -
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-success"
                                              style={{ color: "white", background: "blue" }}
                                              onClick={() =>
                                                arrayHelpers.push("")
                                              } // insert an empty contact
                                            >
                                              +
                                            </button>
                                          </>
                                        ) :
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-success"
                                            style={{ background: "green", color: "white" }}
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                          >
                                            {/* show this when user has removed all contacts from the list */}
                                            +
                                          </button>
                                        }
                                      </div>
                                    </div>
                                    {values && values.followUpInfo && values.followUpInfo.map((followUpInfo, index) => {

                                      return (
                                        <div className="grid grid-cols-12 col-span-12 gap-2">
                                          <div className="row">
                                            <div className="col-4 mb-2">

                                              <label
                                                htmlFor="subject"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Subject
                                              </label>
                                              <Field
                                                as="select"
                                                type="text"
                                                name={`followUpInfo.${index}.subject`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Meeting Subject"
                                              >
                                                <option>--SELECT METTING TYPE--</option>
                                                <option value="none">None</option>
                                                <option value="Call">
                                                  Call
                                                </option>
                                                <option value="virtual_meeting">
                                                  Virtual Meeting
                                                </option>
                                                <option value="physical_meeting">
                                                  Phycial Meeting
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                              </Field>
                                              {/* <ErrorMessage
                                                name={`followUpInfo.${index}.subject`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              /> */}
                                            </div>

                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="targetDate"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Target Date
                                              </label>
                                              <Field
                                                id="targetDate"
                                                type="date"
                                                name={`followUpInfo.${index}.targetDate`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Meeting Date"
                                                pattern="\d{2}-\d{2}-\d{4}"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.targetDate`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="targetTime"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Target Time
                                              </label>
                                              <Field
                                                id="targetTime"
                                                type="time"
                                                name={`followUpInfo.${index}.targetTime`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Meeting Date"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.targetTime`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="purpose"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Meeting Purpose
                                              </label>
                                              <Field
                                                id="purpose"
                                                type="text"
                                                name={`followUpInfo.${index}.purpose`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Meeting Purpose"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.purpose`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="notes"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Notes
                                              </label>
                                              <Field
                                                id="notes"
                                                type="text"
                                                name={`followUpInfo.${index}.notes`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Notes"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.notes`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="location"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Meeting Location
                                              </label>
                                              <Field
                                                id="location"
                                                type="text"
                                                name={`followUpInfo.${index}.location`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Meeting Location"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.location`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="location"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Completion Time
                                              </label>
                                              <Field
                                                id="completionTime"
                                                type="time"
                                                name={`followUpInfo.${index}.completionTime`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Meeting Date"
                                                pattern="\d{2}-\d{2}-\d{4}"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.completionTime`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="col-4 mb-2">
                                              <label
                                                htmlFor="completionDate"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Completion Date
                                              </label>
                                              <Field
                                                id="completionDate"
                                                type="date"
                                                name={`followUpInfo.${index}.completionDate`}
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                placeholder="Completion Date"
                                                pattern="\d{2}-\d{2}-\d{4}"
                                              />
                                              <ErrorMessage
                                                name={`followUpInfo.${index}.completionDate`}
                                                render={(msg) => (
                                                  <div
                                                    style={{ color: "red" }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              />
                                            </div>
                                            <div className="w-full px-4 md:w-1/2">
                                              <div className="mb-8">
                                                <label
                                                  htmlFor="subject"
                                                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                                >
                                                  Meeting Highlights
                                                </label>
                                                <Field
                                                  component="textarea"
                                                  name={`followUpInfo.${index}.subject`}
                                                  placeholder="About Meeting"
                                                  className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                        text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                        focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                />
                                                <ErrorMessage
                                                  name={`followUpInfo.${index}.subject`}
                                                  render={(msg) => (
                                                    <small style={{ color: "red" }}>{msg}</small>
                                                  )}
                                                />
                                              </div>
                                            </div>


                                          </div>
                                        </div>
                                      )

                                    })
                                    }
                                  </>
                                )}
                              />
                            </fieldset>
                          </div>
                        </div>




                        <div className="w-full  ">
                          {" "}
                          <h3
                            className="p-4 text-bolder"
                            style={{ fontWeight: "600" }}
                          >
                            Description Information
                          </h3>{" "}
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="description "
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Description
                            </label>
                            <Field
                              component="textarea"
                              name="description"
                              placeholder="Enter your  Description"
                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="description"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>


                        {/* //*/}

                        <div className="w-75 px-4">
                          {/* <button
                            className="rounded-md py-2.5
                             px-9 text-base font-medium text-white
                              transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                            style={{ background: "#3C4B64" }}
                            type="submit"
                          >
                            Submit
                          </button> */}
                          <Button variant="contained" type="submit" className="my-3"  > Submit</Button>

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

      {/* -------------------- */}
    </div>
  );
}

export default AddLead;
