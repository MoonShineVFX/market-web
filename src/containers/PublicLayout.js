import { Navigate, Outlet } from 'react-router-dom';
import Frame from './Frame';

const PublicLayout = () => {

    // 已登入導去首頁
    // if (userInfo) {

    //     return <Navigate to={'/'} replace />;

    // }

    return (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default PublicLayout;
