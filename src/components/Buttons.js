import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

//
const ButtonLayout = styled(Button)(({ theme }) => ({
    fontWeight: 'normal',
    display: 'block',
    padding: '10px 18px',
    '&.MuiButton-contained': {
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    '.MuiButton-endIcon': {
        textAlign: 'right',
        display: 'inline-block',
        flex: '0 0 20%',
        'svg': {
            fontSize: '18px',
            verticalAlign: 'middle',
        },
    },
    '&.Mui-disabled': {
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.disabled,
    },
    '&.MuiButton-outlined': {
        color: theme.palette.textColor,
        borderColor: theme.palette.border.light,
    },
}));

//
const Buttons = ({ text, variant, children, ...rest }) => (

    <ButtonLayout
        {...rest}
        className="model-button"
        variant={variant}
    >
        {text ? text : children}
    </ButtonLayout>

);

Buttons.defaultProps = {
    variant: 'contained',
};

Buttons.propTypes = {
    text: PropTypes.string,
    variant: PropTypes.string,
    children: PropTypes.any,
};

export default Buttons;
