import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./profile.css";
import config from "../../../config";
import Loader from "../../../Loader";
import CompanyBanner from "../../../CompanyBanner";
function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = `${config.API_URL}/auth/info`;
    // Define your API token
    var token = localStorage.getItem("token") || " "; // Replace with your actual token
    // Configure Axios with the token in headers
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Fetch data from your API endpoint using Axios
    const data = axios
      .get(apiUrl, axiosConfig)
      .then((response) => {
        // Store the fetched data in the state

        setProfileData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!profileData) {
    // Render a loading message or spinner while data is being fetched
    return (
      <>
        <div className="d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      </>
    );
  }
  console.log(profileData,"profile")
  return (
    <div className="main-body mt-4">
      {/* <CompanyBanner/> */}
      {/* Breadcrumb */}
      {/* ... (existing breadcrumb code) */}
      {/* /Breadcrumb */}
      <div className="row gutters-sm pl-4">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body profile-box">
              <div className="d-flex flex-column align-items-center text-center ">
                <div style={{ background: "#1266f1", width: "100%" }}>
                  {/* <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle profile-img"
                    style={{ border: "1px solid grey" }}
                    width={150}

                  /> */}
                  <div className="profile-img">{(profileData.iconText).toUpperCase()}</div>
                </div>
                <br />
                <div className="mt-12">
                  <h3 className="">
                    {/* {profileData && profileData.firstName} {profileData && profileData.lastName} */}

                    {profileData && ((profileData.firstName).charAt(0).toUpperCase() +
                      (profileData.firstName).slice(1))} {profileData && ((profileData.lastName).charAt(0).toUpperCase() +
                        (profileData.lastName).slice(1))}
                  </h3>
                  <p className="text-secondary mb-1">{profileData.role.title}</p><br />
                  <p className="text-muted font-size-sm address font-weight-bold">
                    Solis Technology,<br/>
                     A-14 Road Number S 31A, Gurugram, Haryana 122002
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-md-8">
        
          <div className="card mb-3" style={{fontSize:"13px",fontWeight:"600"}}>
            <div className="card-body">
              <div className="row profile-data"> 
                <div className="col-sm-3">
                  <span className="mb-0">Full Name: </span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {((profileData.firstName).charAt(0).toUpperCase() +
                    (profileData.firstName).slice(1))}   {((profileData.lastName).charAt(0).toUpperCase() +
                      (profileData.lastName).slice(1))}
                </div>
              </div>
              {/* <hr /> */}


              <div className="row profile-data">
                <div className="col-sm-3">
                  <span className="mb-0">Company:</span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.company.company}
                </div>
              </div>
              {/* <hr /> */}
              <div className="row profile-data">
                <div className="col-sm-3">
                  <span className="mb-0">Role:</span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.role.title}
                </div>
              </div>
              {/* <hr /> */}
              <div className="row profile-data"  >
                <div className="col-sm-3">
                  <span className="mb-0">Permissions: </span>
                </div>
                <div className="col-sm-9 text-secondary">
                  <ul>
                    {profileData.role.permission.map((permission, index) => (
                      <li key={permission.value}>{index + 1}. {permission.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <hr />   */}
              <div className="row profile-data" >
                <div className="col-sm-3">
                  <span className="mb-0">Email: </span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.email}
                </div>
              </div>
              {/* ... (other fields) */}
              {/* Render the profile data here */}
            </div>
            {/* <h6 style={{color:"#1266f1",fontWeight:"700"}}>Personal Details:  </h6> */}
            <div className="card-body">
              <div className="row profile-data"> 
                <div className="col-sm-3">
                  <span className="mb-0" >Gender :  </span>
                </div>
                <div className="col-sm-9 text-secondary" style={{color:"#1266f1"}}>
                  {(profileData.gender).charAt(0).toUpperCase() +(profileData.gender).slice(1) }
                  
                </div>
              </div>
              {/* <hr /> 


              {/* <div className="row profile-data">
                <div className="col-sm-3">
                  <span className="mb-0">Company:</span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.company.company}
                </div>
              </div> */}
              {/* <hr /> */}
              {/* <div className="row profile-data">
                <div className="col-sm-3">
                  <span className="mb-0">Role:</span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.role.title}
                </div>
              </div> */}
              {/* <hr /> */}
              {/* <div className="row profile-data"  >
                <div className="col-sm-3">
                  <span className="mb-0">Permissions: </span>
                </div>
                <div className="col-sm-9 text-secondary">
                  <ul>
                    {profileData.role.permission.map((permission, index) => (
                      <li key={permission.value}>{index + 1}. {permission.label}</li>
                    ))}
                  </ul>
                </div>
              </div> */}
              {/* <hr />   */}
              {/* <div className="row profile-data" >
                <div className="col-sm-3">
                  <span className="mb-0">Email: </span>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.email}
                </div>
              </div> */}
              {/* ... (other fields) */}
              {/* Render the profile data here */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
