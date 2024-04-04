import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FacebookTable from "./FacebookTable";
import config from "../../../config";
import { useSelector } from "react-redux";
const GetFacebookLead = () => {
  const [adSets, setAdSets] = useState([]);
  const [campignId, setCampignId] = useState("");
  const [finalData, setFinalData] = useState("");
  const initialValues = {
    campignLeadId: JSON.parse(localStorage.getItem('campaign')), // Set your initial value for leadId here
  };
  const { loading, userInfo, error } = useSelector((store) => store.userInfo) || " ";
  const userPermission = userInfo && userInfo.payload && userInfo.payload && userInfo.payload.role[0]?.permission;
  const expectedAdmin = ["read", "create", "update", 'delete'];
  // sort the data for Admin
  const sortExpectedAdmin = expectedAdmin.slice().sort()
  const sortedUserPermissions = userPermission.map(permission => permission.value).sort();
  const compairedAdmin = JSON.stringify(sortedUserPermissions) === JSON.stringify(sortExpectedAdmin);
  const validationSchema = Yup.object({
    campignLeadId: Yup.string().required("Lead Id is required"),
  });
  var token = localStorage.getItem("token");
  useEffect(() => {   
    const fetchFbCampaign = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/leadSource/fetch/campaign`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        );
        const adSetsData = response.data.data;
        console.log(adSetsData, 'fata')
        setAdSets(adSetsData);
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
      }
    };
    fetchFbCampaign();
  }, []);

  //try

  const [dataItem, setDataItem] = useState('')
  const onSubmit = async (values) => {
    localStorage.setItem('campaign', JSON.stringify(values.campignLeadId));
    const items = JSON.parse(localStorage.getItem('campaign'));
    setDataItem(items)
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("dataItem")
      try {
        const response = await axios.post(
          `${config.API_URL}/leadSource/fetch/campaign/leads`,
          { campignLeadId: JSON.parse(localStorage.getItem('campaign')) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              // Add any other headers you need
            },
          }
        );
        setFinalData(response.data.data);
      } catch (error) {
        console.error("Error fetching ads:", error.message);
      }
    };

    fetchData(); // Call the async function here

  }, [adSets, dataItem]); // Add 'items' as a dependency if needed
  
  return (
<>
  <div className="pt-5">

{compairedAdmin?
<div>
      <h4>Select Campaign</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, dirty, isValid }) => {

          return (
            <div className="col-lg-8">
              <Form className="d-flex">
                {/* ... Rest of your code ... */}
                <div>
                  <Field
                    as="select"
                    name="campignLeadId"
                    placeholder="Enter your lead Source"
                    className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                 text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                 focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setCampignId(selectedValue);
                      setFieldValue("campignLeadId", selectedValue); // Set the value in Formik state
                    }}
                  >
                    <option>--SELECT CAMPAIGNS--</option>
                    {adSets &&
                      adSets.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                          {ele.name}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="campignLeadId"
                    render={(msg) => (
                      <small style={{ color: "red" }}>{msg}</small>
                    )}
                  />
                </div>
                <div className=" px-4">
                  <button
                    className="rounded-md py-2.5
                             px-9 text-base font-medium text-white
                              transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    style={{ background: "#3C4B64" }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
      </div>
      :""}
      <FacebookTable finalData={finalData} />
    </div>
    </>
  );
};

export default GetFacebookLead;
