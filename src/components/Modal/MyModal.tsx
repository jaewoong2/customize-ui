import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'reducer'

const TopWidthAnimaiton = keyframes`
    from {
        width : 0%;
    }
    to {
        width : 90%;
    }
`
const showContent = keyframes`
    0% {
        transform : translateY(-100%);
    }
    75% {
        transform : translateY(10%);
    }
    100% {
        transform : translateY(0%);
    }
`
const closeContent = keyframes`
    0% {
        transform : scale(1);
    }
    100% {
        transform : scale(0.7);
    }
`

const MyModalDiv = styled.div`
    width : 100vw;
    height : 100vh;
    /* background : rgba(0, 0, 0, 0.5); */
    background-color : ${props => props.theme.black === true ? 'rgba(0, 0, 0, 0.5)' : 'rgba(200, 200, 200, 0.4)'};
    backdrop-filter: blur(4px);
    position : fixed;
    left : 0;
    top : 0;
    z-index : 100;
    display : flex;
    justify-content : center;
    
    .content {
        position : absolute;
        max-width : 500px;
        width : 75%;
        background-color : ${props => props.theme.black === true ? 'rgba(122, 122, 122, 0.9)' : 'rgba(255, 255, 255, 0.8)'};
        /* border : 5px solid rgba(110, 43, 255, 0.5); */
        /* box-shadow : -2px -2px 4px rgb(122, 133, 240); */
        border : ${props => props.theme.black === true ? '5px solid rgba(0, 0, 0, 0.5)' : '5px solid rgba(110, 43, 255, 0.5)'};
        box-shadow : ${props => props.theme.black === true ? '-2px -2px 4px rgba(0, 0, 0, 0.2)' : '-2px -2px 4px rgb(122, 133, 240)'};
        margin-top : 120px;
        border-radius : 12px;
        display : flex;
        flex-direction : column;
        ${props => props.theme.visible === true ? css`
        animation : ${showContent} 1s;
        ` :css`
        animation : ${closeContent} 0.9s;
        `
        };

        .main {
            display : flex;
            flex-direction : column;
            align-items : center;
            margin-bottom : 40px;
        }
    }

    .top-container {
        height : 10%;
        width : 100%;
        position : relative;
        display : flex;
        justify-content : center;
        align-items : center;

        .top {
            height : 100%;
            width : 100%;
            display : flex;
            justify-content : space-between;
            padding-bottom : 10px;

            .top-name {
                margin-top : 10px;
                margin-left : 10px;
            }

            .cancel-icon {
                margin : 10px 10px;
                
                &:hover {
                    cursor : pointer;
                    color : #349491;
                    transition : color 0.4s;
                }
            }
        }


        &::after {
            content : "";
            position : absolute;
            border-radius : 13px;
            bottom : 0;
            height : 3px;
            width : 90%;
            animation : ${TopWidthAnimaiton} 2s;
            background-color : ${props => props.theme.black === true ? '#d9d9d9d9' : 'rgba(122, 133, 240, 0.5)'};
            box-shadow : ${props => props.theme.black === true ? '2px 2px 4px rgba(0, 0, 0, 0.2)' : '2px 2px 4px rgb(122, 133, 240)'};
        }
    }
`
type ModalProps = {
    cancel ?: JSX.Element | string;
    visible ?: boolean;
    setVisible : (visible : boolean) => void;
    mask ?: boolean;
    top ?: JSX.Element | boolean | string;
    children ?: React.ReactNode | string;
}


const MyModal = ({ cancel,  mask = true, visible = true ,top = true, setVisible, children} : ModalProps) => {
        const { theme } = useSelector((state : RootState) => state.theme);
        const [modalVisible, setModalVisible] = useState(visible);

        const themes = useMemo(() => ({
                black : theme,
                animationVisible : modalVisible,
                visible : visible
        }),[theme, modalVisible, visible])

        useEffect(() =>{
            setTimeout(() => {
                setModalVisible(visible)
            }, 700);
            visible === true && document.body.classList.add('not-scroll');
            visible === false && document.body.classList.remove('not-scroll');
        },[visible])

        const onClickMask = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if(mask) {
                if(e.currentTarget === e.target) {
                    visible === modalVisible && setVisible(false);
                }
            }
        },[mask, visible, modalVisible, setVisible])

        const onClickCancel = useCallback(() => {
            visible === modalVisible && setVisible(false);
        },[visible, modalVisible, setVisible])

        if(!visible && !modalVisible) {
            return <></>
        }
        
    return (
        <MyModalDiv onClick={onClickMask} theme={themes}>
            <div className="content">
                {top && <div className="top-container">
                    <div className="top">
                        <div className="top-name">
                            {top}
                        </div>
                        <div className="cancel-icon" onClick={onClickCancel}>
                        {cancel ? cancel : 'X'} 
                        </div>
                    </div>
                </div>}
                <div className="main">
                    {children ? children : ''}
                </div>
            </div>
        </MyModalDiv>
    )
}

export default MyModal
