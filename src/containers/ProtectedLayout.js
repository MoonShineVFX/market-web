import {
    useParams,
    Navigate,
    Outlet,
} from 'react-router-dom';

const ProtectedLayout = ({ logged }) => {

    // Route
    const { locale } = useParams();

    // 未登入導去登入頁
    if (!logged) {

        return <Navigate to={`/${locale}/signin`} replace />;

    }

    return <Outlet />;

};

export default ProtectedLayout;
