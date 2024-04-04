import axios from "axios";
import {
    ROLE_FAIL,
    ROLE_REQUEST,
    ROLE_SUCCESS,
  
  } from "../../constant/role/role";
  import config from '../../../config'
const fetchRole = (token) => {

    return async (dispatch) => {
      try {
        dispatch({ type: ROLE_REQUEST });
        const data = await axios.get(`${config.API_URL}/role/get`, { headers: { Authorization: `Bearer ${token}` } });
        const roleData = data.data;
        dispatch({ type: ROLE_SUCCESS, payload: roleData });
      } catch (err) {
          dispatch({ type: ROLE_FAIL, payload:err});
        }
      }
    };
  
  export {fetchRole}