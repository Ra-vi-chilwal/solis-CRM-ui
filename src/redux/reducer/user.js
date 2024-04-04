import {
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOG_OUT,
} from "../constant/user";

const token = localStorage.getItem("token") || "";
const initialState = {
  loading: false,
  userInfo: {
    token: token,
  },
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true };
    case USER_INFO_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_INFO_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOG_OUT:
      return { ...state, loading: false, logout: "loggedOut" };
    default:
      return state;
  }
};
// const usersList = (state = { users: [] }, action) => {
//   switch (action.type) {
//       case USERS_REQUEST:
//           return { loading: true };
//       case USERS_SUCCESS:
//           return { loading: false, users: action.payload };
//       case USERS_FAIL:
//           return { loading: false, error: action.payload };
//       default:
//           return state;
//   }
// }
export { userInfoReducer };
