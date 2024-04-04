import React, {useState } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/loader";

const DefaultLayout = () => {
  const { loading, userInfo, error } = useSelector((state) => state.userInfo);
  // useEffect(()=>{
  // setUserToken(userInfo?.userInfo)
  // },[])

  return (
    <div>
      {loading  ? (
        <Loader />
      ) : (( userInfo?.token) || ( userInfo?.verify))  ? (
        <>
       
        <AppHeader />
        <div>
        <AppSidebar />
        
        <div className="wrapper d-flex flex-column min-vh-100 bg-light" >
        {/* wrapper d-flex flex-column min-vh-100 bg-light */}
        
          <div className="body flex-grow-1">
            <AppContent />
            <Outlet />
          </div>
          {/* <AppFooter /> */}
        </div>
        </div>
      </>
      ) :  (
        window.location.replace("/user/login") 
      )}
    </div>
  );
};

export default DefaultLayout;
