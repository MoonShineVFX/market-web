import {
    useParams,
    Navigate,
    Outlet,
} from 'react-router-dom';

const GuestLayout = ({ logged }) => {

    // Route
    const { locale } = useParams();

    // 已登入導去首頁
    if (logged) {

        return <Navigate to={`/${locale}`} replace />;

    }

    return <Outlet />;

};

export default GuestLayout;
