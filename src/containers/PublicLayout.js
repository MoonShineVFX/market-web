import { Outlet } from 'react-router-dom';
import Frame from './Frame';
import useDeftags from '../hooks/useDeftags';

const PublicLayout = () => {

    // Hook
    const deftags = useDeftags(); // 語系要在此拿，外層抓不到 locale

    return !!deftags && (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default PublicLayout;
