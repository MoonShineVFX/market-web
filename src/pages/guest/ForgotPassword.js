import {
    Fragment,
    useState,
    useContext,
    useEffect,
} from 'react';
import { useForm } from 'react-hook-form';

import { SignLayout, BtnDirectLayout } from './memberSignLayout';
import SEO from '../../containers/SEO';
import Buttons from '../../components/Buttons';
import FormWrap, { FormRow, FormSuccessMesg } from '../../components/FormWrap';

import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const ForgotPassword = () => {

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

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
    const [success, setSuccess] = useState(false);

    // 送資料
    const handleReqData = (reqData) => {

        Service.forgotPassword(reqData)
            .then(() => setSuccess(true));

    };

    return (

        <Fragment>
            <SEO title={deftags.text_forgot_password} />

            <SignLayout>
                <FormWrap
                    {...!success && { title: deftags.text_forgot_password }}
                >
                    {
                        success ? <FormSuccessMesg mesg={deftags.text_email_sent} /> : (

                            <form onSubmit={handleSubmit(handleReqData)}>
                                <FormRow
                                    name="email"
                                    errors={errors}
                                >
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder={deftags.text_enter_register_email}
                                        {...register('email', { required: true })}
                                    />
                                </FormRow>

                                <div className="form-row form-row-btns">
                                    <Buttons
                                        type="submit"
                                        text={deftags.btn_get_reset_password_link}
                                    />

                                    <BtnDirectLayout
                                        type="third"
                                        url="/signin"
                                        text={deftags.btn_return_to_signin}
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

export default ForgotPassword;
