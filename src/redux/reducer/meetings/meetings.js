import {
    MEETINGS_FAIL,
    MEETINGS_SUCCESS,
    MEETINGS_REQUEST
   
  } from "../../constant/Meetings/Meeting";

  const initialState = {
    loading: false,
    
  };
  const fetchMeetingsReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case MEETINGS_REQUEST:
        return { ...state, loading: true };
      case MEETINGS_SUCCESS:
        return { ...state, loading: false,data: action.payload, userInfo: action.payload };
      case MEETINGS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchMeetingsReducer };
  