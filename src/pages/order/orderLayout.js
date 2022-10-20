import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { BoxWrapLayout } from '../member/accountLayout';
import Links from '../../components/Links';

// Web 訂單紀錄
const OrderRecordLayout = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.border.dark}`,
    '.item-row': {
        display: 'flex',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.border.dark}`,
        },
    },
    '.item-cell': {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 8px',
        '&:not(:last-child)': {
            borderRight: `1px solid ${theme.palette.border.dark}`,
        },
        '&.cell-80': {
            maxWidth: '80px',
        },
        '&.cell-140': {
            maxWidth: '140px',
        },
        '&.cell-160': {
            maxWidth: '160px',
        },
        '&.cell-180': {
            maxWidth: '180px',
        },
    },
    '.orderNumber': {
        color: theme.palette.textColor,
        display: 'inline-block',
        wordBreak: 'break-word',
    },
    '.invoice': {
        wordBreak: 'break-word',
    },
}));

// mWeb
const OrderRecordGridLayout = styled(Grid)(({ theme }) => ({
    '.card-wrap': {
        fontSize: '0.9em',
        color: theme.palette.textColor,
        textDecoration: 'none',
        border: `1px solid ${theme.palette.border.dark}`,
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px 0 0',
    },
    '.item': {
        flex: '0 0 calc(100% / 2)',
        marginBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    '.title': {
        marginTop: '0',
        marginBottom: '4px',
        opacity: '0.7',
    },
    '.orderNumber, .invoice': {
        wordBreak: 'break-word',
    },
}));

// 訂單詳細
const OrderDetailLayout = styled(BoxWrapLayout)(({ theme }) => ({
    maxWidth: '800px',
    position: 'relative',
    padding: '60px',
    '.info': {
        marginBottom: '20px',
    },
    '.row-item': {
        marginBottom: '20px',
        '.title': {
            marginBottom: '4px',
            opacity: '0.6',
        },
        '.value': {
            fontSize: '0.8em',
        },
    },
    '.items-container': {
        borderTop: `1px dashed ${theme.palette.border.dark}`,
    },
    '.items': {
        padding: '60px 0',
    },
    '.btn-action': {
        textAlign: 'center',
        'button': {
            paddingLeft: '60px',
            paddingRight: '60px',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        '.items': {
            padding: '40px 0',
        },
        '.btn-action': {
            'button': {
                width: '100%',
            },
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: '30px',
        '.row-item': {
            fontSize: '1.25em',
        },
    },
    [theme.breakpoints.down('middle')]: {
        padding: '30px 20px',
    },
}));

// 購買商品
const ItemLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '.thumb': {
        height: '110px',
        borderRadius: theme.borderRadius,
        marginRight: '16px',
        overflow: 'hidden',
    },
    '.content': {
        flex: '0 0 calc(100% - 150px)',
        opacity: '0.6',
        '.title': {
            minHeight: '45px',
            fontSize: '0.8em',
            lineHeight: '1.4',
            marginBottom: '10px',
            opacity: '1',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.content': {
            fontSize: '1.25em',
            '.title': {
                minHeight: '43px',
            },
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.thumb': {
            height: '95px',
        },
        '.content': {
            fontSize: '1.15em',
            flex: '0 0 calc(100% - 130px)',
        },
    },
}));

export {
    OrderRecordLayout,
    OrderRecordGridLayout,
    OrderDetailLayout,
    ItemLayout,
};
