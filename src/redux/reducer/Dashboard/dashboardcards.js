import {
    CARD_FAIL,
    CARD_SUCCESS,
    CARD_REQUEST
   
  } from "../../constant/Dashboard/dashboardCards";
  const initialState = {
    loading: false,
   
  };
  const fetchCardReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case CARD_REQUEST:
        return { ...state, loading: true };
      case CARD_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case CARD_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchCardReducer };
  