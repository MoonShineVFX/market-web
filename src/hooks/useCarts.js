import {
    useContext,
    useState,
    useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
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

export default function useCartss(resData = null) {

    // Route
    const { locale } = useParams();

    // Hook
    const [cartItem, setCartItem] = useLocalStorage('cartItem');

    // Context
    const { user, globalDispatch } = useContext(GlobalContext);

    // State
    const [cartList, setCartList] = useState(resData);

    useEffect(() => {

        const fetchData = async () => {

            const data = await Service.cartList(locale);
            setCartItem(arrangeCartList(data.list));
            setCartList(data);
            globalDispatch({
                type: 'cart_list',
                payload: data.list,
            });

        };

        // 有登入並更新當前登入者的購物車
        if (user) fetchData();

    }, [globalDispatch, locale, user]);

    return { cartList, setCartList };

}
