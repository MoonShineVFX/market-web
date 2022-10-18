import { styled } from '@mui/system';
import Links from '../../components/Links';
import FormWrap from '../../components/FormWrap';

// 外層 form
const TitleLayout = styled('h1')(({ theme }) => ({
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: '60px',
    [theme.breakpoints.down('mobile')]: {
        marginBottom: '60px',
    },
    [theme.breakpoints.down('middle')]: {
        marginBottom: '40px',
    },
}));

//
const SectionLayout = styled('section')(({ theme }) => ({
    maxWidth: '760px',
    margin: '0 auto',
    '.title-large': {
        fontSize: '1.25em',
        fontWeight: 'normal',
        marginBottom: '30px',
        opacity: '0.8',
    },
    '.btn-action': {
        textAlign: 'center',
        'p': {
            marginTop: '20px',
            opacity: '0.6',
        },
    },
    '.model-button': {
        width: '100%',
        maxWidth: '480px',
        fontSize: '1.25em',
        borderRadius: '40px',
        margin: '40px auto 0',
        padding: '16px 10px',
    },
    '.right': {
        '> *:nth-of-type(2)': {
            textAlign: 'right',
        },
    },
}));

// 購物車
const CartLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    padding: '40px 30px',
    '.item-cell': {
        display: 'flex',
        alignItems: 'center',
        '> *': {
            flex: '1',
        },
    },
    '.items': {
        marginBottom: '60px',
    },
    '.amount': {
        fontSize: '1.15em',
        borderTop: `1px dashed ${theme.palette.border.dark}`,
        paddingTop: '40px',
        '.price': {
            fontSize: '1.25em',
            fontWeight: 'normal',
            color: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('mobile')]: {
        '.amount .price': {
            fontSize: '1em',
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: '20px',
        '.amount': {
            paddingTop: '30px',
            paddingBottom: '10px',
            '.price': {
                fontSize: '1.2em',
                float: 'right',
                marginTop: '-4px',
            },
        },
    },
}));

// 商品
const ItemLayout = styled(Links)(({ theme }) => ({
    fontSize: '1.25em',
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'flex',
    marginBottom: '30px',
    '.thumb': {
        maxWidth: '103px',
        height: '66px',
        borderRadius: '10px',
        marginRight: '20px',
        overflow: 'hidden',
    },
    '.info': {
        width: 'calc(100% - 103px)',
        fontSize: '0.9em',
        '> *': {
            fontWeight: 'normal',
        },
    },
    '.title': {
        margin: '0',
        WebkitLineClamp: theme.lineClamp(2),
    },
    '.price': {
        fontSize: '0.9em',
        fontWeight: 'normal',
    },
    '.action': {
        fontSize: '1em',
        color: theme.palette.error.light,
        padding: '4px',
        float: 'right',
    },
    [theme.breakpoints.down('mobile')]: {
        '.thumb': {
            marginRight: '10px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.thumb': {
            marginRight: '10px',
        },
        '.title': {
            fontSize: '0.85em',
        },
        '.price': {
            fontSize: '1em',
        },
        '.amount': {
            fontSize: '1em',
        },
    },
}));

// 會員與發票資訊
const InvoiceFormWrapLayout = styled(FormWrap)(({ theme }) => ({
    'section': {
        marginBottom: '60px',
        '.title': {
            fontWeight: 'normal',
            borderBottom: `1px solid ${theme.palette.border.dark}`,
            paddingBottom: '20px',
        },
    },
    '.row': {
        marginBottom: '30px',
    },
    '.row-title': {
        margin: '0 0 16px',
        opacity: '0.65',
    },
    '.warning-text': {
        fontSize: '0.9em',
        textAlign: 'center',
    },
}));

//
const RadioButtonLayout = styled('label')(({ theme }) => ({
    'input': {
        width: '12px',
        height: '12px',
    },
}));

export {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
    InvoiceFormWrapLayout,
    RadioButtonLayout,
};
