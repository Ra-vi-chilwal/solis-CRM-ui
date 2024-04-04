import {
    WEBSITELEADSOURCE_FAIL,
    WEBSITELEADSOURCE_REQUEST,
    WEBSITELEADSOURCE_SUCCESS,
   
  } from "../../constant/LeadSource/WebsiteLeadSource";
  const initialState = {
    loading: false,
  };
  const fetchWebsiteLeadSourceReducer = (state = initialState, action) => {
    switch (action.type) {
      case WEBSITELEADSOURCE_REQUEST:
        return { ...state, loading: true };
      case WEBSITELEADSOURCE_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case WEBSITELEADSOURCE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchWebsiteLeadSourceReducer };
  