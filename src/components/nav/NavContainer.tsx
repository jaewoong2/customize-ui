import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { THEME_CHANGE } from '../../reducer/theme';
import { BulbTwoTone } from '@ant-design/icons'

const flicker = keyframes`
    from {
        opacity : 0;
    }
    to {
        opacity : 1;
    }
`
const FixedTopNav = styled.nav`
    position : fixed;
    z-index : 100;
    height : ${props => props.theme.scrollFix === true ? 'initial' : '0%'};
    top : 0;
    width : 100%;
    background-color : ${props => props.theme.black === true ? "rgba(24, 24, 24, 0.9)" : "#a8acad"};
    transition : height 0.5s;
    border-radius : 0px 0px 15px 15px;
    box-shadow : 1px 1px 3px ${props => props.theme.black === true ? "#d9d9d9d9" : "#34343434"};

    .title {
        display : ${props => props.theme.scrollFix === true ? 'flex' : 'none'};
        width : 100%;
        justify-content : center;
        font-size : 40px;
        letter-spacing : 5px;
        position : relative;

        &:hover {
            cursor : pointer;
        }

        * {
            margin : 0;
            padding : 0;
        }
    }
`

const MainNav = styled.nav`
    top : 0;
    width : 100%;
    background-color : ${props => props.theme.black === true ? "black" : "#a8acad"};

     .title {
        display : flex;
        width : 100%;
        justify-content : center;
        font-size : 40px;
        letter-spacing : 5px;
        position : relative;
        text-shadow : 2px 4px 5px #777;
        padding-top : 15px;

        h4 {
            /* 패딩이랑 마진이 있음 */
            margin : 0;
            padding : 0;
            padding-bottom : 10px;

            &::after {
                content : "";
                background-color : #393;
                width : 2px;
                height : 40%;
                margin-bottom : 15px;
                border-radius : 30px;
                position : absolute;
                bottom : 0;
                animation : ${flicker} 1.4s infinite;
            }
        }

        .theme-changer {
            font-size : 45px;
            margin-right : 30px;
            position : absolute;
            right : 0;
            filter : drop-shadow(5px 5px 6px #d8d8d8d9); 

            &:focus {
                outline : 0;
            }

            &:hover {
                transform : rotate(-15deg);
            }
        }
     }

     .subject {
        display : flex;
        width : 100%;
        justify-content : center;
        font-size : 24px;
        letter-spacing : 2px;
        position : relative;
        text-shadow : 2px 4px 5px #777;
     }
 `;

type NavContainerProps = {
    title ?: JSX.Element | string;
    subject ?: JSX.Element | string;
}

const NavContainer = ({ title = <h4>Title</h4>, subject = "subject"} : NavContainerProps) => {
    const { theme } = useSelector((state : RootState) => state.theme);
    
    const mainNavRef = useRef<HTMLElement>(null);
    const [scrollFix, setScrollFix] = useState(false);
    const [oldScroll, setOldScroll] = useState(0);
    const dispatch = useDispatch();


    const onToggleTheme = useCallback(() => {
        dispatch({
            type : THEME_CHANGE
        })
    },[])

    useEffect(() => {
        const { current } = mainNavRef;

        const scrollNavFix = () => {
            if(current) {
                if(window.scrollY > current?.clientHeight) {
                    setOldScroll(window.scrollY)
                    if(oldScroll > window.scrollY) {
                        setScrollFix(true)
                    } else {
                        setScrollFix(false)
                    }
                } else {
                    setScrollFix(false)
                }
            }
        }
        window.addEventListener('scroll', scrollNavFix)
        return () => window.removeEventListener('scroll', scrollNavFix)
    },[mainNavRef, oldScroll])


    const themeMemo = useMemo(() => {
        return {
            black : theme,
            scrollFix
        }
    },[theme, scrollFix])

    const onClickScrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth'})
    },[])

    return (
        <>
        <FixedTopNav onClick={onClickScrollToTop} theme={themeMemo}>
            <div className="title">
                {title}
            </div>
        </FixedTopNav>
        <MainNav ref={mainNavRef} theme={themeMemo}>
            <div className="title">
                <div></div>
                {title}
                <BulbTwoTone onClick={onToggleTheme} twoToneColor={theme ? "#bdbdbdbd" : "gray"} className="theme-changer"></BulbTwoTone>
            </div>
            <div className="subject">
                {subject}
            </div>
        </MainNav>
        </>
    )
}

export default NavContainer
