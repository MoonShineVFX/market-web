import { useContext } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/global.state';

const GuestLayout = () => {

    // Context
    const { user } = useContext(GlobalContext);

    // Hook
    const { locale } = useParams();

    // 已登入導去首頁
    if (user) {

        return <Navigate to={`/${locale}`} replace />;

    }

    return <Outlet />;

};

export default GuestLayout;
