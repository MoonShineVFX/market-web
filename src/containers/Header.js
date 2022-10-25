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
import MyAccountBox from '../pages/member/MyAccountBox';
import SideNav from './SideNav';

import { GlobalContext } from '../context/global.state';
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';
import useCarts from '../hooks/useCarts';

const Header = () => {

    // Route
    const { locale } = useParams();

    // Context
    const {
        deftags,
        user,
        targetBox,
        sideNav,
        globalDispatch,
    } = useContext(GlobalContext);

    // Hook
    useGoogleAnalytics();
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
    const { cartList } = useCarts();

    // 第三方
    useEffect(() => {

        // Tawk 線上客服
        const tawk = new TawkTo(
            process.env.REACT_APP_TAWKTO_PROPERTYID,
            process.env.REACT_APP_TAWKTO_TAWKID
        );

        tawk.showWidget();

        // 手機版側邊欄
        if (!matches) globalDispatch({ type: 'sidenav', payload: false });
        document.body.style.overflow = sideNav ? 'hidden' : '';

        // console.log('header carts:', carts)

    }, [globalDispatch, matches, sideNav]);

    // 購物車與我的帳號 box
    const handleClickBox = (type) => {

        globalDispatch({
            type: 'target_box',
            payload: (type !== targetBox) ? type : '',
        });

    };

    // 手機版 sidenav: 點擊
    const handleClickSideNav = () => globalDispatch({ type: 'sidenav', payload: !sideNav });

    // console.log('header cartList:', cartList);

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
                        url={`/${locale}/${user ? 'cart' : 'signin'}`}
                        data-device={matches ? 'mobile' : 'desktop'}
                    >
                        <FontIcon icon={faShoppingCart} />
                        <span className="count">({cartList?.list.length ?? 0})</span>
                    </ShoppingCartLayout>

                    {
                        user ? (

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
