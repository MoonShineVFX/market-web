import { useContext } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/global.state';

const ProtectedLayout = () => {

    // Context
    const { user } = useContext(GlobalContext);

    // Hook
    const { locale } = useParams();

    // 未登入導去登入頁
    // if (!user) {

    //     return <Navigate to={`/${locale}/singin`} replace />;

    // }

    return <Outlet />;

};

export default ProtectedLayout;
