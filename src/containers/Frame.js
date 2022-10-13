import { Fragment } from 'react';
import { Box } from '@mui/material';
import SEO from './SEO';
import Header from './Header';
import Footer from './Footer';

const Frame = ({ children }) => (

    <Fragment>
        <SEO />
        <Header />
        <Box
            component="main"
            sx={{ display: 'flex' }}
        >
            <Box
                component="div"
                className="Model-container"
                sx={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}
            >
                {children}
            </Box>
        </Box>
        <Footer />
    </Fragment>
);

export default Frame;
