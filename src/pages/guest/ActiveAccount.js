import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Result from '../../components/Result';
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

//
const ActiveAccount = ({ langs }) => {

    // Route
    const { locale } = useParams();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        const fetchData = async () => {

            const data = await Service.activeAccount(locale);
            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, locale]);

    return !isDefer && (

        <Result
            title={langs.text_active_account_title}
            message={langs.text_active_account_message}
            btnText={langs.btn_return_to_signin}
            linkTo={`/${locale}/signin`}
        />

    );

};

export default ActiveAccount;
