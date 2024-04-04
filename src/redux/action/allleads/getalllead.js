import axios from "axios";
import {
    GetAllLead_FAIL,
    GetAllLead_REQUEST,
    GetAllLead_SUCCESS,
  } from "../../constant/GetAllLead/getalllead";
  import config from '../../../config';

const fetctAllLead = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type: GetAllLead_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/total/leads`, { headers: { Authorization: `Bearer ${token}` }});
        const companyData = data.data;
        dispatch({ type: GetAllLead_SUCCESS, payload: companyData });
      } catch (err) {
          dispatch({ type: GetAllLead_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetctAllLead}