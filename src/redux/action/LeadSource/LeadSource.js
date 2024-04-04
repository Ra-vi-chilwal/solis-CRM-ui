import axios from "axios";
import {
  LEADSOURCE_FAIL,
    LEADSOURCE_REQUEST,
    LEADSOURCE_SUCCESS,
  } from "../../constant/LeadSource/LeadSource";
  import config from '../../../config'

const fetchLeadSource = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type: LEADSOURCE_REQUEST });
        const data = await axios.get(`${config.API_URL}/leadSource/get`,{headers:{ Authorization: `Bearer ${token}` }});
        const LeadSourceData = data.data;
        dispatch({ type: LEADSOURCE_SUCCESS, payload: LeadSourceData });
      } catch (err) {
          dispatch({ type: LEADSOURCE_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetchLeadSource}