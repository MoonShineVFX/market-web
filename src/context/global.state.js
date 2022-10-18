import React, {
    createContext,
    useReducer,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import Service from '../utils/util.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
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

    // Route
    const { locale } = useParams();

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [formStorageState, formStorageDispatch] = useReducer(formStorageReducer, formStorageInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const {
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
    const [isDefer, setIsDefer] = useState(true);

    useEffect(() => {

        const fetchData = async() => {

            // 取得使用者資訊
            const data = await Service.common();
            const { tags, ...rest } = data;

            globalDispatch({
                type: 'global_data',
                payload: {
                    tags,
                    other: rest,
                },
            });

            if (data) setIsDefer(false);

        };

        fetchData();

    }, [locale]);

    return !isDefer && (

        <Provider value={{
            // 全域資料
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

    );

};

export { GlobalContext, GlobalProvider };
