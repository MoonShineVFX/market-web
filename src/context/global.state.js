import React, { createContext, useReducer } from 'react';
import Service from '../utils/util.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
    page: '',
    user: {},
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
    deftags: {},
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
        page,
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
        deftags,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    // 取得全域資料
    const getGlobalData = () => {

        Service.common()
            .then((resData) => {

                const { tags, ...rest } = resData;
                globalDispatch({
                    type: 'global_data',
                    payload: {
                        tags,
                        other: rest,
                    },
                });

            });

    };

    return (

        <Provider value={{
            // 全域資料
            page,
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
            deftags,
            getGlobalData,

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
