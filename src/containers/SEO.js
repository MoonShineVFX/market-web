import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { GlobalContext } from '../context/global.state';

const SEO = ({ title, description }) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    return (

        <Helmet>
            <title>{title}</title>
            <meta
                name="description"
                content={description ? description : deftags.og_description}
            />

            {/* og:Tag */}
            <meta
                property="og:title"
                content={title ? title : deftags.og_title}
            />
            <meta
                property="og:description"
                content={description ? description : deftags.og_description}
            />
            <meta
                property="og:url"
                content={`https://${process.env.REACT_APP_HOST}`}
            />
            <meta
                property="og:site_name"
                content={title ? title : deftags.og_title}
            />

            <link rel="canonical" href={`https://${process.env.REACT_APP_HOST}`} />
            <link rel="alternate" href={`https://${process.env.REACT_APP_HOST}`} hreflang="zh" />
        </Helmet>

    );

};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default SEO;
