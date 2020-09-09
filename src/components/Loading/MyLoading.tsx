import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'reducer'

const loadingAnimation = keyframes`
    0% {
        height : 40%
    }
    50%,
    100% {
        height : 70%
    }
`
const LoadingWrapper = styled.div`
    width : 100%;
    height  : 100%;
    max-width : 300px;
    max-height : 200px;

    display : flex;
    justify-content : center;
    align-items : center;

    div {
        width : 15%;
        height : 50%;
        border-radius : 25px;
        box-shadow : 3px 3px 3px rgba(0, 0, 0, 0.5), inset -3px -3px 3px rgba(0, 0, 0, 0.5);
        margin-left : 5px;
        margin-right : 5px;
        /* 블랙모드 있을 떄, */
        background-color : ${props => props.theme.black === true ? 'rgba(200, 200, 200, 0.9)' : (props.theme.color ? props.theme.color : 'rgba(11, 10, 10, 1)')};
       /*  블랙모드 구현 하지 않을 때 */
        /* background-color : ${props => (props.theme.color ? props.theme.color : 'rgba(11, 10, 10, 1)')}; */
        transition : height 0.3s;
        animation : ${loadingAnimation} 1s infinite;
    }

    div:nth-child(1) {
        animation-delay : -0.24s;
    }
    div:nth-child(2) {
        animation-delay : -0.12s;
    }
    div:nth-child(3) {
        animation-delay : 0s;
    }
`

type MyLoadingProps = {
    color ?: 'string' 
}

const MyLoading = ({ color } : MyLoadingProps ) => {
    const { theme } = useSelector((state : RootState)  => state.theme);

    const themeMemo = useMemo(() => {
        return {
            black : theme,
            color : color
        }
    },[color, theme])

    return (
        <LoadingWrapper theme={themeMemo}>
            <div></div>
            <div></div>
            <div></div>            
        </LoadingWrapper>
    )
}

export default MyLoading
