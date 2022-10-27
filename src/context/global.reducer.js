// Global
const globalReducer = (state, { type, payload }) => {

    switch (type) {
        case 'global_data':
            return {
                ...state,
                user: payload.other,
            };

        case 'lang_config':
            return {
                ...state,
                deftags: payload,
            };

        case 'page':
            return {
                ...state,
                page: payload,
            };

        case 'slideshow':
            return {
                ...state,
                slideshowActive: payload,
            };

        case 'sidenav':
            return {
                ...state,
                sideNav: payload,
            };

        case 'cart_list':
            return {
                ...state,
                cartCount: payload.length,
            };

        case 'add_cart':
            return {
                ...state,
                cartCount: Object.entries(payload).length,
            };

        case 'remove_cart':
            return {
                ...state,
                cartCount: payload.length,
            };

        case 'target_box':
            return {
                ...state,
                targetBox: payload,
            };

        case 'target_popup':
            return {
                ...state,
                targetPopup: payload,
            };

        case 'snackbar':
            return {
                ...state,
                snackbar: payload,
            };

        case 'recaptcha_is_verified':
            return {
                ...state,
                isVerified: payload,
            };

        case 'update_account':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload,
                },
            };

        default:
            return { ...state };
    }

};

// Form Fields
const formStorageReducer = (state, { type, payload }) => {

    switch (type) {
        case 'COLLECT':
            return {
                formStorageData: payload,
            };

        case 'CLEAR':
            return {
                formStorageData: {},
            };

        default:
            return state;
    }

};

// Lightbox
const lightboxReducer = (state, { type, currEvent }) => {

    switch (type) {
        case 'SHOW':
            return { visible: true, currEvent: currEvent || '' };

        case 'HIDE':
            return { visible: false, currEvent: '' };

        default:
            return { ...state, currEvent };
    }

};

export {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
};
