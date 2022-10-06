import PropTypes from 'prop-types';
import { Check as CheckIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

//
const CheckboxLayout = styled('label')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    'input[type="checkbox"]': {
        display: 'none',
        '&:checked + .checkmark': {
            'span': {
                color: '#FFF',
                display: 'block',
            },
            'svg': {
                display: 'inline-block',
                verticalAlign: '-5px',
            },
        },
    },
    '.checkmark': {
        width: '30px',
        height: '30px',
        textAlign: 'center',
        backgroundColor: theme.palette.bgCoor,
        border: `1px solid ${theme.palette.border.dark}`,
        marginRight: '10px',
        'svg': {
            display: 'none',
        },
    },
    '.text': {
        flex: '0 0 calc(100% - 30px - 10px)',
        marginTop: '1px',
    },
    [theme.breakpoints.down('middle')]: {
        '.checkmark': {
            width: '26px',
            height: '26px',
        },
        'svg': {
            fontSize: '1.3em',
        },
    },
}));

//
const Checkbox = ({
    className,
    name,
    register,
    children,
    ...rest
}) => (

    <CheckboxLayout className={className}>
        <input
            type="checkbox"
            name={name}
            {...register}
            {...rest}
        />
        <span className="checkmark">
            <CheckIcon />
        </span>
        <span className="text">{children}</span>
    </CheckboxLayout>

);

Checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    register: PropTypes.object,
    children: PropTypes.any,
};

export default Checkbox;
