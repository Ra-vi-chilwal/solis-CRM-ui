import axios from "axios";
import {
    COMPANY_FAIL,
    COMPANY_REQUEST,
    COMPANY_SUCCESS,
  } from "../../constant/company/company";
  import config from '../../../config';
const fetchCompany = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type: COMPANY_REQUEST });
        const data = await axios.get(`${config.API_URL}/company/get`, { headers: { Authorization: `Bearer ${token}` }});
        const companyData = data.data;
        dispatch({ type: COMPANY_SUCCESS, payload: companyData });
      } catch (err) {
          dispatch({ type: COMPANY_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetchCompany}