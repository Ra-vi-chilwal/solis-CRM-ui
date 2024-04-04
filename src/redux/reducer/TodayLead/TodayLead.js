import {
    TODAYLEAD_REQUEST,
    TODAYLEAD_FAIL,
   TODAYLEAD_SUCCESS
  } from "../../constant/TodayLead/TodayLead";
  
  const token = localStorage.getItem("token") || "";
  const initialState = {
    loading: false,
    userInfo: {
      token: token,
    },
  };
  
  const TodayLeadReducer = (state = initialState, action) => {
    switch (action.type) {
      case TODAYLEAD_REQUEST:
        return { ...state, loading: true };
      case TODAYLEAD_SUCCESS:
        return { ...state, loading: false, TodayLead: action.payload };
      case TODAYLEAD_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export { TodayLeadReducer };
  