import React from 'react';
import {useSelector } from 'react-redux';
function navBarfunction(){
    var token = localStorage.getItem("token") || " ";
    const { loading, userInfo, error } = useSelector(store => store.userInfo);
  
    return userInfo
}
export default navBarfunction;