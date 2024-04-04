import React from "react";
import companyBanner from '../src/assets/images/DeS-logo.png';

function CompanyBanner() {
  const bannerStyle = {
    display: "flex",
    alignItems: "center",
    background: "rgb(7 23 57)",
    color: "#fff",
    padding: "20px"
  };

  const logoStyle = {
    width: "150px",
    height: "150px",
    border: "5px solid #fff",
    borderRadius: "80%"
  };

  const infoStyle = {
    textAlign: "center"
  };

  return (
    <div style={bannerStyle}>
      {/* Background Image */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Company Logo */}
        <img
          src={companyBanner}
          alt="Company Logo"
          style={logoStyle}
          className="img-fluid rounded-circle p-4"
        />
      </div>
      {/* Company Name and Slogan */}
      <div style={infoStyle}>

        <br />
        <h1 className="slogan" style={{fontSize:"24px"}}>Decode CRM: "Where Sales Meet Success"</h1>
      </div>
    </div>
  );
}

export default CompanyBanner;
