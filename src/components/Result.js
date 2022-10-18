import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
    TitleLayout,
    SectionLayout,
    CartLayout,
} from '../pages/cart/cartLayout';
import SEO from '../containers/SEO';
import { ButtonLink } from './Links';
import FontIcon from './FontIcon';

const TitleWrapLayout = styled(TitleLayout)(({ theme }) => ({
    '&.withIcon': {
        marginBottom: '30px',
    },
    '.status': {
        fontSize: '3em',
        color: theme.palette.primary.main,
    },
}));

//
const ResultLayout = styled(CartLayout)(({ theme }) => ({
    minHeight: '200px',
    fontSize: '1.2em',
    textAlign: 'center',
    padding: '80px',
    '.btn-linkTo': {
        width: '100%',
    },
    'button.model-button': {
        marginTop: '0',
        padding: '20px 36px',
    },
}));

//
const Result = ({
    title,
    icon,
    message,
    btnText,
    linkTo,
    children,
    ...rest
}) => (

    <Fragment>
        <SEO title={title} />
        <TitleWrapLayout {...icon && { className: 'withIcon' }}>
            {title}
            {icon && <div className="status"><FontIcon icon={icon} /></div>}
        </TitleWrapLayout>

        <SectionLayout>
            <ResultLayout {...rest}>
                {message && <p>{message}</p>}

                <ButtonLink
                    url={linkTo}
                    className="btn-linkTo"
                    text={btnText}
                />

                {children}
            </ResultLayout>
        </SectionLayout>
    </Fragment>

);

Result.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    message: PropTypes.string,
    btnText: PropTypes.string,
    linkTo: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default Result;
