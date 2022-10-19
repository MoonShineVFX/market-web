import { useContext } from 'react';
import { useNavigate, useParams, redirect } from 'react-router-dom';
import { styled } from '@mui/system';
import Cookies from 'js-cookie';
import Box from '../../components/Box';
import Links from '../../components/Links';
import { GlobalContext } from '../../context/global.state';

//
const MyAccountLayout = styled(Box)(({ theme }) => ({
    minWidth: '150px',
    top: '100px',
    right: '30px',
    '.menu-item': {
        lineHeight: '1',
        color: theme.palette.textColor,
        textDecoration: 'none',
        display: 'block',
        padding: '20px 30px',
        ':not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.bgColor}`,
        },
    },
}));

//
const MyAccountBox = () => {

    // Route
    const navigate = useNavigate();
    const { locale } = useParams();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Hook
    const { deftags } = useContext(GlobalContext);

    // Menu
    const menus = {
        account: deftags.member_account_center,
        logout: deftags.text_logout,
    };

    // 當頁再次點擊要關閉 box
    const handleClickAccount = () => globalDispatch({ type: 'target_box', payload: '' });

    // 登出
    const handleClickLogout = (e) => {

        e.preventDefault();
        Cookies.remove('token');
        globalDispatch({ type: 'target_box', payload: '' });
        localStorage.removeItem('cartItem'); // 清除暫存購物車
        navigate(0); // 會導去登入頁

    };

    return (

        <MyAccountLayout>
            {
                Object.keys(menus).map((key) => (

                    <Links
                        key={key}
                        url={(key === 'logout') ? '#' : `/${locale}/member/${key}`}
                        title={menus[key]}
                        className="menu-item"
                        onClick={(key === 'logout') ? handleClickLogout : handleClickAccount}
                    >
                        {menus[key]}
                    </Links>

                ))
            }
        </MyAccountLayout>

    );

};

export default MyAccountBox;
