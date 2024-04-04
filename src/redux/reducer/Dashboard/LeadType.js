import {
    LEADTYPE_FAIL,
    LEADTYPE_SUCCESS,
    LEADTYPE_REQUEST
   
  } from "../../constant/Dashboard/LeadType";
  const initialState = {
    loading: false,
   
  };
  const fetchLeadTypeReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case LEADTYPE_REQUEST:
        return { ...state, loading: true };
      case LEADTYPE_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case LEADTYPE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchLeadTypeReducer };
  