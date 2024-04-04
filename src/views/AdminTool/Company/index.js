import React from "react";
import AddCompany from "./AddCompany";
import CompanyDetails from './CompanyDetails'

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className=" text-white  font-bold uppercase text-sm px-6 py-3 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
        type="button"
        onClick={() => setShowModal(true)} style={{background:"#3C4B64" }}
      >
        + Add Company
      </button>
      {showModal ? (
        <>
        <AddCompany  showModal={showModal} setShowModal={setShowModal}/>
        </>
      ) : <CompanyDetails />}
      
    </>
  );
}