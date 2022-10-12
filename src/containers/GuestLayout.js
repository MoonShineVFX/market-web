import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Frame from './Frame';
import { GlobalContext } from '../context/global.state';

const PublicLayout = () => {

    // Context
    const { user } = useContext(GlobalContext);

    // 已登入導去首頁
    if (user) {

        return <Navigate to={'/'} replace />;

    }

    return (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default PublicLayout;
