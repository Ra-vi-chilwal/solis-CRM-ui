import {
    BARCHART_REQUEST,
    BARCHART_SUCCESS,
    BARCHART_FAIL
   
  } from "../../constant/Dashboard/barchart";
  const initialState = {
    loading: false,
   
  };
  const fetchBarChartReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case BARCHART_REQUEST:
        return { ...state, loading: true };
      case BARCHART_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case BARCHART_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchBarChartReducer };
  