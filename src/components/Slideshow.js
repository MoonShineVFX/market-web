import { useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FontIcon from './FontIcon';
import { GlobalContext } from '../context/global.state';

const SlideShowLayout = styled('section')(() => ({
    width: '100%',
    position: 'relative',
}));

// 容器
const SlideShowContainer = styled('div')(() => ({
    '.hide': {
        display: 'none',
    },
    '.active': {
        display: 'block'
    },
}));

// 點點
const Dots = styled('span')(({ theme }) => ({
    position: 'absolute',
    bottom: '16px',
    '> *': {
        width: '8px',
        height: '8px',
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '50%',
        display: 'inline-block',
        margin: '2px 6px',
        cursor: 'pointer',
    },
    '.active': {
        backgroundColor: theme.palette.secondary.main,
    },
}));

// 箭頭
const Arrows = styled('span')(({ theme }) => ({
    '.MuiButton-root': {
        minWidth: 'auto',
        width: '60px',
        height: '60px',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '50%',
        padding: 0,
        position: 'absolute',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
        '&:first-of-type': {
            left: '20px',
        },
        '& + .MuiButton-root': {
            right: '20px',
        },
    },
    'svg': {
        fontSize: '26px',
    },
}));

const SlideShow = ({ data, showDot, children, ...rest }) => {

    // Context
    const {
        slideshowActive,
        globalDispatch,
    } = useContext(GlobalContext);

    // 左箭頭
    const handleArrowLeft = () => {

        globalDispatch({
            type: 'slideshow',
            payload: slideshowActive - 1 < 0 ? data.length - 1 : slideshowActive - 1,
        });

    };

    // 右箭頭
    const handleArrowRight = () => {

        globalDispatch({
            type: 'slideshow',
            payload: slideshowActive + 1 >= data.length ? 0 : slideshowActive + 1,
        });

    };

    return (

        <SlideShowLayout {...rest}>
            <SlideShowContainer className="container">{children}</SlideShowContainer>

            {
                showDot &&
                    <Dots className="Model-x-align">
                        {
                            data.map((_, idx) => (

                                <span
                                    key={idx}
                                    className={(idx === slideshowActive) ? 'active' : 'hide'}
                                ></span>

                            ))
                        }
                    </Dots>
            }

            <Arrows className="slideshow-control-arrows">
                <Button
                    className="Model-y-align"
                    onClick={handleArrowLeft}
                    data-button="left"
                >
                    <FontIcon icon={faChevronLeft} />
                </Button>
                <Button
                    className="Model-y-align"
                    onClick={handleArrowRight}
                    data-button="right"
                >
                    <FontIcon icon={faChevronRight} />
                </Button>
            </Arrows>
        </SlideShowLayout>

    );

};

SlideShow.defaultProps = {
    data: [],
    showDot: false,
};

SlideShow.propTypes = {
    data: PropTypes.array,
    showDot: PropTypes.bool,
};

export default SlideShow;
