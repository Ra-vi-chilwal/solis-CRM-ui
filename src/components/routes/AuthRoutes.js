import { exact } from 'prop-types';
import AuthLayout from '../../layout/AuthLayout';
import Login from '../../views/pages/login/Login';
import UnAuthorised from '../../views/pages/page404/Page404';
import { useSelector } from 'react-redux';

const AuthRoutes = {
    path: '/user',
    element: <AuthLayout />,
    children: [
        {
            path: "/user/login",
            element: <Login />,
           
        },
        {
            path: "/user/page404",
            element: <UnAuthorised/>
        },
    ]
};

export default AuthRoutes;