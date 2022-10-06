import { useContext } from 'react';
import { useMediaQuery, Grid } from '@mui/material';
import { OrderRecordLayout, OrderRecordGridLayout } from '../order/orderLayout';
import Links from '../Links';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';

const { priceWithCommas, dateFormat, renderWithoutValue } = util;

// 表格欄位樣板
const renderItemCell = ({
    className,
    data: {
        number,
        createAt,
        status,
        quantity,
        price,
        payment,
        paidAt,
        invoice,
    },
}) => (

    <div className={`item-row ${className ? className : ''}`}>
        <span className="item-cell">
            {
                className ? number :
                    <Links
                        url={`/order/${number}`}
                        className="orderNumber"
                        newPage
                    >
                        {number}
                    </Links>
            }
        </span>
        <span className="item-cell cell-160">{createAt}</span>
        <span className="item-cell cell-80">{quantity}</span>
        <span className="item-cell cell-140">{price}</span>
        <span className="item-cell cell-140">{status}</span>
        <span className="item-cell cell-140">{renderWithoutValue(payment)}</span>
        <span className="item-cell cell-160">{paidAt}</span>
        <span className="item-cell cell-140 invoice">{renderWithoutValue(invoice)}</span>
    </div>

);

// 表格欄位資料
const Item = ({
    data: {
        orderNumber,
        createdAt,
        price,
        status,
        totalItems,
        paidBy,
        paidAt,
        invoice,
    },
    deftag,
}) => (

    renderItemCell({
        data: {
            number: orderNumber,
            createAt: dateFormat(createdAt),
            status: deftag?.[`order_status_${status}`],
            quantity: totalItems,
            price: priceWithCommas(price),
            payment: deftag?.[`order_payment_${paidBy}`],
            paidAt: dateFormat(paidAt),
            invoice,
        },
    })

);

// Web
const withTable = (data, deftag) => (

    <OrderRecordLayout>
        {
            renderItemCell({
                className: 'row-head',
                data: {
                    number: deftag?.order_text_order_number,
                    createAt: deftag?.order_text_create_at,
                    status: deftag?.order_text_status,
                    quantity: deftag?.order_text_quantity,
                    price: deftag?.order_text_total_price,
                    payment: deftag?.order_text_payment,
                    paidAt: deftag?.order_text_paid_at,
                    invoice: deftag?.order_text_invoice,
                },
            })
        }

        {
            data.map((obj) => (

                <Item
                    key={obj.id}
                    data={obj}
                    deftag={deftag}
                />

            ))
        }
    </OrderRecordLayout>

);

// mWeb
const withCard = (data, deftag) => (

    <OrderRecordGridLayout
        container
        rowSpacing={{
            xs: '20px',
            sm: '40px',
        }}
    >
        {
            data.map(({
                id,
                orderNumber,
                createdAt,
                totalItems,
                price,
                status,
                paidBy,
                paidAt,
                invoice,
            }) => (

                <Grid
                    key={id}
                    item
                    xs={12}
                >
                    <Links
                        url={`/order/${orderNumber}`}
                        className="card-wrap"
                        newPage
                    >
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_order_number}</h4>
                            <span className="orderNumber">{orderNumber}</span>
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_create_at}</h4>
                            {dateFormat(createdAt)}
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_quantity}</h4>
                            {totalItems}
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_total_price}</h4>
                            {priceWithCommas(price)}
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_status}</h4>
                            {deftag?.[`order_status_${status}`]}
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_payment}</h4>
                            {renderWithoutValue(deftag?.[`order_payment_${paidBy}`])}
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_paid_at}</h4>
                            {dateFormat(paidAt)}
                        </div>
                        <div className="item">
                            <h4 className="title">{deftag?.order_text_invoice}</h4>
                            <span className="invoice">{renderWithoutValue(invoice)}</span>
                        </div>
                    </Links>
                </Grid>

            ))
        }
    </OrderRecordGridLayout>

);

//
const OrderRecord = ({ data }) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.up('mobile'));

    return (

        matches ? withTable(data, deftags) : withCard(data, deftags)

    );

};

export default OrderRecord;
