import React, {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Tabs, Tab, useMediaQuery } from '@mui/material';

import { TitleLayout } from '../../src/components/cart/cartLayout';
import { TabWrapLayout } from '../../src/components/member/accountLayout';
import Head from '../../src/containers/Head';

import MyProduct from '../../src/components/member/MyProduct';
import OrderRecord from '../../src/components/member/OrderRecord';
import MyAccount from '../../src/components/member/MyAccount';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import Service from '../../src/utils/util.service';

//
const TabPanel = ({ value, indexKey, children, ...other }) => (

    <div
        role="tabpanel"
        hidden={value !== indexKey}
        {...other}
    >
        {(value === indexKey) && children}
    </div>

);

// Empty
const EmptyMesg = () => {

    // Context
    const { deftags } = useContext(GlobalContext);
    return <p>{deftags.member_no_data}</p>;

};

//
const Account = ({ langs, pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));

    // State
    const [type, setType] = useState('product');
    const [orderRecordList, setOrderRecordList] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 所有 type
    const types = {
        product: {
            title: langs.member_my_product,
            component: pageData.list.length ? <MyProduct data={pageData.list} /> : <EmptyMesg />,
        },
        order: {
            title: langs.order_text_order_record,
            component: orderRecordList.length ? <OrderRecord data={orderRecordList} /> : <EmptyMesg />,
        },
        account: {
            title: langs.member_account_update,
            component: <MyAccount data={profile} />,
        },
    };

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => {

        const key = (newValue === 'order') ? 'orderRecord' : 'myAccount';
        setType(newValue);

        if (newValue !== 'product' && (!orderRecordList.length || !Object.entries(profile).length)) {

            Service[key]().then((data) => {

                if (newValue === 'order') setOrderRecordList(data.list);
                else setProfile(data);

            });

        }

    };

    return (

        <Fragment>
            <Head
                title={`${langs.member_account_center}-${types[type].title}`}
                description={langs.og_description}
            />
            <TitleLayout>{langs.member_account_center}</TitleLayout>

            <TabWrapLayout>
                <Tabs
                    className="tab-menu"
                    value={type}
                    onChange={handleChangeTabMenu}
                >
                    {
                        Object.keys(types).map((key) => (

                            <Tab
                                key={key}
                                value={key}
                                label={types[key].title}
                            />

                        ))
                    }
                </Tabs>

                {
                    // 手機版下載提示
                    (matches && (type === 'product')) && <p className="download-notice">{langs.member_mobile_download_notice}</p>
                }

                <div className={`tab-panel panel-${type}`}>
                    {
                        Object.keys(types).map((key) => (

                            <TabPanel
                                key={key}
                                value={key}
                                indexKey={type}
                            >
                                {types[type].component}
                            </TabPanel>

                        ))
                    }
                </div>
            </TabWrapLayout>
        </Fragment>

    );

};

export default Account;

export async function getServerSideProps ({ req, locale }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        url: `/my_products?lang=${locale}`,
        headers: {
            Authorization: `Bearer ${req.cookies.token}`,
        },
    });

    const { data } = resData;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: data.data,
        },
    };

}
