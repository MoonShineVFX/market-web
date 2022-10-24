import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';
import Service from '../utils/util.service';

const { locales } = utilConst;
const [defLocale] = locales;

export default function useDeftags() {

    // Route
    const { locale } = useParams();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // State
    const [deftags, setDeftags] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            // 取得語系包
            const langs = await Service.langs();
            setDeftags(langs);
            globalDispatch({ type: 'lang_config', payload: langs[locale ?? defLocale] });

        };

        fetchData();

    }, [globalDispatch, locale]);

    return deftags;

}
