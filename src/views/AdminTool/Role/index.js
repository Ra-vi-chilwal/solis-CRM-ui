import React from "react";
import AddRole from "./AddRole";
import RoleDetails from "./RoleDetails";
import Button from '@mui/material/Button';
export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      {/* <button
        className=" text-white  font-bold uppercase text-sm px-6 py-1 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
        type="button"
        onClick={() => setShowModal(true)} style={{background:"#3C4B64" }}
      >
        + Add Role
      </button> */}
     <div  className="w-full d-flex justify-content-end"><Button variant="contained"  onClick={() => setShowModal(true)} style={{margin:"10px 2rem 0 0"}}>+ Add Role</Button></div> 
      {showModal ? (
        <>
        <AddRole  showModal={showModal} setShowModal={setShowModal}/>
        </>
      ) : <RoleDetails />}
      
    </>
  );
}