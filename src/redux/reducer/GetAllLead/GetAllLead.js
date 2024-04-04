import {
    GetAllLead_FAIL,
    GetAllLead_REQUEST,
    GetAllLead_SUCCESS,
  } from "../../constant/GetAllLead/getalllead";

  const initialState = {
    loading: false,
   
  };
  const fetchAllLeadReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case GetAllLead_REQUEST:
        return { ...state, loading: true };
      case GetAllLead_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case GetAllLead_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchAllLeadReducer };
  