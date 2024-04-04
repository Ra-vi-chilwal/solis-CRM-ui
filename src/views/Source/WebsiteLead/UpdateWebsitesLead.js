
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
// import user from "../User/user";
function UpdatewebsitesLead(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const id = params.id
  useEffect(() => {
    dispatch(fetchUserApi(token));
  }, [])
  var token = localStorage.getItem("token");
  const location = useLocation();
  const receivedData = location && location.state;


  //role
  const initialValues = {
    lastName:receivedData && receivedData.lastName || "",
    firstName: receivedData && receivedData.firstName || "",
    email: receivedData && receivedData.email || "",
    phone: receivedData && receivedData.phone || "",
    message: receivedData && receivedData.message|| "",
   
   
  };
  const validationSchema = Yup.object({
    
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Last Name is required"),
    message: Yup.string().required("Message is required"),
  });
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/website-lead/update/${id}`,{
        ...values, 
      },
      );
      const userData = response.data;
      if (userData.code == "DUPLICATEDATA") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "User Already Exists",
        });

      }
      if (userData.code == "UPDATED") {
        Swal.fire({
          icon: "success",
          title: "Woh...",
          text: "Lead Updated ",
        });

      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });

    }
  };
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
                        
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="description "
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Message
                            </label>
                            <Field
                              component="textarea"
                              name="message"
                              placeholder="Enter your  Message"
                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="message"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                  
                        {/* Leads */}
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

export default UpdatewebsitesLead;
