import {
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOG_OUT,
} from "../constant/user";
import axios from "axios";
import config from "../../config";
import Swal from 'sweetalert2'
const fetchUserInfo = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const response = await axios.post(`${config.API_URL}/auth/login`, values);
      const userInfo = response.data;
      if (userInfo.code === "FETCHED" && userInfo !== null) {
        localStorage.setItem("token", userInfo.token);
        dispatch({ type: USER_INFO_SUCCESS, payload: userInfo });
          Swal.fire({
            icon: 'success',
            title: 'Woh...',
            text: 'User login ',
      
          })
       
        
      } else {
        dispatch({ type: USER_INFO_FAIL, payload: "Invalid user info" });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: userInfo.data,
    
        })
     
      
      }
    } catch (err) {
     
      dispatch({ type: USER_INFO_FAIL, payload: err.message });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  err.message ,
  
      })
      
    }
  };
};
const verifyUserInfo = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
     
      const data = await axios.post(`${config.API_URL}/verify`, values);
      const userInfo = data.data;
      if (data.data && data.data.code === "JWT") {
        dispatch({ type: USER_INFO_FAIL, payload: data.data.message });
      } else {
        const userInfo = data.data && data.data.body;

        dispatch({ type: USER_INFO_SUCCESS, payload: userInfo });
      }
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        dispatch({ type: USER_INFO_FAIL, payload: "401" });
        
      } else {
        dispatch({ type: USER_INFO_FAIL, payload: err });
      }
    }
  };
};
//   const logOut = (values) => {

//   return async (dispatch) => {
//     axios
//     .post(
//       `${config.API_URL}/event`,
//       {
//           actionType: "LoggedOut",
//           data: { email: values.email },
//         },
//         {
//           headers: { Authorization: `Bearer ${values.token}` },
//         }
//       )
//       .then((result) => {
//         localStorage.removeItem("token");
//         dispatch({ type: USER_LOG_OUT });
//       })
//       .catch((error) => {
//         localStorage.removeItem("token");
//       });
//     }
//   };

export { fetchUserInfo, verifyUserInfo };
