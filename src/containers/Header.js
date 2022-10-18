import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TawkTo from 'tawkto-react';
import { Box, useMediaQuery } from '@mui/material';
import { faShoppingCart, faThLarge } from '@fortawesome/free-solid-svg-icons';

import {
    AppBarLayout,
    HeaderLayout,
    ShoppingCartLayout,
} from './globalLayout';
import { ButtonLink } from '../components/Links';
import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Navbar from './Navbar';
import SideNavIcon from './SideNavIcon';
import MyAccountBox from '../pages/member/MyAccount';
import SideNav from './SideNav';

import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';
import useLocalStorage from '../hooks/useLocalStorage';
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

// 整理購物車資料結構
const arrangeCartList = (array) => array.reduce((acc, obj) => {

    acc[obj.productId] = acc[obj.productId] || {};
    acc[obj.productId].title = obj.title;
    acc[obj.productId].imgUrl = obj.imgUrl;
    acc[obj.productId].price = obj.price;
    return acc;

}, {});

//
const Header = () => {

    useGoogleAnalytics();

    // Route
    const { locale } = useParams();

    // Context
    const {
        deftags,
        logged,
        targetBox,
        sideNav,
        cart,
        globalDispatch,
    } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
    const [cartItem, setCartItem] = useLocalStorage('cartItem');

    // 第三方
    useEffect(() => {

        // Tawk 線上客服
        const tawk = new TawkTo(
            process.env.REACT_APP_TAWKTO_PROPERTYID,
            process.env.REACT_APP_TAWKTO_TAWKID
        );
        tawk.showWidget();

    });

    useEffect(() => {

        // 手機版側邊欄
        if (!matches) globalDispatch({ type: 'sidenav', payload: false });
        document.body.style.overflow = sideNav ? 'hidden' : '';

        // 有登入並更新當前登入者的購物車
        if (logged) {

            Service.cartList()
                .then(({ list }) => {

                    setCartItem(arrangeCartList(list));
                    globalDispatch({
                        type: 'cart_list',
                        payload: {
                            count: list.length,
                            items: arrangeCartList(list),
                        },
                    });

                });

        }

        globalDispatch({
            type: 'cart_list',
            payload: {
                count: Object.entries(cartItem || {}).length,
                items: cartItem ?? {},
            },
        });

    }, [logged, globalDispatch, sideNav]);

    // 購物車與我的帳號 box
    const handleClickBox = (type) => {

        globalDispatch({
            type: 'target_box',
            payload: (type !== targetBox) ? type : '',
        });

    };

    // 手機版 sidenav: 點擊
    const handleClickSideNav = () => globalDispatch({ type: 'sidenav', payload: !sideNav });

    return (

        <AppBarLayout>
            <HeaderLayout className="Model-container">
                <Box sx={{ flexGrow: 1 }}>
                    <Logo />
                    <Navbar />
                </Box>

                <Box sx={{
                    display: { xs: 'none', mobile: 'flex' },
                    alignItems: 'center',
                }}>
                    <ShoppingCartLayout
                        url={`/${logged ? 'cart' : 'signin'}`}
                        data-device={matches ? 'mobile' : 'desktop'}
                    >
                        <FontIcon icon={faShoppingCart} />
                        <span className="count">({cart.count})</span>
                    </ShoppingCartLayout>

                    {
                        logged ? (

                            <Buttons
                                text={deftags.member_my_account}
                                variant="outlined"
                                onClick={() => handleClickBox('myAccount')}
                            />

                        ) : (

                            <ButtonLink
                                url={`/${locale}/signin`}
                                text={deftags.text_signin}
                            />

                        )
                    }

                    {(targetBox === 'myAccount') && <MyAccountBox />}
                </Box>

                <Box sx={{
                    display: { xs: 'flex', mobile: 'none' }
                }}>
                    <SideNavIcon
                        icon={faThLarge}
                        onClick={handleClickSideNav}
                    />
                </Box>
            </HeaderLayout>

            <SideNav />
        </AppBarLayout>

    );

};

export default Header;
