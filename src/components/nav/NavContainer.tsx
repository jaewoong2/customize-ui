import React, { useCallback } from 'react';
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

const MainNav = styled.nav`
    /* position : fixed; */
    top : 0;
    width : 100vw;
    background-color : ${props => props.theme === true ? "black" : "#a8acad"};

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


 `;

const NavContainer = () => {
    const { theme } = useSelector((state : RootState) => state.theme);
    const dispatch = useDispatch();


    const onToggleTheme = useCallback(() => {
        dispatch({
            type : THEME_CHANGE
        })
    },[])



    return (
        <>
        <MainNav theme={theme}>
            <div className="title">
                <div></div>
                <h4>!--</h4>
                <BulbTwoTone onClick={onToggleTheme} twoToneColor={theme ? "#bdbdbdbd" : "gray"} className="theme-changer"></BulbTwoTone>
            </div>
        </MainNav>
        </>
    )
}

export default NavContainer
