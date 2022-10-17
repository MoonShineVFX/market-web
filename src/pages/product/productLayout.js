import { styled } from '@mui/system';
import { GlobalStyles, Grid, ListItemButton } from '@mui/material';
import ItemsWrap from '../../components/ItemsWrap';

const detailStyles = {
    '.Model-container': {
        padding: '0',
    },
};

// Detail Style
const productDetailStyles = <GlobalStyles styles={detailStyles} />;

//
const GridLayout = styled(Grid)(({ theme }) => ({
    paddingTop: '60px',
    '.productList': {
        '.MuiButtonBase-root': {
            fontSize: '1.15em',
            color: theme.palette.textColor,
            opacity: '0.6',
            '&:hover': {
                opacity: '1',
            },
        },
        '.Mui-selected': {
            opacity: '1',
        },
        '.MuiTabs-indicator': {
            backgroundColor: 'transparent',
        },
        '.no-product': {
            textAlign: 'center',
        },
    },
    '.tab-menu': {
        marginBottom: '70px',
        '.MuiTabs-flexContainer': {
            justifyContent: 'center',
        },
    },
    // [theme.breakpoints.down('mobile')]: {
    //     '.tagsList': {
    //         display: 'none',
    //     },
    // },
}));

//
const ListTitleLayout = styled('h4')(({ theme }) => ({
    fontWeight: 'normal',
    margin: 0,
    '&:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '1px',
        backgroundColor: theme.palette.textColor,
        marginTop: '12px',
        marginBottom: '12px',
        opacity: '0.16',
    },
}));

//
const ListItemLayout = styled(ListItemButton)(({ theme }) => ({
    marginBottom: '10px',
    opacity: '0.8',
    transition: 'all .5s ease',
    '&:hover': {
        opacity: '1',
    },
    '&.Mui-selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        opacity: '1',
    },
    '&:hover&.Mui-selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        opacity: '1',
    },
    '.MuiListItemText-root': {
        margin: '0',
    },
    '.checked': {
        minWidth: 'auto',
        color: theme.palette.primary.contrastText,
    },
}));

// Betty: 暫時隱藏 tag
//
const ItemWrapLayout = styled(Grid)(({ theme }) => ({
    // display: 'flex',
    // flexWrap: 'wrap',
    // margin: '0 -8px 0',
    // '.item': {
    //     flex: '0 0 calc(100% / 4)',
    //     padding: '0 8px',
    //     '&:nth-of-type(4n)': {
    //         marginRight: '0',
    //     },
    // },
    // [theme.breakpoints.down('sm')]: {
    //     '.item': {
    //         flex: '0 0 calc(100% / 2)',
    //     },
    // },
}));

/** Detail */
const DetailWrapLayout = styled('section')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
    '.detail-banner': {
        height: '396px',
    },
    [theme.breakpoints.down('mobile')]: {
        borderRadius: '0',
        '.detail-banner': {
            height: '35vh',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.detail-banner': {
            height: '30vh',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.detail-banner': {
            height: '25vh',
        },
    },
}));

//
const DetailContentLayout = styled(Grid)(({ theme }) => ({
    fontSize: '1.15em',
    padding: '48px 60px',
    'p': {
        margin: '0 0 30px',
    },
    '.tag': {
        fontSize: '0.8em',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        marginRight: '16px',
        padding: '6px 8px',
    },
    '.title': {
        fontSize: '1.8em',
        margin: '10px 0',
    },
    '.description': {
        lineHeight: '2',
    },
    '.label, .notice': {
        opacity: '0.7',
    },
    '.notice': {
        fontSize: '0.85em',
        marginBottom: '0',
    },
    '.price': {
        fontSize: '1.2em',
        color: theme.palette.primary.main,
        margin: '0 0 20px',
    },
    '.model-button': {
        width: '100%',
    },
    '.other-info': {
        marginTop: '40px',
    },
    '.other-info-item': {
        display: 'flex',
        '.label': {
            maxWidth: '120px',
            flex: '1',
        },
        'p': {
            marginBottom: '20px',
        },
    },
    [theme.breakpoints.up('mobile')]: {
        '.grid-right': {
            paddingLeft: '80px',
        },
        '.title': {
            fontSize: '2.1em',
        },
        '.price': {
            fontSize: '1.45em',
            textAlign: 'center',
        },
        '.other-info-item': {
            display: 'block',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        padding: '30px',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1em',
        padding: '20px',
        '.title': {
            fontSize: '1.4em',
            marginBottom: '10px',
        },
        '.price': {
            fontSize: '1.1em',
        },
        '.other-info': {
            marginTop: '20px',
        },
    },
}));

//
const FormatAndRendererLayout = styled('ul')(({ theme }) => ({
    margin: '0',
    paddingInlineStart: '20px',
    '.item': {
        margin: '10px 0',
        '.title': {
            fontSize: '1em',
            margin: '0',
        },
    },
    '.renders': {
        fontSize: '0.9em',
    },
}));

//
const DemoImageWrapLayout = styled(ItemsWrap)(({ theme }) => ({
    '&[data-section="demo-image"]': {
        margin: '40px 0',
    },
    [theme.breakpoints.up('mobile')]: {
        margin: '80px 0 100px',
    },
    [theme.breakpoints.down('mobile')]: {
        padding: '0 30px',
    },
    [theme.breakpoints.down('middle')]: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
}));

//
const DemoImageLayout = styled('div')(({ theme }) => ({
    height: '317px',
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    [theme.breakpoints.down('mobile')]: {
        height: '200px',
    },
    [theme.breakpoints.down('middle')]: {
        height: '140px',
    },
}));

// 你可能會喜歡
const RelativeProductsLayout = styled(ItemsWrap)(({ theme }) => ({
    overflowX: 'hidden',
    '.items': {
        display: 'flex',
        margin: '0 -15px',
        overflowX: 'auto',
    },
    '.itemWrap': {
        minWidth: '282px',
        padding: '0 15px',
    },
    '.title': {
        WebkitLineClamp: theme.lineClamp(1),
    },
    'img': {
        height: '100%',
    },
    [theme.breakpoints.down('md')]: {
        '.itemWrap': {
            minWidth: '218px',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        padding: '0 30px',
        '.items': {
            margin: '0 -8px',
        },
        '.itemWrap': {
            minWidth: '180px',
            padding: '0 8px',
        },
        '.item': {
            width: 'auto',
        },
    },
}));

export {
    productDetailStyles,
    GridLayout,
    ListTitleLayout,
    ListItemLayout,
    ItemWrapLayout,
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRendererLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
    RelativeProductsLayout,
};
