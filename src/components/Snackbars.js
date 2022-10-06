import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { GlobalContext } from '../context/global.state';

//
const SnackbarsLayout = styled('div')(({ theme }) => ({
    fontSize: '1em',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    position: 'absolute',
    top: '50px',
    zIndex: '10',
}));

//
const Snackbars = ({ type, message, ...rest }) => {

    // Context
    const { snackbar, globalDispatch } = useContext(GlobalContext);

    // 關閉
    const handleClose = (event, reason) => {

        if (reason === 'clickaway') return;
        globalDispatch({ type: 'snackbar', payload: false });

    };

    return (

        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={snackbar}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert severity={type}>{message}</Alert>
        </Snackbar>

    );

};

Snackbars.defaultProps = {
    type: 'success',
    duration: 5000,
};

Snackbars.propTypes = {
    type: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.string,
};

export default Snackbars;
