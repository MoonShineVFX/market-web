import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    SignLayout,
    BtnDirectLayout,
    ResetPasswordSuccessLayout,
} from './memberSignLayout';
import SEO from '../../containers/SEO';
import Buttons from '../../components/Buttons';
import FontIcon from '../../components/FontIcon';
import FormWrap, { FormRow, FormSuccessMesg } from '../../components/FormWrap';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { paswdConfig } = utilConst;

const ResetPassword = ({ langs }) => {

    // Route
    const location = useLocation();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();

    // useRef
    const password = useRef({});
    password.current = watch('password', '');

    // State
    const [success, setSuccess] = useState(false);
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

        reqData = {
            ...reqData,
            // ...router.query,
        };

        delete reqData.confirm_password;
        Service.resetPassword(reqData)
            .then(() => setSuccess(true));

    };

    return (

        <Fragment>
            <SEO title={langs.text_reset_password} />

            <SignLayout>
                <FormWrap
                    {...!success && { title: langs.text_reset_password }}
                >
                    {
                        success ? (

                            <ResetPasswordSuccessLayout>
                                <FormSuccessMesg mesg={langs.text_new_password_success} />

                                <div className="form-row form-row-btns">
                                    <BtnDirectLayout
                                        url="/signin"
                                        text={langs.btn_return_to_signin}
                                        className="reset-pawd-success"
                                    />
                                </div>
                            </ResetPasswordSuccessLayout>

                        ) : (

                            <form onSubmit={handleSubmit(handleReqData)}>
                                <FormRow
                                    name="password"
                                    errors={errors}
                                    className="row-password"
                                >
                                    <input
                                        type={paswdConfig[toggle.password].type}
                                        name="password"
                                        placeholder={langs.text_new_password}
                                        {...register('password', {
                                            required: true,
                                            minLength: {
                                                value: 8,
                                                message: langs.error_password_at_least_eight,
                                            },
                                            pattern: {
                                                value: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
                                                message: langs.error_pattern,
                                            },
                                        })}
                                    />

                                     <span onClick={() => handleToggle('password')}>
                                        <FontIcon icon={paswdConfig[toggle.password].icon} />
                                    </span>
                                </FormRow>

                                <FormRow
                                    name="confirm_password"
                                    errors={errors}
                                    className="row-password"
                                >
                                    <input
                                        type={paswdConfig[toggle.confirm].type}
                                        name="confirm_password"
                                        placeholder={langs.text_confirm_password}
                                        {...register('confirm_password', {
                                            required: true,
                                            validate: (value) => (value === password.current) || langs.error_password_different,
                                        })}
                                    />

                                    <span onClick={() => handleToggle('confirm')}>
                                        <FontIcon icon={paswdConfig[toggle.confirm].icon} />
                                    </span>
                                </FormRow>

                                <div className="form-row form-row-btns">
                                    <Buttons
                                        type="submit"
                                        text={langs.btn_submit}
                                    />
                                </div>
                            </form>

                        )
                    }
                </FormWrap>
            </SignLayout>
        </Fragment>

    );

};

export default ResetPassword;
