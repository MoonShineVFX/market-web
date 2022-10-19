import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    SignLayout,
    BtnDirectLayout,
    ForgotPasswordLayout,
} from './memberSignLayout';
import SEO from '../../containers/SEO';
import Buttons from '../../components/Buttons';
import FontIcon from '../../components/FontIcon';
import Links from '../../components/Links';
import FormWrap, { FormRow } from '../../components/FormWrap';
import SigninGoogle from './SigninGoogle';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';
import useReCaptchaVerify from '../../hooks/useReCaptchaVerify';

const { paswdConfig } = utilConst;

const Signin = () => {

    // Route
    const navigate = useNavigate();
    const { locale } = useParams();

    // Context
    const {
        deftags,
        isVerified,
        globalDispatch,
    } = useContext(GlobalContext);

    // Hook
    const [token, handleGetToken] = useReCaptchaVerify(null);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, [globalDispatch]);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // State
    const [toggle, setToggle] = useState({
        password: false,
        confirm: false,
    });

    // 顯示/隱藏密碼
    const handleToggle = (type) => {

        setToggle({
            ...toggle,
            [type]: !toggle[type],
        });

    };

    // 送資料
    const handleReqData = (reqData) => {

        let auth = btoa(`${reqData.email}:${reqData.password}`);
        Service.signin({
            reqData: { recaptcha: token },
            headers: { Authorization: `Basic ${auth}`},
        })
        .then(() => {

            navigate(`/${locale}`);

        });

    };

    return (

        <Fragment>
            <SEO title={deftags.text_signin} />

            <SignLayout>
                <FormWrap title={deftags.text_signin_title}>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="email"
                            errors={errors}
                        >
                            <input
                                type="text"
                                name="email"
                                placeholder={deftags.text_account}
                                {...register('email', { required: true })}
                            />
                        </FormRow>

                        <FormRow
                            name="password"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.password].type}
                                name="password"
                                placeholder={deftags.text_password}
                                {...register('password', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: deftags.error_password_at_least_eight,
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]^_`{|}~-]{8,}$/g,
                                        message: deftags.error_pattern,
                                    },
                                })}
                            />

                            <span onClick={() => handleToggle('password')}>
                                <FontIcon icon={paswdConfig[toggle.password].icon} />
                            </span>
                        </FormRow>

                        <div className="form-row form-row-btns">
                            <Buttons
                                text={deftags.btn_verify}
                                disabled={isVerified}
                                onClick={handleGetToken}
                            />

                            <Buttons
                                type="submit"
                                text={deftags.text_signin}
                                disabled={!isVerified}
                            />

                            <SigninGoogle />

                            <ForgotPasswordLayout>
                                <Links
                                    url={`/${locale}/forgot_password`}
                                    title={deftags.text_forgot_password}
                                    data-link="forgot-password"
                                >
                                    {deftags.text_forgot_password}
                                </Links>
                            </ForgotPasswordLayout>

                            <BtnDirectLayout
                                type="third"
                                url={`/${locale}/register`}
                                className="btn-register"
                                text={deftags.text_register}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>
        </Fragment>

    );

};

export default Signin;
