import axios from "axios";
import {
  WEBSITELEADSOURCE_FAIL,
  WEBSITELEADSOURCE_REQUEST,
  WEBSITELEADSOURCE_SUCCESS,
  } from "../../constant/LeadSource/WebsiteLeadSource";
  import config from '../../../config'
const fetchWebsiteLeadSource = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: WEBSITELEADSOURCE_REQUEST });
        const data = await axios.get(`${config.API_URL}/website-lead/get`);
        const WebsiteLeadSourceData = data.data;
        dispatch({ type: WEBSITELEADSOURCE_SUCCESS, payload: WebsiteLeadSourceData });
      } catch (err) {
          dispatch({ type: WEBSITELEADSOURCE_FAIL, payload:err});
        }
      }
    };
  
  export {fetchWebsiteLeadSource}