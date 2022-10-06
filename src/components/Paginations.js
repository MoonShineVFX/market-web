import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

const PaginationLayout = styled(Pagination)(({ theme }) => ({
    marginTop: '100px',
    '.MuiPagination-ul': {
        justifyContent: 'center',
    },
    '.MuiPaginationItem-root': {
        color: theme.palette.textColor,
        opacity: '0.6',
    },
    [theme.breakpoints.down('mobile')]: {
        marginTop: '40px',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '20px',
    },
}));

const Paginations = ({
    length,
    perPage,
    currPage,
    onChange,
    ...rest
}) => (

    <PaginationLayout
        className="paginations"
        page={currPage || 1}
        count={Math.ceil(length / perPage)}
        size="large"
        onChange={onChange}
        {...rest}
    />

);

Paginations.defaultProps = {
    currPage: 1,
    perPage: 10, // 一頁 10 筆
};

Paginations.propTypes = {
    length: PropTypes.number,
    perPage: PropTypes.number,
    currPage: PropTypes.number,
    showFirstButton: PropTypes.bool,
    showLastButton: PropTypes.bool,
};

export default Paginations;
