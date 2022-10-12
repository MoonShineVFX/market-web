import { Navigate, Outlet } from 'react-router-dom';
import Frame from './Frame';

const PublicLayout = () => {

    return (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default PublicLayout;
