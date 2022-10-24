import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';
import useLocalStorage from './useLocalStorage';

// 整理購物車資料結構
const arrangeCartList = (array) => array.reduce((acc, obj) => {

    acc[obj.productId] = acc[obj.productId] || {};
    acc[obj.productId].title = obj.title;
    acc[obj.productId].imgUrl = obj.imgUrl;
    acc[obj.productId].price = obj.price;
    return acc;

}, {});

export default function useCart(reFetch = true) {

    // Hook
    const [cartItem, setCartItem] = useLocalStorage('cartItem');

    // Context
    const { user, globalDispatch } = useContext(GlobalContext);

    // State
    const [cartList, setCartList] = useState(null);
    const [cart, setCart] = useState(null);
    const [amount, setAmount] = useState(null);

    useEffect(() => {

        init();

        const fetchData = async () => {

            const data = await Service.cartList()
            setCartItem(arrangeCartList(data.list));
            setAmount(data.amount);
            setCartList(data.list);
            setCart({
                count: data.list.length,
                items: arrangeCartList(data.list),
            });

        };

        // 有登入並更新當前登入者的購物車
        if (user && reFetch) fetchData();

    }, [globalDispatch, user, reFetch]);

    const init = () => {

        setCart({
            count: Object.entries(cartItem || {}).length,
            items: cartItem ?? {},
        });

    };

    return {
        cart,
        amount,
        cartList,
        setAmount,
        setCartList,
    };

}
