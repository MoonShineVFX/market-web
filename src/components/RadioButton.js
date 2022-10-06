import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';

//
const RadioButtonLayout = styled('label')(({ theme }) => ({
    display: 'inline-block',
    marginRight: '30px',
    cursor: 'pointer',
    '&.disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
    },
    'input[type="radio"]': {
        display: 'none',
        '&:checked + .checkmark': {
            borderColor: theme.palette.primary.main,
            position: 'relative',
            '&:after': {
                content: '""',
                width: '12px',
                height: '12px',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
        },
    },
    'span': {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    '.checkmark': {
        width: '24px',
        height: '24px',
        textAlign: 'center',
        backgroundColor: theme.palette.bgCoor,
        border: `1px solid ${theme.palette.border.dark}`,
        borderRadius: '50%',
        marginRight: '10px',
    },
    '.text': {
        flex: '0 0 calc(100% - 30px - 10px)',
        marginTop: '1px',
    },
    // [theme.breakpoints.down('middle')]: {
    //     '.checkmark': {
    //         width: '26px',
    //         height: '26px',
    //     },
    // },
}));

//
const RadioButton = forwardRef(({
    className,
    name,
    text,
    disabled,
    ...rest
}, ref) => (

    <RadioButtonLayout className={`${className ? className : ''} ${disabled ? 'disabled' : ''}`}>
        <input
            type="radio"
            name={name}
            ref={ref}
            {...disabled && { disabled: true }}
            {...rest}
        />
        <span className="checkmark" />
        <span className="text">{text}</span>
    </RadioButtonLayout>

));

RadioButton.defaultProps = {
    disabled: false,
};

RadioButton.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
};

export default RadioButton;
