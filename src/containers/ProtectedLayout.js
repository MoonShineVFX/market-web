import { useContext } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/global.state';

const ProtectedLayout = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { user } = useContext(GlobalContext);

    // 未登入導去登入頁
    // if (!user.email) {

    //     return <Navigate to={`/${locale}/singin`} replace />;

    // }

    return <Outlet />;

};

export default ProtectedLayout;
