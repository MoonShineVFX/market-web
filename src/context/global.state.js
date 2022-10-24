import { createContext, useReducer } from 'react';
import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
    deftags: null,
    user: null,
    slideshowActive: 0,
    logged: false,
    targetBox: '',
    targetPopup: null,
    sideNav: false,
    snackbar: false,
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
        deftags,
        user,
        slideshowActive,
        logged,
        targetBox,
        targetPopup,
        sideNav,
        snackbar,
        dynamicAction,
        isVerified,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    return (
        <Provider value={{
            // 全域資料
            deftags,
            user,
            slideshowActive,
            logged,
            targetBox,
            targetPopup,
            sideNav,
            snackbar,
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
