import axios from "axios";
import {
    PLAN_FAIL,
    PLAN_REQUEST,
    PLAN_SUCCESS,
  } from "../../constant/plan/plan";
  import config from '../../../config'
const fetchPlan = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type: PLAN_REQUEST });
        const data = await axios.get(`${config.API_URL}/plan/get`, { headers: { Authorization: `Bearer ${token}` }});
        const companyData = data.data;
        dispatch({ type: PLAN_SUCCESS, payload: companyData });
      } catch (err) {
          dispatch({ type: PLAN_FAIL, payload:err});
       
        }
      }
    };
  
  export {fetchPlan}