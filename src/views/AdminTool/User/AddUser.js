import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
// import user from "../User/user";
function AddUser(props) {
  var token = localStorage.getItem("token");
  const showModal = props && props.showModal;
  const setShowModal = props && props.setShowModal;
  const { companyInfo } = useSelector((store) => store) || " ";
  const company = companyInfo?.userInfo?.data
  const { loading, userInfo, error } =
    useSelector((store) => store.userInfo) || " ";
  const { userApi } =
    useSelector((store) => store) || " ";
  //role
  const { RoleData } =
    useSelector((store) => store) || " ";
  const role = RoleData?.userInfo?.data;
  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    role: "",
    gender: "",
    company: ""
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .required()
      .min(6, "Password is too short -should be 6 chars minimum"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().required("Email is required"),
    lastName: Yup.string().required("Last Name is required"),
    role: Yup.string().required("Role is required"),
    company: Yup.string().required("Role is required"),
  });
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/auth/register`, {
        ...values

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type for file upload
          // Add any other headers you need
        }
      });
      const userData = response.data;

      if (userData.code == "DUPLICATEDATA") {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'User Already Exists',

        })
        setShowModal(false)
      }
      if (userData.code == "CREATED") {
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
      setShowModal(false)
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
              <h3 className="text-xl ">Add User</h3>
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

                return (
                  <Form>
                    <div className="relative p-6 flex-auto">
                      <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="name"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              firstName
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
                              lastName
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
                              htmlFor="password"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              password
                            </label>
                            <Field
                              type="password"
                              name="password"
                              placeholder="Enter your password"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="password"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="gender"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Gender
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="gender"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT GENDER--</option>
                              <option value="male">MALE</option>;
                              <option value="female">FEMALE</option>
                              <option value="other">OTHER</option>
                            </Field>
                            <ErrorMessage
                              name="gender"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="company"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Company
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="company"
                              placeholder="Enter your Company"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT COMPANY--</option>
                              {company?.map((ele) => {
                                return (

                                  <option key={ele._id} value={ele._id}>{ele.company}</option>
                                )
                              })}
                            </Field>
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
                              htmlFor="plan"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Role
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="role"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT ROLE--</option>
                              {role?.map((ele) => {
                                return (
                                  <option key={ele._id} value={ele._id}>{ele.title}</option>
                                )
                              })}
                            </Field>
                            <ErrorMessage
                              name="role"
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

export default AddUser;
