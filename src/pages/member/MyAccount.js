import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BtnDirectLayout } from '../member/memberSignLayout';
import { BoxWrapLayout } from './accountLayout';
import Buttons from '../../components/Buttons';
import { FormRow } from '../../components/FormWrap';
import Service from '../../utils/util.service';
import { GlobalContext } from '../../context/global.state';

const MyAccount = ({ data }) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        Service.updateMyAccount(reqData)
            .then(() => alert('更新成功'));

    };

    return (

        <BoxWrapLayout>
            <div className="row">
                <h4 className="title">{deftags.text_account}</h4>
                {data.email}
            </div>

            <form onSubmit={handleSubmit(handleReqData)}>
                <FormRow name="realName">
                    <div className="title">{deftags.cart_member_real_name}</div>
                    <input
                        type="text"
                        name="realName"
                        placeholder={deftags.cart_member_real_name}
                        defaultValue={data.realName}
                        {...register('realName')}
                    />
                </FormRow>

                <FormRow name="address">
                    <div className="title">{deftags.cart_member_address}</div>
                    <input
                        type="text"
                        name="address"
                        placeholder={deftags.cart_member_address}
                        defaultValue={data.address}
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
                        url="/member/change_password"
                        text={deftags.member_change_password}
                    />
                </div>
            </form>
        </BoxWrapLayout>

    );

};

export default MyAccount;
