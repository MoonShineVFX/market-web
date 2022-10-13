import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
                key="title"
            />
            <meta
                property="og:description"
                content={description ? description : deftags.og_description}
                key="description"
            />
        </Helmet>

    );

};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default SEO;
