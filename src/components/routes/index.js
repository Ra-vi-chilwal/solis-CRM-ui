import { useRoutes } from 'react-router-dom';
// routes
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserInfo } from '../../redux/action/user';
import { fetchCompany } from '../../redux/action/company/company';
import { fetchRole } from '../../redux/action/role/role';
import { LeadTypedata } from '../../redux/action/DashboardCards/LeadType';
import { useEffect, useState } from 'react';
import UnAuthorised from '../../views/pages/page404/Page404';
// ==============================|| ROUTING RENDER ||============================== //
export default function Routes() {
    var token = localStorage.getItem("token") || " ";
    const { loading, userInfo, error } = useSelector(store => store.userInfo);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(verifyUserInfo({ token }));
        dispatch(fetchCompany(token));
        dispatch(fetchRole(token));
        dispatch(LeadTypedata(token));
    }, [])
//     };
 const permissions =userInfo && userInfo.payload && userInfo.payload.role[0] && userInfo.payload.role[0].permission
    const routes = MainRoutes && MainRoutes.children;
    const permitRoutes = {
        ...MainRoutes, children: routes && routes.map((item) => {
            if (item.permissions && item.permissions.every((el) => permissions && permissions.some((ele) => el.value == ele.value))) {
                return item
            }
            else {
                return { ...item, element: <UnAuthorised /> }
            }
        })
    };
    return useRoutes([permitRoutes, AuthRoutes]);
} 