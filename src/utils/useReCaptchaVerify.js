import { useContext, useState, useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { GlobalContext } from '../context/global.state';

export default function useReCaptchaVerify () {

    // Context
    const { dynamicAction, globalDispatch } = useContext(GlobalContext);

    // useCallback
    const { executeRecaptcha } = useGoogleReCaptcha();

    // State
    const [token, setToken] = useState();

    // 取得 google recaptcha token
    const triggerVerify = useCallback(async () => {

        if (!executeRecaptcha) return;
        const result = await executeRecaptcha(dynamicAction);
        setToken(result);
        globalDispatch({ type: 'recaptcha_is_verified', payload: true });

    }, [executeRecaptcha, dynamicAction, globalDispatch]);

    return [token, triggerVerify];

}
