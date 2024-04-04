import axios from "axios";
import {
    NOTES_REQUEST,
    NOTES_FAIL,
    NOTES_SUCCESS,
    CREATE_NOTE_REQUEST,
    CREATE_NOTE_FAIL,
    CREATE_NOTE_SUCCESS
} from "../../constant/Notes/Notes";

  const initialState = {
    loading: false,
    
  };
  const fetchNotesReducer = (state = initialState, action) => {
   
    switch (action.type) {
      case NOTES_REQUEST:
        return { ...state, loading: true };
      case NOTES_SUCCESS:
        return { ...state, loading: false,data: action.payload, userInfo: action.payload };
      case NOTES_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export { fetchNotesReducer };
  