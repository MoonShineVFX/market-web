import { GlobalStyles, Grid } from '@mui/material';
import { styled } from '@mui/system';
import SlideShow from '../../components/Slideshow';

const styles = {
    'main > div > *': {
        marginBottom: '80px',
    },
};

// Home Style
const homeStyles = <GlobalStyles styles={styles} />;

//
const BannerWrapLayout = styled('div')(({ theme }) => ({
    '.description': {
        WebkitLineClamp: theme.lineClamp(5),
    },
    [theme.breakpoints.down('lg')]: {
        '.slideshow-info-wrap': {
            padding: '30px',
        },
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: '40px',
        '.slideshow-control-arrows, .flag, .description': {
            display: 'none',
        },
        '.container': {
            display: 'flex',
            overflowX: 'auto',
        },
        '.item': {
            display: 'block !important',
            ':not(:last-child)': {
                marginRight: '30px',
            },
        },
        '.inner': {
            width: '80vw',
            position: 'relative',
            flexWrap: 'wrap',
            '> div': {
                width: '100%',
                backgroundColor: 'rgba(47, 48, 49, 0.82)',
                padding: '20px 16px 26px',
                position: 'absolute',
                bottom: '0',
                left: '0',
            },
            '.title': {
                fontSize: '1em',
            },
        },
    },
    [theme.breakpoints.down('mobile')]: {
        '.item': {
            ':not(:last-child)': {
                marginRight: '20px',
            },
            '.inner': {
                height: '40vh',
            },
            '.thumb': {
                height: '100%',
            },
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.item .inner': {
            width: '70vw',
            height: '60vh',
            '> div': {
                padding: '16px',
            },
        },
    },
}));

//
const SlideShowWrapLayout = styled(SlideShow)({
    '.slideshow-control-arrows': {
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        '.MuiButton-root': {
            width: '34px',
            height: '34px',
            minHeight: 'initial',
            position: 'initial',
            transform: 'initial',
            '&:first-of-type': {
                marginRight: '16px',
            },
        },
        'svg': {
            fontSize: '1em',
        },
    },
});

//
const SlideShowItemLayout = styled('div')(({ theme }) => ({
    '.inner': {
        lineHeight: '1.8',
        borderRadius: '15px',
        display: 'flex',
        overflow: 'hidden',
    },
    '.price': {
        fontSize: '1.15em',
        color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('md')]: {
        '.inner': {
            maxHeight: '386px',
        },
    },
}));

//
const SlideshowInfoLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    padding: '50px',
    position: 'relative',
    flex: '1',
    '.title': {
        lineHeight: '1.2',
        margin: '10px 0 20px',
    },
    '.flag': {
        fontSize: '0.9em',
        color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('md')]: {
        '.title': {
            margin: '0',
        },
    },
}));

//
const ItemNewArrivalLayout = styled(Grid)(({ theme }) => ({
    '.items': {
        minWidth: '180px',
    },
    '.title': {
        WebkitLineClamp: theme.lineClamp(1),
    },
    [theme.breakpoints.down('mobile')]: {
        overflowX: 'auto',
        '.items': {
            maxWidth: '180px',
            'a': {
                width: '100%',
            },
        },
    },
}));

//
const ItemTutorialLayout = styled('div')(({ theme }) => ({
    '.itemWrap': {
        color: theme.palette.textColor,
        backgroundColor: theme.palette.card.main,
        textDecoration: 'none',
        borderRadius: '16px',
        display: 'flex',
        marginBottom: '30px',
        overflow: 'hidden',
        transition: 'all .5s ease',
        '&:hover': {
            backgroundColor: theme.palette.card.light,
        },
    },
    '.item-thumb': {
        height: '206px',
        flex: '1',
    },
    '.item-content': {
        lineHeight: '1.8',
        padding: '30px 40px',
        flex: '2',
    },
    '.title': {
        fontSize: '1.3em',
        marginTop: '0',
        marginBottom: '24px',
    },
    'p': {
        fontSize: '1.15em',
    },
    [theme.breakpoints.down('mobile')]: {
        '.itemWrap': {
            marginBottom: '20px',
        },
        '.item-thumb': {
            height: '160px',
            flex: '1.5',
        },
        '.item-content': {
            padding: '20px',
        },
        '.title': {
            fontSize: '1.1em',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.item-thumb': {
            height: '125px',
        },
        '.title': {
            fontSize: '1em',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.itemWrap': {
            marginBottom: '16px',
        },
        '.item-content': {
            padding: '10px',
        },
        '.title': {
            fontSize: '0.9em',
        },
    },
}));

export {
    homeStyles,
    BannerWrapLayout,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
    ItemNewArrivalLayout,
    ItemTutorialLayout,
};
