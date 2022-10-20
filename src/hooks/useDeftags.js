import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../context/global.state';
import useLocalStorage from './useLocalStorage';

export default function useDeftags() {

    // Router
    const { locale } = useRouter();

    // Context
    const { deftags } = useContext(GlobalContext);

    // Hook
    const [deftag] = useLocalStorage('langList');

    // State
    const [langs, setLangs] = useState();

    useEffect(() => {

        setLangs((deftag !== 'undefined') ? deftags?.[locale] : deftag?.[locale]);

    }, [deftag, deftags, locale])


    return [langs, setLangs];

}
