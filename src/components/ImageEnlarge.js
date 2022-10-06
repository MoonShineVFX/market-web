import { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { GlobalContext } from '../context/global.state';

//
const ImageEnlargeLayout = styled('div')(({ theme }) => ({
    display: 'none',
    '&.active': {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        display: 'block',
        position: 'fixed',
        top: '0',
        left: '0',
        '&:after': {
            content: '""',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,.6)',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '100',
        },
    },
    '.image-wrap': {
        height: '90vh',
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative',
        zIndex: '110',
    },
    '.close-button': {
        width: '40px',
        height: '40px',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.card.main,
        position: 'absolute',
        right: '20px',
        top: '20px',
        '&:hover': {
            backgroundColor: theme.palette.card.light,
        },
    },
    'img': {
        borderRadius: theme.borderRadius,
    },
}));

// 關閉按鈕
const CloseButton = ({ onClick }) => (

    <IconButton
        className="close-button"
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

//
const ImageEnlarge = ({ id, imgUrl }) => {

    // Context
    const { visible, lightboxDispatch } = useContext(GlobalContext);

    useEffect(() => {

        document.addEventListener('keydown', escFunction);

        return () => {
            document.removeEventListener('keydown', escFunction);
        };

    }, []);

    // Close
    const handleClose = () => lightboxDispatch({ type: 'HIDE' });

    // esc
    const escFunction = useCallback((e) => {

        if (e.keyCode === 27) handleClose();

    }, []);

    return (

        <ImageEnlargeLayout
            className={visible ? 'active' : ''}
            data-section="preview-image"
        >
            <div className="Model-y-align image-wrap">
                <CloseButton onClick={handleClose} />
                <img src={imgUrl} alt={id} />
            </div>
        </ImageEnlargeLayout>

    );

};

ImageEnlarge.propTypes = {
    id: PropTypes.number,
    imgUrl: PropTypes.string.isRequired,
};

export default ImageEnlarge;
