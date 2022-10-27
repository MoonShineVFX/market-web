import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BtnDirectLayout } from '../guest/memberSignLayout';
import { BoxWrapLayout } from './accountLayout';
import Buttons from '../../components/Buttons';
import { FormRow } from '../../components/FormWrap';
import Service from '../../utils/util.service';
import { GlobalContext } from '../../context/global.state';

const MyAccount = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            const data = await Service.myAccount();
            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, []);

    // 送資料
    const handleReqData = (reqData) => {

        Service.updateMyAccount(reqData)
            .then(() => {

                alert('更新成功');
                globalDispatch({
                    type: 'update_account',
                    payload: reqData,
                });

            });

    };

    return !isDefer && (

        <BoxWrapLayout>
            <div className="row">
                <h4 className="title">{deftags.text_account}</h4>
                {pageData.email}
            </div>

            <form onSubmit={handleSubmit(handleReqData)}>
                <FormRow name="realName">
                    <div className="title">{deftags.cart_member_real_name}</div>
                    <input
                        type="text"
                        name="realName"
                        placeholder={deftags.cart_member_real_name}
                        defaultValue={pageData.realName}
                        {...register('realName')}
                    />
                </FormRow>

                <FormRow name="address">
                    <div className="title">{deftags.cart_member_address}</div>
                    <input
                        type="text"
                        name="address"
                        placeholder={deftags.cart_member_address}
                        defaultValue={pageData.address}
                        {...register('address')}
                    />
                </FormRow>

                <div className="form-row Model-form-button">
                    <Buttons
                        type="submit"
                        text={deftags.btn_saved}
                    />

                    <BtnDirectLayout
                        type="third"
                        url={`/${locale}/member/change_password`}
                        text={deftags.member_change_password}
                    />
                </div>
            </form>
        </BoxWrapLayout>

    );

};

export default MyAccount;
