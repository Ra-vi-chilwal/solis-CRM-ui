import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../config";
import PiechartProject from './PiechartProject';

export default function Modal() {
  var token = localStorage.getItem("token");
  const [productName, setProductName] = useState(""); // State to capture product name
  const [selectedFiles, setSelectedFiles] = useState(null); // State to capture selected files

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFormSubmit = async () => {
    if (!selectedFiles || !productName) {
      // Check if files and product name are selected
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    formData.append('name', productName); // Append the product name to the FormData
    formData.append('slug', productName); 
    formData.append('company', productName); 
    try {
      const response = await axios.post(`${config.API_URL}/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the API call
      // ...

      setProductName(""); // Clear the product name after submission
      setSelectedFiles(null); // Clear the selected files after submission
    } catch (error) {
      console.log(error);
      // Handle API call errors
      // ...
    }
  };

  return (
    <div className="p-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="productInput"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label htmlFor="productInput">Product Name</label>
          </div>
        </div>
        <div className="col-lg-4">
          <input
            type="file"
            className="productFile"
            id="productInput"
            placeholder="Product File"
            onChange={handleFileChange} // Handle file selection
            multiple // Allow multiple file selection
          />
        </div>
        <div className="col-lg-2">
          <button
            className="text-white font-bold uppercase text-sm px-6 py-3 rounded focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
            type="button"
            onClick={handleFormSubmit} // Submit both product name and files
            style={{ background: "#3C4B64" }}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="row">
        {/* Your other components */}
        <div className="col-lg-6">
          <PiechartProject />
        </div>
      </div>
    </div>
  );
}
