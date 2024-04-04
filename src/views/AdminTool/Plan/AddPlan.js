import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from '../../../config'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
function AddPlan(props) {
  var token = localStorage.getItem("token");
  const showModal = props && props.showModal;
  const setShowModal = props && props.setShowModal;
  const { loading, userInfo, error } = useSelector(store => store.userInfo);
const companyId = userInfo?.payload?.company
  const initialValues = {
    planName:"" ,
    price: "",
    Duration: "",
    company :companyId
  };

  const validationSchema = Yup.object({
    planName: Yup.string().required("plan Name is required"),
    price: Yup.string().required("price is required"),
    Duration: Yup.string().required("Duration is required"),
  });
  const onSubmit = async (values) => {
   try {
    const response = await axios.post(`${config.API_URL}/plan/add`,
    {...values},{headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
   },});
    const userData = response.data;
    if(userData.code == "DUPLICATEDATA"){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'User Already Exists',

      })
      setShowModal(false)
    }
    if(userData.code == "CREATED"){
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
              <h3 className="text-xl ">Add Plan</h3>
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
                              htmlFor="planName"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Plan Name
                            </label>
                            <Field
                              name="planName"
                              type="text"
                              placeholder="Enter your  plan Name "
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="planName"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="price"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Price ($)
                            </label>
                            <Field
                              name="price"
                              type="number"
                              placeholder="Enter your Title"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="price"
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
                              Duration
                            </label>
                            <Field
                           
                              type="number"
                              name="Duration"
                             
                              placeholder='Enter your Duration'
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                         
                            <ErrorMessage
                              name="Duration"
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

export default AddPlan;
