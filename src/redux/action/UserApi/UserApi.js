import axios from "axios";
import {
  USERAPI_FAIL,
  USERAPI_REQUEST,
  USERAPI_SUCCESS,
} from "../../constant/UserApi/UserApi";
import config from '../../../config'
const   fetchUserApi = (token) => {

  return async (dispatch) => {
    try {

      dispatch({ type: USERAPI_REQUEST });
      const data = await axios.get(`${config.API_URL}/auth/get`, { headers: { Authorization: `Bearer ${token}` } });
      const userData = data.data;
      dispatch({ type: USERAPI_SUCCESS, payload: userData });
    } catch (err) {
console.log(err)
      dispatch({ type: USERAPI_FAIL, payload: err });
    }
  };
};

export { fetchUserApi }