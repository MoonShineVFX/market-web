import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Tabs, Tab, useMediaQuery } from '@mui/material';
import { TitleLayout } from '../cart/cartLayout';
import { TabWrapLayout } from './accountLayout';
import SEO from '../../containers/SEO';
import MyProduct from './MyProduct';
import OrderRecord from './OrderRecord';
import MyAccount from './MyAccount';
import { GlobalContext } from '../../context/global.state';

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

//
const AccountCenter = () => {

    // Context
    const { deftags } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));

    // State
    const [type, setType] = useState('product');
    const [types, setTypes] = useState(null);

    useEffect(() => {

        setTypes({
            product: {
                title: deftags.member_my_product,
                component: <MyProduct />,
            },
            order: {
                title: deftags.order_text_order_record,
                component: <OrderRecord />,
            },
            account: {
                title: deftags.member_account_update,
                component: <MyAccount />,
            },
        });

    }, [deftags]);

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => setType(newValue);

    return types && (

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

export default AccountCenter;
