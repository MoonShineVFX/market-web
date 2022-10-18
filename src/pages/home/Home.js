import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import {
    homeStyles,
    ItemNewArrivalLayout,
    ItemTutorialLayout,
} from './homeLayout';
import SEO from '../../containers/SEO';
import Links from '../../components/Links';
import ItemsWrap from '../../components/ItemsWrap';
import Item from '../../components/Item';
import Banner from './Banner';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import Service from '../../utils/util.service';
import useGoogleAnalytics from '../../utils/useGoogleAnalytics';

const Home = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    // Hook
    const eventTracker = useGoogleAnalytics();

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        const fetchData = async() => {

            const data = await Service.home(locale);
            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, locale]);

    return !isDefer && (

        <Fragment>
            {homeStyles}
            <SEO title={deftags.home_title} />

            {
                !!pageData.banners.length &&
                    <Banner pageData={pageData} />
            }

            <ItemsWrap
                title={deftags.home_section_title01}
                url="/product/list?page=1"
                data-section="product"
            >
                <ItemNewArrivalLayout
                    container
                    wrap="nowrap"
                    columnSpacing={{
                        xs: '12px',
                        mobile: '30px',
                    }}
                >
                    {
                        pageData.products.map(({ id, title, price, imgUrl }) => (

                            <Grid
                                key={id}
                                item
                                xs={12}
                                mobile={3}
                                className="items"
                            >
                                <Item
                                    width="277"
                                    height="336"
                                    url={`/product/${id}`}
                                    data={{ title, price, imgUrl }}
                                    newPage
                                    onClick={() => eventTracker({
                                        category: title,
                                        action: `點擊商品 id_${id}`,
                                        label: '最新上架',
                                    })}
                                />
                            </Grid>

                        ))
                    }
                </ItemNewArrivalLayout>
            </ItemsWrap>

            <ItemsWrap
                title={deftags.home_section_title02}
                url="/tutorial"
                data-section="tutorial"
            >
                <ItemTutorialLayout>
                    {
                        pageData.tutorials.map(({ id, title, description, imgUrl, link }) => (

                            <Links
                                key={id}
                                url={link}
                                title={title}
                                className="itemWrap"
                                newPage
                            >
                                <div className="item-thumb">
                                    <img
                                        src={imgUrl}
                                        alt={title}
                                        width="380"
                                        height="206"
                                    />
                                </div>
                                <div className="item-content">
                                    <h3 className="title">{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </Links>

                        ))
                    }
                </ItemTutorialLayout>
            </ItemsWrap>
        </Fragment>

    );

};

export default Home;
