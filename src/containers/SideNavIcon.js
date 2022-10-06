import PropTypes from 'prop-types';
import { SideNavIconLayout } from './globalLayout';
import FontIcon from '../components/FontIcon';

const SideNavIcon = ({ className, onClick, icon }) => (

    <SideNavIconLayout
        className={className}
        onClick={onClick}
    >
        <FontIcon icon={icon} />
    </SideNavIconLayout>

);

SideNavIcon.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.any.isRequired,
};

export default SideNavIcon;
