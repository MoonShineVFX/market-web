import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SideNavLayout } from './globalLayout';
import Links from '../components/Links';
import FontIcon from '../components/FontIcon';
import Community from '../components/Community';
import Navbar from './Navbar';
import SideNavIcon from './SideNavIcon';
import { GlobalContext } from '../context/global.state';

const Sidenav = () => {

    // Route
    const navigate = useNavigate();

    // Context
    const {
        deftags,
        logged,
        cartCount,
        sideNav,
        globalDispatch,
    } = useContext(GlobalContext);

    // 手機版 sidenav: 關閉
    const handleHideSideNav = () => globalDispatch({ type: 'sidenav', payload: false });

    // mWeb: 登出
    const handleClickLogout = (e) => {

        e.preventDefault();
        globalDispatch({ type: 'target_box', payload: '' });
        localStorage.removeItem('cartItem'); // 清除暫存購物車
        navigate(0); // 會導去登入頁

    };

    return (

        <SideNavLayout className={sideNav ? 'active' : ''}>
            <div className="wrap">
                <div className="sidenav-item">
                    <SideNavIcon
                        className="btn-close"
                        icon={faTimes}
                        onClick={handleHideSideNav}
                    />
                </div>

                <Links
                    url={logged ? '/cart' : '/signin'}
                    className="shopping-cart"
                >
                    <FontIcon icon={faShoppingCart} />
                    <span className="count">({cartCount})</span>
                </Links>

                <Links url={logged ? '/member/account' : '/signin'}>
                    {logged ? deftags.member_account_center : deftags.text_signin}
                </Links>

                <Navbar className="mWeb-navbar" />

                {
                    logged &&
                        <Links
                            url="#"
                            onClick={handleClickLogout}
                        >
                            {deftags.text_logout}
                        </Links>
                }

                {
                    // Betty: 暫且沒有社群
                    false && <Community />
                }
            </div>
            <div className="mask" onClick={handleHideSideNav}></div>
        </SideNavLayout>

    );

};

export default Sidenav;
