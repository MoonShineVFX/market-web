import { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
// import {
//     homeStyles,
//     ItemNewArrivalLayout,
//     ItemTutorialLayout,
// } from '../src/components/home/homeLayout';

// import Head from '../src/containers/Head';
// import Links from '../src/components/Links';
// import ItemsWrap from '../src/components/ItemsWrap';
// import Item from '../src/components/Item';
// import Banner from '../src/components/home/Banner';

// import { GlobalContext } from '../src/context/global.state';
// import util from '../src/utils/util';
// import useGoogleAnalytics from '../src/utils/useGoogleAnalytics';

const Home = ({ langs, pageData }) => {

    // Context
    // const { globalDispatch } = useContext(GlobalContext);

    // // Hook
    // const eventTracker = useGoogleAnalytics();

    // useEffect(() => {

    //     globalDispatch({ type: 'sidenav', payload: false });
    //     globalDispatch({ type: 'target_box', payload: '' });

    // }, []);

    return (

        <Fragment>
            Home
            {/* {homeStyles}
            <Head
                title={langs.home_title}
                description={langs.og_description}
            />

            {
                !!pageData.banners.length &&
                    <Banner pageData={pageData} />
            }

            <ItemsWrap
                title={langs.home_section_title01}
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
                title={langs.home_section_title02}
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
            </ItemsWrap> */}
        </Fragment>

    );

};

export default Home;
