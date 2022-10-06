import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import { styled } from '@mui/system';
import { GlobalContext } from '../context/global.state';

//
const FormWrapLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    margin: 'auto',
    padding: '40px',
    '.form-top': {
        textAlign: 'center',
    },
    '.title': {
        margin: '16px 0 36px',
    },
    '.form-row, .model-button': {
        marginBottom: '24px',
    },
    '.form-row-btns': {
        marginTop: '40px',
    },
    [theme.breakpoints.up('sm')]: {
        maxWidth: '560px',
        fontSize: '1.2em',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        padding: '20px',
    },
    [theme.breakpoints.down('middle')]: {
        '.title': {
            margin: '10px 0 24px',
        },
        '.form-row, .model-button': {
            marginBottom: '16px',
        },
    },
}));

//
const FormRowLayout = styled('div')(({ theme }) => ({
    '&.row-password': {
        position: 'relative',
        'span': {
            padding: '4px 8px',
            position: 'absolute',
            top: '14px',
            right: '20px',
            cursor: 'pointer',
        },
        'svg': {
            verticalAlign: 'middle',
        },
    },
    'input': {
        width: '100%',
        fontSize: '1.15em',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.bgColor,
        border: '0',
        borderRadius: '40px',
        padding: '22px 40px',
        outline: '0',
        '&::placeholder, &::-ms-input-placeholder': {
            color: 'rgba(255, 255, 255, 0.8)',
        },
    },
    '.error-mesg': {
        fontSize: '0.8em',
        color: theme.palette.error.light,
        marginTop: '8px',
        paddingLeft: '40px',
    },
    '&.form-row-radio': {
        '.error-mesg': {
            paddingLeft: '0',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.error-mesg': {
            fontSize: '1em',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '&.row-password': {
            'span': {
                top: '10px',
            },
        },
        'input': {
            fontSize: '1em',
            padding: '19px 30px',
        },
        '.error-mesg': {
            fontSize: '0.9em',
            paddingLeft: '30px',
        },
    },
}));

//
const SuccessMesgLayout = styled('p')(({ theme }) => ({
    fontSize: '1.15em',
    textAlign: 'center',
}));

//
const FormWrap = ({ title, children, ...rest }) => (

    <FormWrapLayout
        className="Model-form-button formWrap"
        {...rest}
    >
        <div className="form-top">
            <h3 className="title">{title}</h3>
        </div>

        {children}
    </FormWrapLayout>

);

//
const FormRow = ({ name, className, errors, children, ...rest }) => (

    <FormRowLayout
        className={`form-row ${className ? className : ''}`}
        {...rest}
    >
        {children}

        {
            errors &&
                <FormErrorMesg
                    name={name}
                    errors={errors}
                />
        }
    </FormRowLayout>

);

// 錯誤訊息
const FormErrorMesg = ({ name, errors }) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    return (

        <ErrorMessage
            name={name}
            errors={errors}
            message={deftags[`error_${errors[name]?.type}`]}
            render={({ message }) => <p className="error-mesg">{message}</p>}
        />

    );

};

// 成功訊息
const FormSuccessMesg = ({ mesg }) => (

    <SuccessMesgLayout>{mesg}</SuccessMesgLayout>

);

FormWrap.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

FormRow.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    errors: PropTypes.object,
    children: PropTypes.any,
};

FormErrorMesg.propTypes = {
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
};

FormSuccessMesg.propTypes = {
    mesg: PropTypes.string,
};

export {
    FormWrap as default,
    FormRow,
    FormErrorMesg,
    FormSuccessMesg,
};
