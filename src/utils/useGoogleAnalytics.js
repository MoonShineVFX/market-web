import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

export default function useGoogleAnalytics () {

    // Router
    const router = useRouter();

    // init
    const init = () => {

        ReactGA.initialize(process.env.NEXT_PUBLIC_GAID);

    };

    // page
    const sendPageview = (path) => {

        ReactGA.set({ page: path });
        ReactGA.pageview(path);

    };

    // event
    const eventTracker = (payload) => {

        ReactGA.event({
            category: payload.category,
            action: payload.action,
            label: payload.label,
        });

    };

    useEffect(() => {

        init();
        sendPageview(router.pathname);

    }, [router]);

    return eventTracker;

}
