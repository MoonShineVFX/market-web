import { Fragment, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

// import { GlobalContext } from '../context/global.state';
import Header from './Header';
import Footer from './Footer';

//
const Frame = ({ children }) => {

    // Context
    // const { userInfo } = useContext(GlobalContext);

    // // 未登入導去燈入頁
    // if (!userInfo) {

    //     return <Navigate to={'/signin'} replace />;

    // }

    return (

        <Fragment>
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
                    {/* <Outlet /> */}
                </Box>
            </Box>
            <Footer />
        </Fragment>
    );

};

export default Frame;
