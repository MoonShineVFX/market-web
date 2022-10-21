import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

export default function useAuth() {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // State
    const [logged, setLogged] = useState(false);

    useEffect(() => {

        const fetchData = async() => {

            // 取得使用者資訊
            const data = await Service.common();
            const { tags, langConfigUpdatedAt, ...rest } = data;

            setLogged(!!rest.email);
            globalDispatch({
                type: 'global_data',
                payload: {
                    other: rest.email && rest,
                },
            });

        };

        fetchData();

    }, [globalDispatch]);

    return logged;

}
