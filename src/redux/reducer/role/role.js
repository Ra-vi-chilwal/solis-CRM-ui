import {
    ROLE_FAIL,
    ROLE_REQUEST,
    ROLE_SUCCESS,
   
  } from "../../constant/role/role";
  
  const token = localStorage.getItem("token") || "";
  const initialState = {
    loading: false,
  };
  
  const fetchRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case ROLE_REQUEST:
        return { ...state, loading: true };
      case ROLE_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case ROLE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchRoleReducer };
  