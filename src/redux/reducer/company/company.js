import {
    COMPANY_FAIL,
    COMPANY_REQUEST,
    COMPANY_SUCCESS,
   
  } from "../../constant/company/company";
  const initialState = {
    loading: false,
  };
  
  const fetchCompanyReducer = (state = initialState, action) => {
    switch (action.type) {
      case COMPANY_REQUEST:
        return { ...state, loading: true };
      case COMPANY_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case COMPANY_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchCompanyReducer };
  