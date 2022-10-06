import PropTypes from 'prop-types';
import { styled } from '@mui/system';

//
const BoxLayout = styled('div')(({ theme }) => ({
    fontSize: '1em',
    backgroundColor: theme.palette.card.light,
    borderRadius: '5px',
    position: 'absolute',
    top: '90px',
    zIndex: '10',
}));

//
const Box = ({ children, ...rest }) => (

    <BoxLayout {...rest}>
        {children}
    </BoxLayout>

);

Box.propTypes = {
    children: PropTypes.any,
};

export default Box;
