import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { TitleLayout, SectionLayout } from './cart/cartLayout';
import SEO from '../containers/SEO';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';

const Privacy = () => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags, globalDispatch } = useContext(GlobalContext);

    // State
    const [isDefer, setIsDefer] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

        const fetchData = async() => {

            const data = await Service.privacy(locale);
            setPageData(data);
            if (data) setIsDefer(false);

        };

        fetchData();

    }, [globalDispatch, locale]);

    return !isDefer && (

        <Fragment>
            <SEO title={deftags.privacy_title} />
            <TitleLayout>{deftags.privacy_title}</TitleLayout>

            <SectionLayout>
                <div dangerouslySetInnerHTML={{ __html: pageData.detail }} />
            </SectionLayout>
        </Fragment>

    );

};

export default Privacy;
