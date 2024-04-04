import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import config from '../../../config';

function RejectModal(props) {
  const token = localStorage.getItem('token');
  const leadId = props && props.data;
  // Function to automatically click the button
  useEffect(() => {
    const button = document.getElementById('btn-close');
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
    const button = document.getElementById('btn-close');
    if (button) {
      button.click(); // This triggers a click event on the button
    }
  }

  const initialValues = {
    reasonForRejection: '',
  };

  const validationSchema = Yup.object({
    reasonForRejection: Yup.string().required('Reason is required'),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/leadSource/update/status`, {
        ...values,
        leadId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type for file upload
          // Add any other headers you need
        },
      });

      const userData = response.data;
      if (userData.code === 'SUCCESS') {
        Swal.fire({
          icon: 'success',
          title: 'Woh...',
          text: 'Lead Rejected',
        });
        autoClickButton();
        // setShowModal(false);
      } else if (userData.message === 'Internal server error') {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: userData.error, // Access the error message from the response data
        });
        autoClickButton();
        // setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error.message, // Access the error message from the caught error object
      });
      autoClickButton();
      // setShowModal(false);
    }
  };

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ background: '#ff9595', color: '#0b0a0a' }}>
              <h5 className="modal-title" id="exampleModalLabel">Reason For Rejection</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, errors }) => (
                  <Form>
                    <div className="relative p-6 flex-auto">
                      <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1">
                          <div className="mb-8">
                            {/* <label
                              htmlFor="reasonForRejection"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Reason
                            </label> */}
                            <Field
                              name="reasonForRejection"
                              as="textarea"
                              placeholder="Write Your Reason Here."
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="reasonForRejection"
                              render={(msg) => (
                                <small style={{ color: 'red' }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-75 px-4">
                          <button
                            className="rounded-md py-2.5 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                            style={{ background: '#3C4B64' }}
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RejectModal;
