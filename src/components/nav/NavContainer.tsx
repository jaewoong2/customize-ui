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
const smoothScroll = keyframes`
    0% {
        transform : translateY(-40px);
    }
    100% {
        transform : translateY(0px);
    }
`
const upButton = keyframes`
    0% {
        transform : translateX(-100px);
    }
    100% {
        transform : translateX(0%);
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

     .menu {
        display : flex;
        width : 100%;
        justify-content : space-between;
        font-size : 24px;
        letter-spacing : -.4px;
        transition: all 1s ease;

     }

     .fixed {
        position : fixed;
        top : 0;
        z-index : 100;
        background-color : ${props => props.theme.black === true ?  'rgb(244, 244, 244)': 'rgb(25, 25, 25)'} ;
        border-bottom : 1px solid ${props => props.theme.black === false ?  'rgb(244, 244, 244)': 'rgb(25, 25, 25)'};
        color : ${props => props.theme.black === false ?  'rgb(244, 244, 244)': 'rgb(25, 25, 25)'} ;
        animation : ${smoothScroll} 1s forwards;
     }

    .scrollToTop {
        display : none;
        bottom : 15px;
        left : 15px;
        font-size : 32px;
        filter : drop-shadow(2px 2px 3px #777);
        /* width : 32px; */
        /* height : 32px;  */
        /* border-radius : 50%; */
        /* background-color : white; */
        /* box-shadow : 1px 1px 2px rgba(0, 0, 0, 0.5); */
    }

    .btnfix {
        display : flex;
        position : fixed;
        animation : ${upButton} 1s;
        &:hover {
            cursor : pointer;
        }
    }
 `;

type NavContainerProps = {
    title ?: JSX.Element | string;
    subject ?: JSX.Element | string;
    upScrollFix ?: boolean// 다운스크롤의 반대;
    downScrollFix ?: boolean // 업스크롤의 반대;
}

const NavContainer = ({ title = <h4>Title</h4>, subject = "subject", upScrollFix = false, downScrollFix=true} : NavContainerProps) => {
    const { theme } = useSelector((state : RootState) => state.theme);
    const mainNavRef = useRef<HTMLDivElement>(null);
    
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
                downScrollFix && setScrollFix(true) // 내렸을 때 fix
                    
            if(upScrollFix) {
                setOldScroll(window.scrollY)
                oldScroll > window.scrollY ? setScrollFix(true) : setScrollFix(false)
                // 밑에 있는 상태에서 스크롤을 올리면 fix
            }

                } else {
                    setScrollFix(false)
                }
            }
        }
        window.addEventListener('scroll', scrollNavFix)
        return () => window.removeEventListener('scroll', scrollNavFix)

    },[mainNavRef, oldScroll, downScrollFix, upScrollFix])


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
        <MainNav theme={themeMemo}>
            <div className="title" ref={mainNavRef} >
                <div></div>
                {title}
                <BulbTwoTone onClick={onToggleTheme} twoToneColor={theme ? "#bdbdbdbd" : "gray"} className="theme-changer"></BulbTwoTone>
            </div>
            <div className={scrollFix ? "menu fixed" : "menu"}>
                <div>
                {subject}
                </div>
            </div>
            <span role="img" aria-label="up" className={scrollFix ? "scrollToTop btnfix" : "scrollToTop"} onClick={onClickScrollToTop}>
            🔺
            </span>
        </MainNav>
        </>
    )
}

export default NavContainer
