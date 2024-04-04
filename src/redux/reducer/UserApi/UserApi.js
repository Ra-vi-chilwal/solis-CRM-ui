import {
    USERAPI_FAIL,
    USERAPI_REQUEST,
    USERAPI_SUCCESS,
   
  } from "../../constant/UserApi/UserApi";
  
  const token = localStorage.getItem("token") || "";
  const initialState = {
    loading: false,
  };
  
  const fetchUserApiReducer = (state = initialState, action) => {
    switch (action.type) {
      case USERAPI_REQUEST:
        return { ...state, loading: true };
      case USERAPI_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case USERAPI_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchUserApiReducer };
  