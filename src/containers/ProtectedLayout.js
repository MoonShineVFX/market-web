import { Navigate, Outlet } from 'react-router-dom';
import Frame from './Frame';

const ProtectedLayout = () => {

    // 未登入導去登入頁
    // if (!userInfo) {

    //     return <Navigate to={'/signin'} replace />;

    // }

    return (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default ProtectedLayout;
