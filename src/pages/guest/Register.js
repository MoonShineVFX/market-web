import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    SignLayout,
    BtnDirectLayout,
    AggreeLayout,
    ForgotPasswordLayout,
} from './memberSignLayout';
import SEO from '../../containers/SEO';
import Buttons from '../../components/Buttons';
import Checkbox from '../../components/Checkbox';
import FormWrap, { FormRow } from '../../components/FormWrap';
import FontIcon from '../../components/FontIcon';
import Lightbox from '../../components/Lightbox';

import { GlobalContext } from '../../context/global.state';
import utilConst from '../../utils/util.const';
import Service from '../../utils/util.service';

const { paswdConfig } = utilConst;

const Register = () => {

    // Route
    const { locale } = useParams();

    // Context
    const {
        deftags,
        visible,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, [globalDispatch]);

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
    const [disabled, setDisabled] = useState(true);
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

    // 我同意 checkbox
    const handleAgree = () => setDisabled(!disabled);

    // 送資料
    const handleReqData = (reqData) => {

        delete reqData.confirm_password;
        Service.register(reqData)
            .then(() => lightboxDispatch({ type: 'SHOW' }));

    };

    return (

        <Fragment>
            <SEO title={deftags.text_register} />
            <SignLayout>
                <FormWrap title={deftags.text_register}>
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
                                placeholder={deftags.text_enter_password}
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

                        <FormRow
                            name="confirm_password"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.confirm].type}
                                name="confirm_password"
                                placeholder={deftags.text_confirm_password}
                                {...register('confirm_password', {
                                    required: true,
                                    validate: (value) => (value === password.current) || deftags.error_password_different,
                                })}
                            />

                            <span onClick={() => handleToggle('confirm')}>
                                <FontIcon icon={paswdConfig[toggle.confirm].icon} />
                            </span>
                        </FormRow>

                        <div className="form-row">
                            <Checkbox
                                name="agree"
                                onChange={handleAgree}
                            >
                                <AggreeLayout url={`/${locale}/privacy`} newPage>{deftags.text_agree_privacy}</AggreeLayout>
                            </Checkbox>
                        </div>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={deftags.text_register}
                                disabled={disabled}
                            />

                            <ForgotPasswordLayout />

                            <BtnDirectLayout
                                type="third"
                                url={`/${locale}/signin`}
                                text={deftags.btn_return_to_signin}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>

            {
                visible &&
                    <Lightbox
                        type="success"
                        onClick={() => lightboxDispatch({ type: 'HIDE' })}
                    >
                        {deftags.text_register_success_message}
                    </Lightbox>
            }
        </Fragment>

    );

};

export default Register;
