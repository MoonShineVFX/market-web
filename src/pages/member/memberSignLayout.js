import { styled } from '@mui/system';
import Links, { ButtonLink } from '../../components/Links';

// 外層 form
const SignLayout = styled('section')(({ theme }) => ({
    '.model-button': {
        marginBottom: '30px',
    },
    'p': {
        fontSize: '0.8em',
        'a': {
            color: theme.palette.textColor,
        },
    },
    [theme.breakpoints.up('sm')]: {
        marginTop: '60px',
    },
}));

// 導頁按鈕
const BtnDirectLayout = styled(ButtonLink)(({ theme }) => ({
    display: 'block',
    borderTop: `1px dashed ${theme.palette.border.dark}`,
    marginTop: '50px',
    paddingTop: '50px',
    [theme.breakpoints.down('middle')]: {
        marginTop: '40px',
        paddingTop: '40px',
    },
}));

// 註冊頁
const AggreeLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    display: 'inline-block',
}));

// 忘記密碼連結
const ForgotPasswordLayout = styled('div')(({ theme }) => ({
    textAlign: 'center',
    margin: '30px 0 -20px',
    'a': {
        fontSize: '1.15em',
        textDecoration: 'underline',
        color: theme.palette.textColor,
        opacity: '0.6',
    },
}));

// 重設密碼
const ResetPasswordSuccessLayout = styled('div')(({ theme }) => ({
    'p': {
        margin: '100px 0 0',
    },
    'a': {
        borderTop: '0',
    },
}));

export {
    SignLayout,
    BtnDirectLayout,
    AggreeLayout,
    ForgotPasswordLayout,
    ResetPasswordSuccessLayout,
};
