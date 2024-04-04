import axios from "axios";
import {
  BARCHART_REQUEST,
  BARCHART_FAIL,
  BARCHART_SUCCESS
  } from "../../constant/Dashboard/barchart";
  import config from '../../../config'

const barcharts = (token) => {
    return async (dispatch) => {
      try {
        dispatch({ type:  BARCHART_REQUEST });
        const data = await axios.get(`${config.API_URL}/dashboard/get/leadsource`,{headers:{ Authorization: `Bearer ${token}` }});
        const barchartData = data.data;
        console.log(barchartData,'chartData')
        dispatch({ type: BARCHART_SUCCESS, payload: barchartData });
      } catch (err) {
          dispatch({ type: BARCHART_FAIL, payload:err});
       
        }
      }
    };
  
  export {barcharts}