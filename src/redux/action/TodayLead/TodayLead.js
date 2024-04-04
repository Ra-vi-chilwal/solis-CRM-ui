import axios from "axios";
import {
    TODAYLEAD_REQUEST,
    TODAYLEAD_FAIL,
   TODAYLEAD_SUCCESS
  } from "../../constant/TodayLead/TodayLead";
  import config from '../../../config'

const fetchTodayLead = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type: TODAYLEAD_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/get/todayleads`, { headers: { Authorization: `Bearer ${token}` }});
        const meetingsData = data.data;
        dispatch({ type: TODAYLEAD_SUCCESS, payload: meetingsData });
      } catch (err) {
          dispatch({ type: TODAYLEAD_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetchTodayLead}