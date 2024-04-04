import axios from "axios";
import {
  CARD_SUCCESS,
  CARD_FAIL,
  CARD_REQUEST
  } from "../../constant/Dashboard/dashboardCards";
  import config from '../../../config'

const dashboardcards = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type:  CARD_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/get/userslead/data`,{headers:{ Authorization: `Bearer ${token}` }});
        const cardData = data.data;
        dispatch({ type: CARD_SUCCESS, payload: cardData });
      } catch (err) {
          dispatch({ type: CARD_FAIL, payload:err});
       
        }
      }
    };
  
  export {dashboardcards}