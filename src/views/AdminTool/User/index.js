import React, { useEffect ,useMemo} from "react";
import AddUser from "./AddUser";
import UserDetails from "./detailsUser";
import { useDispatch } from "react-redux";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
import Button from '@mui/material/Button';
export default function Modal() {
  var token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchUserApi(token));
  }, [])
  return (
    <>
     <div className="w-full d-flex justify-content-end  " ><Button variant="contained" onClick={() => setShowModal(true)} style={{margin:"10px 2rem 0 0"}} > + Add User</Button></div> 

      {showModal ? (
        <>
        <AddUser  showModal={showModal} setShowModal={setShowModal}/>
        </>
      ) : <UserDetails />}
      
    </>
  );
}