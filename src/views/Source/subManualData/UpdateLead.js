import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
// import user from "../User/user";
function UpdateLead(props) {
  //permissions 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserApi(token));
  }, [])

  //
  const [data, setData] = useState([]);
  var token = localStorage.getItem("token");
  const location = useLocation();
  const params = useParams()
  const LeadId = params.id
  const receivedData = location && location.state;

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
  const navigate = useNavigate();
  //role
  const { RoleData } = useSelector((store) => store) || " ";
  const role = RoleData?.userInfo?.data;
  const userPermission = userInfo && userInfo.payload && userInfo.payload && userInfo.payload.role[0]?.permission
  const id = receivedData && receivedData._id;
  const initialValues = {
    leadOwner: receivedData && receivedData.leadCreatedBy && receivedData.leadCreatedBy.firstName || "",
    lastName: receivedData && receivedData.lastName || "",
    firstName: receivedData && receivedData.firstName || "",
    email: receivedData && receivedData.email || "",
    phone: receivedData && receivedData.phone || "",
    leadType: receivedData && receivedData.leadType || "",
    leadSource: receivedData && receivedData.leadSource || "",
    budget: receivedData && receivedData.budget || "",
    date: receivedData && receivedData.date || "",
    time: receivedData && receivedData.time || "",
    state: receivedData && receivedData.state || "",
    city: receivedData && receivedData.city || "",
    country: receivedData && receivedData.country || "",
    description: receivedData && receivedData.description || "",
    assignedManager: receivedData && receivedData.users && receivedData.users.filter((ele) => ele.role == "TM1" && ele.leadStatus != "REJECTED").map((item) => item.id)[0]?._id || "",
    alternateManager: receivedData && receivedData.users && receivedData.users.filter((ele) => ele.role == "TM2" && ele.leadStatus != "REJECTED").map((item) => item.id)[0]?._id || "",
    assignedLead: receivedData && receivedData.users && receivedData.users.filter((ele) => ele.role == "RM1" && ele.leadStatus != "REJECTED").map((item) => item.id)[0]?._id || "",
    // assignedLead : receivedData && receivedData.users,
    alternateLead: receivedData && receivedData.users && receivedData.users.filter((ele) => ele.role == "RM2" && ele.leadStatus != "REJECTED").map((item) => item.id)[0]?._id || "",
    reminderCall: receivedData && receivedData.reminderCall && receivedData.reminderCall.substring(0, 16) || "",
    company: companyData,
    followUpInfo: receivedData && receivedData.followUpInfo && receivedData.followUpInfo.length > 0 ? receivedData.followUpInfo : [{
      subject: receivedData && receivedData.subject || "none",
      targetTime: receivedData && receivedData.targetTime || "",
      targetDate: receivedData && receivedData.targetDate || "",
      purpose: receivedData && receivedData.purpose || "",
      notes: receivedData && receivedData.notes || "",
      location: receivedData && receivedData.location || "",
      completionTime: receivedData && receivedData.completionTime || "",
      completionDate: receivedData && receivedData.completionDate || "",

    }],
  };


  const validationSchema = Yup.object({
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Last Name is required"),
    leadSource: Yup.string().required("Lead Source is required"),
  });
  // All exists
  const expectedValues = ["read", 'create'];
  const expectedManager = ["read", "create", "update"];
  const expectedAdmin = ["read", "create", "update", 'delete'];
  // sort the data for Admin
  const sortExpectedAdmin = expectedAdmin.slice().sort()
  const sortExpectedManager = expectedManager.slice().sort()
  const sortedUserPermissions = userPermission.map(permission => permission.value).sort();
  const compairedAdmin = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortExpectedAdmin);
  // sort the data for Manager
  const compairedManager = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortExpectedManager);
  let targetTime = new Date(Date.now() + 60 * 60 * 1000);
  var today = new Date(Date.now() + 60 * 60 * 1000);
  const onSubmit = async (values, errors) => {
    try {
      const leadUpdateData = {
        ...values,
        users: compairedAdmin
          ? [
            {
              id: values.assignedManager,
              targetTime: targetTime,
              currentUser: true,
              reasonForRejection: null,
              leadStatus: "PENDING",
              role: "TM1",
            },
            {
              id: values.alternateManager,
              targetTime: null,
              currentUser: false,
              reasonForRejection: null,
              leadStatus: "PENDING",
              role: "TM2",
            },
          ]
          : compairedManager
            ? [
              {
                id: values.assignedLead,
                targetTime: targetTime,
                currentUser: true,
                reasonForRejection: null,
                leadStatus: "PENDING",
                role: "RM1",
              },
              {
                id: values.alternateLead,
                targetTime: null,
                currentUser: false,
                reasonForRejection: null,
                leadStatus: "PENDING",
                role: "RM2",
              },
            ]
            : [],
      };

      const response = await axios.patch(
        `${config.API_URL}/leadSource/update/info/${id}`,
        leadUpdateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userData = response.data;
      if (userData.message === "Lead updated successfully") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Lead Updated",
        });
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message || "An error occurred",
      });
      navigate(-1);
    }
  };
  //update API
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
  // filter for option field .
  return (
    <div>
      <div className=" items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80">
        <div className="relative w-100 my-6 mx-auto max-w-sm  flex  ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-100 bg-white outline-none focus:outline-none">
            {/*header*/}
            <h3 className="p-4 text-bolder" style={{ fontWeight: "600" }}>
              Lead Information
            </h3>
            {/*body*/}
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            // initialValues={{ friends: ['jared', 'ian', 'brent'] }}
            >
              {({ values, setFieldValue, errors, dirty, isValid }) => {

                return (
                  <Form>
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
                              type="text"
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
                              <option value="cold-call">Cold Lead</option>
                              <option value="employee-referral">Employee Referral</option>
                              <option value="web-download">
                                Web Download
                              </option>
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
                        {/* Leads */}
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
                              htmlFor="name"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"

                            >
                              Lead Owner
                            </label>
                            <Field
                              name="leadOwner"
                              type="text"
                              disabled
                              placeholder="Enter your  Lead Owner Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="leadOwner"
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
                              placeholder="Enter your Country"
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



                        <div className="w-full">
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

                        { }
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
                                                physical Meeting
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                              </Field>
                                             
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
                        {/* //*/}

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

      {/* -------------------- */}
    </div>
  );
}

export default UpdateLead;
