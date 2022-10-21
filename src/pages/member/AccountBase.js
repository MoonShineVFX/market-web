import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { Tabs, Tab, useMediaQuery } from '@mui/material';

import { TitleLayout } from '../cart/cartLayout';
import { TabWrapLayout } from './accountLayout';
import SEO from '../../containers/SEO';

import MyProduct from './MyProduct';
import OrderRecord from './OrderRecord';
import MyAccount from './MyAccount';

import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

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
const AccountBase = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));

    // State
    const [type, setType] = useState('product');
    const [orderRecordList, setOrderRecordList] = useState([]);
    const [profile, setProfile] = useState({});
    const [isDefer, setIsDefer] = useState(true);
    const [types, setTypes] = useState(null);

    useEffect(() => {

        const fetchData = async() => {

            const data = await Service.myProduct(locale);
            setTypes({
                product: {
                    title: deftags.member_my_product,
                    component: data.list.length ? <MyProduct data={data.list} /> : <EmptyMesg />,
                },
                order: {
                    title: deftags.order_text_order_record,
                    component: orderRecordList.length ? <OrderRecord data={orderRecordList} /> : <EmptyMesg />,
                },
                account: {
                    title: deftags.member_account_update,
                    component: <MyAccount data={profile} />,
                },
            });

            if (data) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, locale, deftags.member_account_update, deftags.member_my_product, deftags.order_text_order_record, orderRecordList, profile]);

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

    return !isDefer && (

        <Fragment>
            <SEO title={`${deftags.member_account_center}-${types[type].title}`} />
            <TitleLayout>{deftags.member_account_center}</TitleLayout>

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
                    (matches && (type === 'product')) && <p className="download-notice">{deftags.member_mobile_download_notice}</p>
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

export default AccountBase;
