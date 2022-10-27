import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SignLayout, BtnDirectLayout } from '../guest/memberSignLayout';
import SEO from '../../containers/SEO';
import Buttons from '../../components/Buttons';
import FontIcon from '../../components/FontIcon';
import FormWrap, { FormRow } from '../../components/FormWrap';
import Lightbox from '../../components/Lightbox';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { paswdConfig } = utilConst;

const ChangePassword = () => {

    // Route
    const navigate = useNavigate();
    const { locale } = useParams();

    // Context
    const {
        deftags,
        visible,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [goToAccount, setGoToAccount] = useState('');

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });
        lightboxDispatch({ type: 'HIDE' }); // reset lightbox state
        setGoToAccount(`/${locale}/member/account`);

    }, [globalDispatch, lightboxDispatch, locale]);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();

    // useRef
    const password = useRef({});
    password.current = watch('newPassword', '');

    // State
    const [toggle, setToggle] = useState({
        password: false,
        newPassword: false,
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

        Service.changePassword(reqData)
            .then(() => lightboxDispatch({ type: 'SHOW' }));

    };

    return (

        <Fragment>
            <SEO title={deftags.member_change_password} />

            <SignLayout>
                <FormWrap>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="password"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.password].type}
                                name="password"
                                placeholder={deftags.member_old_password}
                                {...register('password', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: deftags.error_password_at_least_eight,
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
                                        message: deftags.error_pattern,
                                    },
                                })}
                            />
                                <span onClick={() => handleToggle('password')}>
                                <FontIcon icon={paswdConfig[toggle.password].icon} />
                            </span>
                        </FormRow>

                        <FormRow
                            name="newPassword"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.newPassword].type}
                                name="newPassword"
                                placeholder={deftags.text_new_password}
                                {...register('newPassword', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: deftags.error_password_at_least_eight,
                                    },
                                    validate: (value) => (value === password.current) || deftags.error_password_different,
                                })}
                            />

                            <span onClick={() => handleToggle('newPassword')}>
                                <FontIcon icon={paswdConfig[toggle.newPassword].icon} />
                            </span>
                        </FormRow>

                        <FormRow
                            name="confirmNewPassword"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.confirm].type}
                                name="confirmNewPassword"
                                placeholder={deftags.text_confirm_password}
                                {...register('confirmNewPassword', {
                                    required: true,
                                    validate: (value) => (value === password.current) || deftags.error_password_different,
                                })}
                            />

                            <span onClick={() => handleToggle('confirm')}>
                                <FontIcon icon={paswdConfig[toggle.confirm].icon} />
                            </span>
                        </FormRow>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={deftags.btn_submit}
                            />

                            <BtnDirectLayout
                                type="third"
                                url={goToAccount}
                                text={deftags.text_return_to_account}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>

            {
                visible &&
                    <Lightbox
                        type="success"
                        onClick={() => navigate(goToAccount)}
                    >
                        {deftags.member_change_password_success}
                    </Lightbox>
            }
        </Fragment>

    );

};

export default ChangePassword;
