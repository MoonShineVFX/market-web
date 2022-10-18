import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { HelmetProvider } from 'react-helmet-async';
import '@fortawesome/fontawesome-svg-core/styles.css';

import theme from './utils/theme';
import { GlobalProvider } from './context/global.state';
import Routes from './Routes';

const styles = {
    'body': {
        lineHeight: '1.6',
        fontSize: '1em',
        fontFamily: 'Arial, 文泉驛正黑, WenQuanYi Zen Hei, 儷黑 Pro, LiHei Pro, 微軟正黑體, Microsoft JhengHei',
        color: '#fff',
        backgroundColor: '#1F2023',
        margin: 0,
        '*': {
            boxSizing: 'border-box',
        },
    },
    'a': {
        color: theme.palette.secondary.main,
        display: 'inline-block',
        textDecoration: 'none',
    },
    '.Model-container': {
        width: '100%',
        maxWidth: '1200px',
        margin: 'auto',
    },
    '.Model-align': {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    '.Model-x-align': {
        left: '50%',
        transform: 'translateX(-50%)',
    },
    '.Model-y-align': {
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '.Model-clear-box': {
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both',
        },
    },
    '.Model-effect-brightness': {
        filter: 'brightness(0.9)',
        transition: 'all .5s ease',
        '&:hover': {
            filter: 'brightness(1.2)',
        },
    },
    'img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
    },
    'select': {
        outline: 'none',
    },
    '.title': {
        fontWeight: 'normal',
    },
    '.price': {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    '.web-line-clamp': {
        display: '-webkit-box',
        WebkitLineClamp: theme.lineClamp(),
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    '.Model-form-button': {
        '.model-button': {
            width: '100%',
            height: '70px',
            fontSize: '1.15em',
            borderRadius: '40px',
            '&.third': {
                borderRadius: '40px',
            },
        },
    },
    '.grecaptcha-badge': {
        visibility: 'hidden',
    },
    [theme.breakpoints.down('mobile')]: {
        '.Model-container': {
            padding: '0 30px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.Model-form-button': {
            '.model-button': {
                height: '56px',
            },
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.Model-container': {
            padding: '0 20px',
        },
    },
};

const PageRoute = () => (

    <ThemeProvider theme={theme}>
        <GlobalStyles styles={styles} />

        <HelmetProvider>
            <GlobalProvider>
                {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_SIGNIN_CLIENTID}> */}
                    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}>
                        <Routes />
                    </GoogleReCaptchaProvider>
                {/* </GoogleOAuthProvider> */}
            </GlobalProvider>
        </HelmetProvider>
    </ThemeProvider>

);

export default PageRoute;
