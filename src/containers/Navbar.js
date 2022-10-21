import { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { NavMenuLayout } from './globalLayout';
import { GlobalContext } from '../context/global.state';

const Navbar = ({ ...rest }) => {

    const { locale } = useParams();

    // Context
    const { deftags } = useContext(GlobalContext);

    //
    const navMenus = [
        {
            key: 'product/list?page=1',
            text: deftags.menu_store,
        },
        {
            key: 'about',
            text: deftags.menu_about,
        },
        {
            key: 'tutorial',
            text: deftags.menu_tutorial,
        },
    ];

    return (

        <NavMenuLayout {...rest}>
            {
                navMenus.map(({ key, text }) => (

                    <NavLink key={key} to={`${key}`}>
                    {/* <NavLink key={key} to={`/${locale}/${key}`}> */}
                        {text}
                    </NavLink>

                ))
            }
        </NavMenuLayout>

    );

};

export default Navbar;
