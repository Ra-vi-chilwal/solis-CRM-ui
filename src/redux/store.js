import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userInfoReducer } from "./reducer/user";
import {fetchRoleReducer} from './reducer/role/role';
import {fetchCompanyReducer} from './reducer/company/company';
import {fetchPlanReducer} from './reducer/plan/plan';
import {fetchUserApiReducer} from './reducer/UserApi/UserApi';
import {fetchLeadSourceReducer} from './reducer/LeadSource/LeadSource';
import {fetchWebsiteLeadSourceReducer} from './reducer/LeadSource/WebsiteLeadSource';
import  sidebar  from "./reducer/sidebar/sidebar";
import { fetchCardReducer } from "./reducer/Dashboard/dashboardcards";
import { piechartReducer } from "./reducer/Dashboard/piechart";
import { fetchBarChartReducer } from "./reducer/Dashboard/barchart";
import {fetchMeetingsReducer} from "./reducer/meetings/meetings";
import { fetchNotesReducer } from "./reducer/notes/notes";
import { fetchAllLeadReducer } from "./reducer/GetAllLead/GetAllLead";
import { TodayLeadReducer } from "./reducer/TodayLead/TodayLead";
import { fetchLeadTypeReducer } from "./reducer/Dashboard/LeadType";
const initialState = {};
const reducer = combineReducers({
  userInfo: userInfoReducer,
 RoleData: fetchRoleReducer,
 companyInfo : fetchCompanyReducer,
 planInfo : fetchPlanReducer,
 userApi : fetchUserApiReducer,
 LeadSource : fetchLeadSourceReducer,
 WebsiteLeadSource : fetchWebsiteLeadSourceReducer,
 sidebar : sidebar,
 fetchCardReducer:fetchCardReducer,
 piechartReducer:piechartReducer,
 fetchBarChartReducer:fetchBarChartReducer,
 fetchMeetingsReducer:fetchMeetingsReducer,
 fetchNotesReducer:fetchNotesReducer,
 fetchAllLeadReducer:fetchAllLeadReducer,
 TodayLeadReducer:TodayLeadReducer,
 leadTypeData: fetchLeadTypeReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);
export default Store;
