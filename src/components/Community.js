import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import Links from './Links';
import FontIcon from './FontIcon';

// 社群 icon
const socials = [
    {
        url: 'https://www.instagram.com/moonshine.tw/?hl=zh-tw',
        icon: faInstagram,
    },
    {
        url: 'https://www.facebook.com/MoonShineAnimation',
        icon: faFacebookSquare,
    },
];

const Community = () => (

    <div className="community">
        {
            socials.map(({ url, icon }, idx) => (

                <Links
                    key={idx}
                    href={url}
                    className="social-item"
                    newPage
                >
                    <FontIcon icon={icon} />
                </Links>

            ))
        }
    </div>

);;

export default Community;
