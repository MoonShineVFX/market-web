import { styled } from '@mui/system';
import Box from '../../components/Box';

// Tab
const TabWrapLayout = styled('section')(({ theme }) => ({
    '.MuiTabs-indicator': {
        display: 'none',
    },
    '.tab-menu': {
        backgroundColor: theme.palette.card.main,
        margin: 'auto',
        '&:before': {
            content: "''",
            width: '100%',
            height: '70px',
            backgroundColor: theme.palette.card.main,
            position: 'absolute',
            left: '0',
            zIndex: '0',
        },
        'button': {
            height: '70px',
            fontSize: '1em',
            color: theme.palette.textColor,
            margin: '0 30px',
            padding: '0 30px',
            flex: '1',
            opacity: '0.6',
            '&.Mui-selected': {
                fontWeight: 'normal',
                color: theme.palette.textColor,
                opacity: '1',
                '&:after': {
                    content: "''",
                    width: '100%',
                    height: '4px',
                    backgroundColor: theme.palette.primary.main,
                    position: 'absolute',
                    left: '0',
                    bottom: '0',
                },
            },
        },
    },
    '.tab-panel': {
        paddingTop: '80px',
    },
    '.MuiTabs-flexContainer': {
        display: 'block',
        textAlign: 'center',
    },
    [theme.breakpoints.down('mobile')]: {
        '.tab-menu button': {
            paddingLeft: '20px',
            paddingRight: '20px',
        },
        '.download-notice': {
            fontSize: '0.8em',
            margin: '50px 0 0',
            opacity: '0.6',
        },
        '.tab-panel': {
            paddingTop: '40px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.tab-menu': {
            fontSize: '0.9em',
            minHeight: 'auto',
            '&:before': {
                height: '58px',
            },
            'button': {
                height: '58px',
                margin: '0',
            },
        },
        '.MuiTabs-flexContainer': {
            display: 'flex',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.item-content': {
            padding: '20px',
        },
    },
}));

// 我的模型庫
const ItemLayout = styled('div')(({ theme }) => ({
    lineHeight: '1.4',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'default',
    '.item-content': {
        backgroundColor: theme.palette.card.main,
        padding: '30px',
    },
    '.item-thumb': {
        height: '239px',
        borderRadius: '0',
        display: 'block',
    },
    'img': {
        width: '100%',
    },
    '.title': {
        WebkitLineClamp: theme.lineClamp(1),
        margin: '0 0 10px',
    },
    '.file-size': {
        fontSize: '0.9em',
        opacity: '0.6',
    },
    '.downloadWrap': {
        marginTop: '20px',
    },
    '.options': {
        textAlign: 'right',
        marginBottom: '20px',
    },
    'select': {
        fontSize: '0.9em',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.card.main,
        border: '1px solid',
        borderRadius: theme.borderRadius,
        marginLeft: '12px',
        padding: '12px 20px',
        opacity: '0.8',
    },
    '.btn-download': {
        textAlign: 'right',
    },
    '.model-button': {
        borderRadius: '4px',
        marginTop: '24px',
        paddingTop: '4px',
        paddingBottom: '4px',
        position: 'relative',
        zIndex: '1',
        '&.default': {
            marginTop: '0',
            padding: '12px 70px',
        },
    },
    '.disabled': {
        pointerEvents: 'none',
        cursor: 'default',
        '.model-button': {
            color: '#A6A6A6',
            backgroundColor: '#CCC',
        },
    },
}));

// 訂單紀錄 && 詳細頁
// order/orderLayout.js

// 修改會員資料
const BoxWrapLayout = styled(Box)(({ theme }) => ({
    maxWidth: '560px',
    fontSize: '1.25em',
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    margin: 'auto',
    padding: '50px 40px',
    position: 'relative',
    top: 'initial',
    '.row': {
        lineHeight: '1.4',
        '&:not(:last-child)': {
            marginBottom: '50px',
        },
    },
    '.title': {
        margin: '0 0 16px',
        opacity: '0.65',
    },
    '.form-row:not(.Model-form-button)': {
        marginBottom: '30px',
    },
    '.model-button': {
        marginLeft: '0',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1em',
        padding: '30px 20px',
        '.row:not(:last-child), .form-row:not(.Model-form-button)': {
            marginBottom: '20px',
        },
        '.title': {
            marginBottom: '8px',
        },
    },
}));

export {
    TabWrapLayout,
    ItemLayout,
    BoxWrapLayout,
};
