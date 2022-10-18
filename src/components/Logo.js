import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import Links from './Links';
import { GlobalContext } from '../context/global.state';

const LogoLayout = styled('span')(({ theme }) => ({
    '.logo-text': {
        width: '170px',
    },
    'img': {
        height: '100%',
        verticalAlign: 'middle',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1.4em',
    },
}));

//
const Logo = ({ ...rest }) => {

    // Route
    const { locale } = useParams();

    // Context
    const { deftags } = useContext(GlobalContext);

    return (

        <LogoLayout {...rest}>
            <Links
                url={`/${locale}`}
                className="logo-text"
                title={deftags.text_logo}
            >
                <img
                    src="/logo_large.png"
                    alt={deftags.text_logo}
                    width="291"
                    height="78"
                />
            </Links>
        </LogoLayout>

    );

};

export default Logo;
