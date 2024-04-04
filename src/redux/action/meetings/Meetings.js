import axios from "axios";
import {
    MEETINGS_REQUEST,
    MEETINGS_FAIL,
    MEETINGS_SUCCESS
  } from "../../constant/Meetings/Meeting";
  import config from '../../../config'

const fetchMeetings = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type: MEETINGS_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/meeting`, { headers: { Authorization: `Bearer ${token}` }});
        const meetingsData = data.data;
        dispatch({ type: MEETINGS_SUCCESS, payload: meetingsData });
      } catch (err) {
          dispatch({ type: MEETINGS_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetchMeetings}