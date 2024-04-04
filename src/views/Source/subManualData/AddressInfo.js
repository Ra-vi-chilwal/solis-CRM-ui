import React from 'react'

function contactInfo() {
  const initialValues ={
    
  }
  return (
    <div>
<div className=" items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80">
        <div className="relative w-100 my-6 mx-auto max-w-sm  flex  ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-100 bg-white outline-none focus:outline-none">
            {/*header*/}
        <h3 className="p-4 text-bolder" style={{fontWeight:"600"}}>Lead Information</h3>
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
                              Lead Owner
                            </label>
                            <Field
                              name="leadOwner"
                              type="text"
                              placeholder="Enter your  First Name"
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
                              htmlFor="leadSource"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Lead Status
                            </label>
                            <Field
                             as='select'
                              type="text"
                              name="leadStatus"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT LEAD STATUS--</option>
                                <option value="none">NONE</option>
                                <option value="attempted-to-contact">Attempted to Contact</option>
                                <option value="warm-lead">Warm Lead</option>
                                <option value="hot-lead">Hot Lead</option>
                                <option value="contact-in-future">Contact in Future</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Junk-lead">Junk Lead</option>
                                <option value="Lost-lead">Lost Lead</option>
                                <option value="not-Contacted">Not Contacted</option>
                                <option value="Pre-Qualified">Pre-Qualified</option>
                                <option value="not-Qualified">Not Qualified</option>
                              
                            </Field>
                            <ErrorMessage
                              name="leadStatus"
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
                            as='select'
                              type="text"
                              name="leadSource"
                              placeholder="Enter your lead Source"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                                <option>--SELECT LEAD SOURCE--</option>
                                <option value="none">NONE</option>
                                <option value="advertisement">Advertisement</option>
                                <option value="coldcall">Cold Call</option>
                                <option value="employeeReferral">Employee Referral</option>
                                <option value="externalReferral">External Referral</option>
                                <option value="onlineStore">Online Store</option>
                                <option value="partner">Partner</option>
                                <option value="publicRelations">Public Relations</option>
                                <option value="justdial">Justdial</option>
                                <option value="google">Google</option>
                                <option value="googleListing">Google Listing</option>
                                <option value="saleEmailAlias">Sales Email Alias</option>
                                <option value="facebookAds">Facebook Ads</option>
                                <option value="instagram">Instagram</option>
                                <option value="websites">websites</option>
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
                              htmlFor="plan"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Are you ready to Run a Business
                            </label>
                            <Field
                            
                              type="text"
                              name="readytoRunBusiness"
                              placeholder="Enter your Business"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                           
                            <ErrorMessage
                              name="readytoRunBusiness"
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
                            Services Enquired
                            </label>
                            <Field
                            
                              type="text"
                              name="servicesEnquired"
                              placeholder="Enter your  Services Enquired"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                           
                            <ErrorMessage
                              name="servicesEnquired"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="whatisyourbudget"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                             What is Your Budget
                            </label>
                            <Field
                            
                              type="text"
                              name="whatisyourbudget"
                              placeholder="Enter your Your Budget"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                           
                            <ErrorMessage
                              name="whatisyourbudget"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="layout"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Layout
                            </label>
                            <Field
                            
                              type="text"
                              name="layout"
                              placeholder="Enter your Layout"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                           
                            <ErrorMessage
                              name="layout"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 flex align-center">
                          <div className="mb-6 flex" style={{alignItems:"center"}}>
                           
                            <Field
                            
                              type="checkbox"
                              name="enquiredFor"
                              placeholder="Enter your enquiredFor"
                              className=" rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                              style={{margin:"12px"}}
                            />
                            <label
                              htmlFor="enquiredFor"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            
                              style={{margin:"16px"}}
                            >
                             Enquired For
                            </label>
                            <ErrorMessage
                              name="enquiredFor"
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
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="firstFollowUp"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                             first FollowUp
                            </label>
                            <Field
                            
                              type="text"
                              name="firstFollowUp"
                              placeholder="Enter your  First Follow Up"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                           
                            <ErrorMessage
                              name="firstFollowUp"
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

    </div>
  )
}

export default contactInfo