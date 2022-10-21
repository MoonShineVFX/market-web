import {
    useParams,
    Navigate,
    Outlet,
} from 'react-router-dom';
import Frame from './Frame';
import utilConst from '../utils/util.const';

const { locales } = utilConst;
const [defLocale] = locales;

const PublicLayout = ({ emptyLangs }) => {

    // Route
    const { locale } = useParams();

    // 預設語系為中文，並轉址到 /zh
    // if (!locale) {

    //     return <Navigate to={`/${defLocale}`} replace />;

    // }

    return !emptyLangs && (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default PublicLayout;
