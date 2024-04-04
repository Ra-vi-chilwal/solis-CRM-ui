import axios from "axios";
import {
  LEADTYPE_SUCCESS,
  LEADTYPE_FAIL,
  LEADTYPE_REQUEST
  } from "../../constant/Dashboard/LeadType";
  import config from '../../../config'

const LeadTypedata = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type:   LEADTYPE_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/get/leadtype`,{headers:{ Authorization: `Bearer ${token}` }});
        const  leadType = data.data;

        dispatch({ type:  LEADTYPE_SUCCESS, payload:  leadType });
      } catch (err) {
          dispatch({ type:  LEADTYPE_FAIL, payload:err});
       
        }
      }
    };
  
  export {LeadTypedata}