import { useState } from 'react';

export default function useLocalStorage (key, initVal) {

    const [storedValue, setStoredValue] = useState(() => {

        try {

            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initVal;

        }
        catch (error) {

            // console.log(error);
            return initVal;

        }

    });

    const setValue = (value) => {

        try {

            window.localStorage.setItem(key, JSON.stringify(value));

        }
        catch (error) {

            console.log(error);

        }

        setStoredValue(value);

    };

    return [storedValue, setValue];

}

/**
 * window 找不到的解法
 * https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
 */
