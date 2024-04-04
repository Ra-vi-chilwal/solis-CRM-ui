import {
    PIECHART_SUCCESS,
    PIECHART_FAIL,
    PIECHART_REQUEST
   
  } from "../../constant/Dashboard/piechart";
  const initialState = {
    loading: false,
   
  };
  const piechartReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case PIECHART_REQUEST:
        return { ...state, loading: true };
      case PIECHART_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case PIECHART_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { piechartReducer };
  