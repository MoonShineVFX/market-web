import React, {
    createContext,
    useReducer,
    useEffect,
    useState,
} from 'react';
import Service from '../utils/util.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
    locale: 'zh',
    deftags: null,
    user: null,
    tags: [],
    slideshowActive: 0,
    logged: false,
    targetBox: '',
    targetPopup: null,
    sideNav: false,
    snackbar: false,
    cart: {},
    dynamicAction: '',
    isVerified: false,
};

// Form values
const formStorageInitState = {
    formStorageData: {},
};

// Lightbox
const lightboxInitState = {
    visible: false,
    currEvent: '',
};

// Create Context
const GlobalContext = createContext(null);

// Provider
const GlobalProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [formStorageState, formStorageDispatch] = useReducer(formStorageReducer, formStorageInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const {
        locale,
        deftags,
        user,
        tags,
        slideshowActive,
        logged,
        targetBox,
        targetPopup,
        sideNav,
        snackbar,
        cart,
        dynamicAction,
        isVerified,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    // State
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async() => {

            // 取得語系包
            const langs = await Service.langs();

            // 取得使用者資訊
            const data = await Service.common();
            const { tags, ...rest } = data;

            globalDispatch({ type: 'lang_config', payload: langs[locale] });
            globalDispatch({
                type: 'global_data',
                payload: {
                    tags,
                    other: rest,
                },
            });

            if (data) setLoading(false);

        };

        fetchData();

    }, [locale]);

    return (

        !loading && (

            <Provider value={{
                // 全域資料
                locale,
                deftags,
                user,
                tags,
                slideshowActive,
                logged,
                targetBox,
                targetPopup,
                sideNav,
                snackbar,
                cart,
                dynamicAction,
                isVerified,

                // Form 表單暫存
                formStorageData,

                // Lightbox
                visible,
                currEvent,

                // Dispatch
                globalDispatch,
                formStorageDispatch,
                lightboxDispatch,
            }}>
                {children}
            </Provider>

        )

    );

};

export { GlobalContext, GlobalProvider };
