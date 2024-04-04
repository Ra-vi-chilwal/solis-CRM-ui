import axios from "axios";
import {
  PIECHART_SUCCESS,
  PIECHART_FAIL,
  PIECHART_REQUEST
  } from "../../constant/Dashboard/piechart";
  import config from '../../../config'

const piechartdata = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type:  PIECHART_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/get/piechart`,{headers:{ Authorization: `Bearer ${token}` }});
        const piechart = data.data;
        dispatch({ type: PIECHART_SUCCESS, payload: piechart });
      } catch (err) {
          dispatch({ type: PIECHART_FAIL, payload:err});
       
        }
      }
    };
  
  export {piechartdata}