import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

export default function useGoogleAnalytics () {

    // Route
    const location = useLocation();

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
        sendPageview(location.pathname);

    }, [location]);

    return eventTracker;

}
