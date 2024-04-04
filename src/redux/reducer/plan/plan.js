import {
    PLAN_FAIL,
    PLAN_REQUEST,
    PLAN_SUCCESS,
   
  } from "../../constant/plan/plan";
  const initialState = {
    loading: false,
  };
  
  const fetchPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLAN_REQUEST:
        return { ...state, loading: true };
      case PLAN_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case PLAN_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchPlanReducer };
  