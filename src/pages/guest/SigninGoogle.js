import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import GoogleLogin from 'react-google-login';
// import { GoogleLogin } from '@react-oauth/google'; // Notes: Google signin 改版，需撤換
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const GoogleSigninLayout = styled(GoogleLogin)({
    width: '100%',
    height: '70px',
    borderRadius: '40px !important',
    justifyContent: 'center',
    'span': {
        fontSize: '1.45em',
    },
    'svg': {
        verticalAlign: 'middle',
    },
});

//
const SigninGoogle = () => {

    // Route
    const navigate = useNavigate();
    const { locale } = useParams();

    // Context
    const { deftags } = useContext(GlobalContext);

    //
    const handleCallback = (res) => {

        Service.signWithGoogle({ access_token: res.credential })
            .then(() => {

                navigate(`/${locale}`);

            });

    };

    const handleSuccess = (res) => {

        console.log('res:', res)

        return;
        Service.signWithGoogle({ access_token: res.credential })
            .then(() => {

                navigate(`/${locale}`);

            });

    };

    const handleError = () => {

        console.log('Login Failed');

    };



    return (

        <GoogleSigninLayout
            clientId={process.env.REACT_APP_GOOGLE_SIGNIN_CLIENTID}
            onSuccess={handleCallback}
            onFailure={handleCallback}
            // isSignedIn={true} // 已登入狀態
            cookiePolicy={'single_host_origin'}
            buttonText={deftags.text_signin_with_google} // 預設 google 按鈕
        />

        // <GoogleLogin
        //     onSuccess={handleSuccess}
        //     onError={handleError}
        //     useOneTap
        //     auto_select
        // />

    );

};

export default SigninGoogle;
