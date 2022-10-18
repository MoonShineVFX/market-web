import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import { Grid } from '@mui/material';

import { GridLayout, ItemWrapLayout } from './productLayout';
import SEO from '../../containers/SEO';
import Item from '../../components/Item';
import Paginations from '../../components/Paginations';

import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

const ProductList = () => {

    // Route
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        const fetchData = async() => {

            const data = await Service.productList({
                page: searchParams.get('page'),
                locale: params.locale,
            });

            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, params.locale, searchParams]);


    // Click page
    const handleChangePage = (e, page) => {

        navigate(`/${params.locale}/product/list?page=${page}`);

    };

    return !isDefer && (

        <Fragment>
            <SEO title={deftags.menu_store} />

            <GridLayout
                container
                columnSpacing={{ lg: '40px' }}
                component="section"
                className="page-product"
            >
                <Grid
                    item
                    xs={12}
                    component="figure"
                    className="productList"
                >
                    {
                        pageData.products.length ? (

                            <ItemWrapLayout
                                container
                                rowSpacing="40px"
                                columnSpacing="16px"
                            >
                                {
                                    pageData.products.map(({ id, title, price, imgUrl }, idx) => (

                                        <Grid
                                            key={id}
                                            item
                                            xs={6}
                                            sm={4}
                                            mobile={3}
                                            data-index={idx}
                                        >
                                            <Item
                                                type="product"
                                                url={`/product/${id}`}
                                                width="321"
                                                height="186"
                                                data={{ title, price, imgUrl }}
                                                newPage
                                            />
                                        </Grid>

                                    ))
                                }
                            </ItemWrapLayout>

                        ) : <h2 className="no-product">{deftags.product_no_data}</h2>
                    }

                    {
                        (pageData.products.length > 10) &&
                            <Paginations
                                length={pageData.products.length}
                                currPage={+searchParams.get('page')}
                                onChange={handleChangePage}
                            />
                    }
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductList;
