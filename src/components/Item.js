import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { ExtraLink } from './Links';
import { GlobalContext } from '../context/global.state';
import util from '../utils/util';

const { priceWithCommas, formatBytes } = util;

//
const ItemLayout = styled(ExtraLink)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    '.item-content': {
        padding: '16px 0',
    },
    '.title': {
        margin: '0',
    },
    '&.style-section': {
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        '.item-thumb': {
            height: '336px',
        },
        '.item-content': {
            width: '100%',
            backgroundColor: theme.palette.card.main,
            paddingLeft: '24px',
            paddingRight: '24px',
            position: 'absolute',
            bottom: '0',
            opacity: '0.85',
        },
    },
    '&.style-product': {
        marginBottom: '20px',
        '.item-thumb': {
            height: '186px',
            borderRadius: '10px',
            overflow: 'hidden',
        },
    },
    '.file-size': {
        opacity: '0.6',
    },
    [theme.breakpoints.down('md')]: {
        '&.style-section': {
            '.item-thumb': {
                width: '100%',
                height: '260px',
            },
        },
    },
    [theme.breakpoints.down('mobile')]: {
        fontSize: '0.8em',
        '&.style-section': {
            width: '180px',
            '.item-thumb': {
                height: '200px',
            },
            '.item-content': {
                padding: '8px 12px',
            },
        },
        '.price': {
            fontSize: '1.1em',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '&.style-section': {
            width: '155px',
        },
    },
}));

//
const Item = ({
    newPage,
    type,
    url,
    width,
    height,
    data: { title, price, imgUrl, fileSize },
    children,
    ...rest
}) => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags } = useContext(GlobalContext);

    return (

        <ItemLayout
            url={`/${locale}${url}`}
            {...newPage && { target: '_blank'}}
            className={`item style-${type} Model-effect-brightness`}
            title={title}
            {...rest}
        >
            <div className="item-thumb">
                <img
                    src={imgUrl}
                    alt={title}
                    width={width}
                    height={height}
                />
            </div>
            <div className="item-content">
                <h3 className="title web-line-clamp">{title}</h3>
                {
                    price &&
                        <span className="price">{priceWithCommas(price)}</span>
                }
                {
                    fileSize &&
                        <span className="file-size">{deftags.product_file_size} {formatBytes(fileSize)}</span>
                }
            </div>
            {children && children}
        </ItemLayout>

    );

};

Item.defaultProps = {
    newPage: false, // 另開分頁
    type: 'section',
};

Item.propTypes = {
    newPage: PropTypes.bool,
    type: PropTypes.string, // section || product list
    url: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number,
        imgUrl: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.any,
};

export default Item;
