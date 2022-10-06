import { Fragment, useContext } from 'react';

import dayjs from 'dayjs';
import { Grid, useMediaQuery } from '@mui/material';
import { FooterLayout, LangOptionLayout } from './globalLayout';
import Links from '../components/Links';
import Community from '../components/Community';
import { GlobalContext } from '../context/global.state';

// 語系選單
const LangOption = ({ deftag }) => {

    // 選取語言
    const handleSelected = ({ target: { value } }) => {

        // url 更新
        // router.push(router.asPath, router.asPath, { locale: value });

    };

    return (

        <LangOptionLayout
            name="lang"
            // defaultValue={router.locale}
            onChange={handleSelected}
        >
            123
            {
                // router.locales.map((code) => (

                //     // 僅支援繁中與英文
                //     (code === 'zh' || code === 'en') &&
                //         <option
                //             key={code}
                //             value={code}
                //         >
                //             {deftag[`lang_${code}`]}
                //         </option>

                // ))
            }
        </LangOptionLayout>

    );

};

//
const Footer = () => {

    // Context
    const { deftags } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));

    return (

        <FooterLayout>
            <Grid
                container
                className="container Model-container"
            >
                <Grid
                    item
                    xs={12}
                    mobile={9}
                    className="grid-left"
                >
                    <img
                        src="/logo_small.png"
                        alt="logo small"
                        width="41"
                        height="32"
                    />

                    {
                        matches ? (

                            <Fragment>
                                <span className="copyright">© {dayjs().format('YYYY')} All rights reserved. Moonshine</span>
                                <div className="top">
                                    <div className="link">
                                        <Links
                                            url="/privacy"
                                            newPage
                                            className="light privacy-link"
                                        >
                                            {deftags.text_privacy}
                                        </Links>

                                        <Links url="mailto:service@moonshine.tw" className="light" newPage>{deftags.text_custom_service}: service@moonshine.tw</Links>
                                    </div>
                                    <p className="bottom">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
                                </div>
                            </Fragment>

                        ) : (

                            <span>
                                <div className="top">
                                    <span>Copyright © {dayjs().format('YYYY')} Moonshine. All rights reserved.</span>
                                    <Links
                                        url="/privacy"
                                        newPage
                                        className="light privacy-link"
                                        title={deftags.text_privacy}
                                    >
                                        {deftags.text_privacy}
                                    </Links>
                                    <Links url="mailto:service@moonshine.tw" className="light" title={deftags.text_custom_service} newPage>{deftags.text_custom_service}: service@moonshine.tw</Links>
                                </div>
                                <div className="bottom">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</div>
                            </span>

                        )
                    }
                </Grid>

                <Grid
                    item
                    xs={12}
                    mobile={3}
                    className="grid-right"
                >
                    {
                        // Betty: 暫且沒有社群
                        false && <Community />
                    }

                    <LangOption deftag={deftags} />
                </Grid>
            </Grid>
        </FooterLayout>

    );

};

export default Footer;
