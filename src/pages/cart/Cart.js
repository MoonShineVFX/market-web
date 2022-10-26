import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
} from './cartLayout';
import SEO from '../../containers/SEO';
import Buttons from '../../components/Buttons';
import FontIcon from '../../components/FontIcon';
import InvoiceForm from './InvoiceForm';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import Service from '../../utils/util.service';
import useLocalStorage from '../../hooks/useLocalStorage';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import useCarts from '../../hooks/useCarts';

const { priceWithCommas } = util;

// 商品欄位
const TableGrid = ({ colLeft, colRight }) => (

    <Grid
        container
        columnSpacing={{
            xs: '20px',
            sm: '30px',
        }}
    >
        <Grid
            item
            xs={10}
            sm={8}
            className="item-cell"
        >
            {colLeft && colLeft}
        </Grid>
        <Grid
            item
            xs={2}
            sm={4}
            className="item-cell right"
        >
            {colRight && colRight}
        </Grid>
    </Grid>
);

// 商品
const Item = ({
    onClick,
    data: {
        id,
        productId,
        title,
        price,
        imgUrl,
    },
}) => {

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (

        <ItemLayout
            url={`/product/${productId}`}
            newPage
        >
            <TableGrid
                colLeft={(
                    <Fragment>
                        <div className="thumb">
                            <img
                                src={imgUrl}
                                alt={title}
                                width="103"
                                height="66"
                            />
                        </div>

                        <div className="info">
                            <h4 className="title web-line-clamp" title={title}>{title}</h4>
                            {
                                matches &&
                                    <span className="price">{priceWithCommas(price)}</span>
                            }
                        </div>
                    </Fragment>
                )}
                colRight={(
                    <div>
                        {
                            !matches &&
                                <span className="price">{priceWithCommas(price)}</span>
                        }

                        <span className="action" onClick={onClick}>
                            <FontIcon icon={faTimes} />
                        </span>
                    </div>
                )}
            />
        </ItemLayout>

    );

};
//
const Cart = () => {

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const eventTracker = useGoogleAnalytics();
    const [cartItem, setCartItem] = useLocalStorage('cartItem');
    const { cartList, setCartList } = useCarts();

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [invoiceVisible, setInvoiceVisible] = useState(false);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        if (cartList) setIsDefer(false);

    }, [globalDispatch, cartList]);

    // 刪除商品
    const handleRemoveItem = (e, { id, productId, title }) => {

        // Tracker
        eventTracker({
            category: title,
            action: `刪除購物車 id_${productId}`,
            label: '購物車',
        });

        let obj = { ...cartItem };
        delete obj[productId];

        e.preventDefault();
        Service.cartRemove({ cartId: id })
            .then((resData) => {

                setCartList(resData);
                setCartItem(obj); // 更新 localStorage
                globalDispatch({
                    type: 'remove_cart',
                    payload: resData.list,
                });

            });

    };

    // 下一步
    const handleNextStep = () => setInvoiceVisible(true);

    return !isDefer && (

        <Fragment>
            <SEO title={deftags.cart_order_title} />
            <TitleLayout>{deftags.cart_order_title}</TitleLayout>

            <SectionLayout>
                <h3 className="title-large">{deftags.cart_section_title}</h3>

                <CartLayout>
                    {
                        cartList.list.length ? (

                            <Fragment>
                                <div className="items">
                                    {
                                        cartList.list.map((data) => (

                                            <Item
                                                key={data.id}
                                                data={data}
                                                onClick={(e) => handleRemoveItem(e, data)}
                                            />

                                        ))
                                    }
                                </div>

                                <div className="amount">
                                    {
                                        matches ? (

                                            <div>
                                                <span>{deftags.order_text_total_price}</span>
                                                <span className="price">{priceWithCommas(cartList.amount)}</span>
                                            </div>

                                        ) : (

                                            <TableGrid
                                                colRight={(
                                                    <div>
                                                        <span>{deftags.order_text_total_price}</span>
                                                        <div className="price">{priceWithCommas(cartList.amount)}</div>
                                                    </div>
                                                )}
                                            />

                                        )
                                    }
                                </div>
                            </Fragment>

                        ) : deftags.cart_text_empty
                    }
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={deftags.btn_next}
                        onClick={handleNextStep}
                    />
                    <p>{deftags.cart_text_fill_out_message}</p>
                </div>

                {
                    invoiceVisible && <InvoiceForm items={cartList.list} />
                }
            </SectionLayout>
        </Fragment>

    );

};

export default Cart;
