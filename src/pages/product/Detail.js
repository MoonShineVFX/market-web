import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Grid, useMediaQuery } from '@mui/material';

import {
    productDetailStyles,
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRendererLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
    RelativeProductsLayout,
} from './productLayout';
import SEO from '../../containers/SEO';
import Item from '../../components/Item';
import Buttons from '../../components/Buttons';
import ImageEnlarge from '../../components/ImageEnlarge';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import Service from '../../utils/util.service';
import useLocalStorage from '../../hooks/useLocalStorage';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';

const {
    priceWithCommas,
    arrangeFormatAndRender,
    formatBytes,
} = util;

// 價格
const renderPrice = (price) => <h2 className="price">{priceWithCommas(price)}</h2>;

// 其他資訊
const renderOtherInfo = (pageData, deftags) => (

    <div className="other-info">
        <div className="other-info-item">
            <div className="label">{deftags.product_model_sum}</div>
            <p>{pageData.modelSum}</p>
        </div>
        <div className="other-info-item">
            <div className="label">{deftags.product_file_size}</div>
            <p>{formatBytes(pageData.fileSize)}</p>
        </div>
        <div className="other-info-item">
            <div className="label">{deftags.product_per_image_size}</div>
            <p>{pageData.perImgSize}</p>
        </div>
    </div>

);

//
const ProductDetail = () => {

    // Route
    const params = useParams();

    // Hook
    const matches = useMediaQuery((theme)=> theme.breakpoints.down('mobile'));
    const eventTracker = useGoogleAnalytics();

    // Context
    const {
        deftags,
        visible,
        currEvent,
        formStorageData,
        formStorageDispatch,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem'); // 未登入狀態用 localStorage 存
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {

        document.body.style.overflow = (visible && currEvent === 'viewImg') ? 'hidden' : '';
        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        const fetchData = async () => {

            const data = await Service.productDetail({
                id: params.id,
                locale: params.locale,
            });

            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, [visible, currEvent, globalDispatch, params.locale, params.id]);

    // 點圖放大
    const handleClickImgEnlarge = (url, id) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'viewImg' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, imgUrl: url },
        });

    };

    // 加入購物車
    const handleAddToCart = () => {

        // Tracker
        eventTracker({
            category: pageData.title,
            action: `加入購物車 id_${params.id}`,
            label: '購物車',
        });

        let item = {
            ...cartItem,
            [params.id]: {
                title: pageData.title,
                imgUrl: pageData.thumb,
                price: pageData.price,
            },
        };

        Service.cartAdd({ productId: pageData.id })
            .then(() => {

                setCartItem(item); // 更新 localStorage
                globalDispatch({
                    type: 'add_cart',
                    payload: item,
                });

            });

    };

    return !isDefer && (

        <Fragment>
            {productDetailStyles}
            <SEO title={pageData.title} />

            <DetailWrapLayout>
                <div className="detail-banner">
                    <img
                        src={matches ? pageData.mobileImgUrl : pageData.imgUrl}
                        alt={pageData.title}
                        width="1200"
                        height="396"
                    />
                </div>

                <DetailContentLayout
                    container
                    data-section="detail-data"
                >
                    <Grid
                        item
                        xs={12}
                        mobile={8}
                    >
                        <h1 className="title">{pageData.title}</h1>

                        {
                            // mWeb
                            matches && renderPrice(pageData.price)
                        }

                        <p className="description">{pageData.description}</p>
                        <div className="format-and-renderer">
                            <div className="label">{deftags.product_detail_format_and_renderer}</div>
                            <FormatAndRendererLayout>
                                {
                                    Object.keys(arrangeFormatAndRender(pageData.models)).map((id) => (

                                        <li
                                            key={id}
                                            className="item"
                                        >
                                            <h4 className="title">{arrangeFormatAndRender(pageData.models)[id].name}</h4>
                                            <span className="renders">
                                                <span>{deftags.product_render}: </span>
                                                {arrangeFormatAndRender(pageData.models)[id].renders.map(({ rendererName }) => rendererName).join('、')}
                                            </span>
                                        </li>

                                    ))
                                }
                            </FormatAndRendererLayout>
                        </div>
                        <p className="notice">{deftags.product_detail_notice_message}</p>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        mobile={4}
                        className="grid-right"
                    >
                        {
                            // mWeb
                            matches && renderOtherInfo(pageData, deftags)
                        }

                        {
                            // Web
                            !matches && renderPrice(pageData.price)
                        }

                        <Buttons
                            text={deftags.btn_add_to_cart}
                            onClick={handleAddToCart}
                        />

                        {
                            // Web
                            !matches && renderOtherInfo(pageData, deftags)
                        }
                    </Grid>
                </DetailContentLayout>
            </DetailWrapLayout>

            <DemoImageWrapLayout
                title={deftags.product_detail_section_title01}
                showMore={false}
                data-section="demo-image"
            >
                <Grid
                    container
                    rowSpacing={{
                        xs: '20px',
                        mobile: '40px',
                        md: '60px',
                    }}
                    columnSpacing={{
                        xs: '20px',
                        mobile: '40px',
                        md: '80px',
                    }}
                >
                    {
                        pageData.previews.map(({ id, url }, idx) => (

                            <Grid
                                key={id}
                                item
                                xs={6}
                                mobile={6}
                            >
                                <DemoImageLayout
                                    className="Model-effect-brightness"
                                    onClick={() => handleClickImgEnlarge(url, id)}
                                    data-index={idx}
                                >
                                    <img
                                        src={url}
                                        alt={id}
                                        width="560"
                                        height="317"
                                    />
                                </DemoImageLayout>
                            </Grid>

                        ))
                    }
                </Grid>
            </DemoImageWrapLayout>

            {
                !!pageData.relativeProducts.length &&
                    <RelativeProductsLayout
                        title={deftags.product_detail_section_title02}
                        showMore={false}
                    >
                        <div className="items">
                            {
                                pageData.relativeProducts.map(({ id, title, price, imgUrl }, idx) => (

                                    <div
                                        key={idx}
                                        className="itemWrap"
                                    >
                                        <Item
                                            url={`/product/${id}`}
                                            data={{ title, price, imgUrl }}
                                        />
                                    </div>

                                ))
                            }
                        </div>
                    </RelativeProductsLayout>
            }

            {
                (visible && currEvent === 'viewImg') &&
                    <ImageEnlarge
                        id={formStorageData.id}
                        imgUrl={formStorageData.imgUrl}
                    />
            }
        </Fragment>

    );

};

export default ProductDetail;
