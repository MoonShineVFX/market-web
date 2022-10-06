import { useContext } from 'react';
import { Popover } from '@mui/material';
import { styled } from '@mui/system';
import { GlobalContext } from '../context/global.state';

//
const PopupLayout = styled(Popover)(({ theme }) => ({
    '.MuiPaper-root': {
        padding: '10px',
    },
}));

//
const Popup = ({ children, ...rest }) => {

    // Context
    const { targetPopup, globalDispatch } = useContext(GlobalContext);

    // 關閉 popover
    const handleClose = () => globalDispatch({ type: 'target_popup', payload: null });

    return (

        <PopupLayout
            id={!!targetPopup ? 'simple-popover' : undefined}
            open={!!targetPopup}
            anchorEl={targetPopup}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            {...rest}
        >
            {children}
        </PopupLayout>

    );

};

export default Popup;
