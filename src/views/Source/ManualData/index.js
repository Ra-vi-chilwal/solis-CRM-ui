import React, { useEffect } from "react";
import AddmanualData from "./AddmanualData";
import ManualdataDetails from "./ManualdataDetails";
import { useDispatch } from "react-redux";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
import {fetchLeadSource} from "../../../redux/action/LeadSource/LeadSource"
import FilterComponent from "./FilterComponent";
import RejectModal from "../subManualData/RejectLeadModal";
import Button from '@mui/material/Button';


export default function Modal() {
  var token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchUserApi(token));
      dispatch(fetchLeadSource(token))
  }, [])
  return (
    <>
    <div className="d-flex">
    {/* <button
        className=" text-white  font-bold uppercase text-sm px-6 py-3 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
        type="button"
        onClick={() => setShowModal(true)} style={{background:"rgb(7, 23, 57)" }}
      >
        + Add Source
      </button> */}
      <Button variant="contained" className="my-3"  onClick={() => setShowModal(true)} > + Add Source</Button>
   
    </div>
      {showModal ? (
        <>
        <AddmanualData  showModal={showModal} setShowModal={setShowModal}/>
        </>
      ) : <ManualdataDetails />}
      
    </>
  );
}