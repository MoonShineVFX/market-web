import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import SEO from '../containers/SEO';
import Item from '../components/Item';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

//
const TitleLayout = styled('h1')(({ theme }) => ({
    fontSize: '2.15em',
    fontWeight: 'normal',
    marginBottom: '120px',
    [theme.breakpoints.up('middle')]: {
        textAlign: 'center',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1.4em',
        marginBottom: '30px',
    },
}));

//
const ItemWrapLayout = styled(Grid)(({ theme }) => ({
    '.item.style-product': {
        width: '100%',
        '.item-thumb': {
            height: '161px',
        },
    },
    '.title': {
        display: '-webkit-box',
        WebkitLineClamp: theme.lineClamp(2),
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    [theme.breakpoints.down('middle')]: {
        '.container': {
            width: '100%',
        },
        '.item.style-product': {
            backgroundColor: theme.palette.card.main,
            borderRadius: '10px',
            display: 'flex',
            marginBottom: '0',
            '&.style-product .item-thumb': {
                maxWidth: '120px',
                height: '10vh',
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
            },
            '.item-content': {
                width: 'calc(100% - 120px)',
                padding: '10px',
            },
        },
        '.title': {
            fontSize: '1em',
        },
    },
}));

//
const Tutorial = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        const fetchData = async () => {

            const data = await Service.tutorial(locale);
            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, locale]);

    return !isDefer && (

        <Fragment>
            <SEO title={deftags.tutorial_title} />
            <TitleLayout>{deftags.tutorial_title}</TitleLayout>

            <ItemWrapLayout
                container
                rowSpacing="20px"
                columnSpacing={{ middle: '36px' }}
                component="section"
            >
                {
                    pageData.list.map(({ id, title, imgUrl, link }) => (

                        <Grid
                            key={id}
                            item
                            xs={12}
                            middle={6}
                            sm={4}
                            md={3}
                            className="container"
                        >
                            <Item
                                type="product"
                                url={link}
                                width="273"
                                height="161"
                                data={{ title, imgUrl }}
                                newPage
                            />
                        </Grid>

                    ))
                }
            </ItemWrapLayout>
        </Fragment>

    );

};

export default Tutorial;
