import { useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { GlobalContext } from '../context/global.state';

//
const DialogLayout = styled(Dialog)(({ theme }) => ({
    '.MuiTypography-root': {
        fontWeight: 'bold',
    },
    '.MuiDialog-paper': {
        width: '100%',
    },
    '.MuiDialogContent-root': {
        minHeight: '50px',
        fontSize: '1em',
    },
    '.MuiButton-text': {
        fontSize: '15px',
    },
}));

// 關閉按鈕
const CloseButton = ({ onClick }) => (

    <IconButton
        aria-label="close"
        onClick={onClick}
        sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
        }}
    >
        <CloseIcon />
    </IconButton>

);

const Lightbox = (props) => {

    const {
        type,
        btnTextCancel,
        btnTextSubmit,
        onClick,
        children,
    } = props;

    // Context
    const { visible, deftags, lightboxDispatch } = useContext(GlobalContext);

    // Close
    const handleClose = () => lightboxDispatch({ type: 'HIDE' });

    return (

        (type === 'confirm' || type === 'success' || type === 'error') ? (

            <DialogLayout
                maxWidth="xs"
                open={visible}
            >
                <DialogContent>{children}</DialogContent>

                <DialogActions>
                    {
                        (type === 'confirm') &&
                            <Button
                                autoFocus
                                onClick={handleClose}
                            >
                                {btnTextCancel || deftags.btn_cancel}
                            </Button>
                    }

                    <Button
                        type="submit"
                        onClick={onClick}
                    >
                        {btnTextSubmit || deftags.btn_confirm}
                    </Button>
                </DialogActions>
            </DialogLayout>

        ) : (

            <DialogLayout
                maxWidth="xs"
                open={visible}
                onClose={handleClose}
            >
                <DialogTitle>
                    <CloseButton onClick={handleClose} />
                </DialogTitle>

                <DialogContent>{children}</DialogContent>

                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleClose}
                    >
                        {btnTextCancel || deftags.btn_cancel}
                    </Button>

                    <Button
                        type="submit"
                        onClick={onClick}
                    >
                        {btnTextSubmit || deftags.btn_confirm}
                    </Button>
                </DialogActions>
            </DialogLayout>

        )

    );

};

Lightbox.propTypes = {
    type: PropTypes.oneOf(['confirm', 'success', 'error', 'info', 'warning']),
    btnTextCancel: PropTypes.string,
    btnTextSubmit: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
};

export default Lightbox;
