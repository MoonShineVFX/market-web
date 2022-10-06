import { useContext } from 'react';
import { NavMenuLayout } from './globalLayout';
import Links from '../components/Links';
import { GlobalContext } from '../context/global.state';

const Navbar = ({ ...rest }) => {

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

                    <Links
                        key={key}
                        url={`/${key}`}
                        title={text}
                    >
                        {text}
                    </Links>

                ))
            }
        </NavMenuLayout>

    );

};

export default Navbar;
