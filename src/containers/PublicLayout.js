import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Frame from './Frame';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

const PublicLayout = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // State
    const [isDefer, setIsDefer] = useState(true);

    useEffect(() => {

        const fetchData = async() => {

            // 取得語系包
            const langs = await Service.langs();
            globalDispatch({ type: 'lang_config', payload: langs[locale] });

            if (langs) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, locale]);

    return !isDefer && (

        <Frame>
            <Outlet />
        </Frame>

    );

};

export default PublicLayout;
