import {
    LEADSOURCE_FAIL,
    LEADSOURCE_REQUEST,
    LEADSOURCE_SUCCESS,
   
  } from "../../constant/LeadSource/LeadSource";
  const initialState = {
    loading: false,
    
  };
  const fetchLeadSourceReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case LEADSOURCE_REQUEST:
        return { ...state, loading: true };
      case LEADSOURCE_SUCCESS:
        return { ...state, loading: false,data: action.payload, userInfo: action.payload };
      case LEADSOURCE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchLeadSourceReducer };
  