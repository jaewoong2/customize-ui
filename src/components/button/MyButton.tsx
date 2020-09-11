import React, { useMemo } from 'react'
import styled from 'styled-components'

const MainButton = styled.button`
    border : 0;
    box-shadow: 0 2px 4px -2px;
    border-radius : 4px;
    transition: transform .4s, filter .3s;
    font-size: 0.85rem;
    background-color : ${props => 
    props.theme.primary === true ? 'rgba(25, 115, 245, 0.7)' : 
    props.theme.warning === true ? 'rgba(255, 50, 40, 0.8)' : 
    props.theme.disabled === true ? 'rgba(45, 45, 45, 0.7)' : 'rgba(205, 205, 205, 0.7)'
    };

    .children {
        padding : 2px 3px 2px 3px;
    }

    &:focus {
        outline : 0;
    }

    &:hover {
        cursor : ${props => props.theme.disabled === false ? 'pointer' : 'not-allowed'};
        filter : ${props => props.theme.disabled === false ? 'brightness(120%);' : 'none'};
        transition-property : ${props => props.theme.disabled === false ? 'filter' : 'none'};
    }

    text-decoration : ${props => props.theme.disabled === true ? 'line-through' : 'none'};
    
    &:active {
        font-size: 0.85rem;
        transform: ${props => props.theme.disabled === false ? 'scale(0.95);' : 'none'};;
    }
`

type myButtonProps = {
    children ?: React.ReactNode, 
    style ?: React.CSSProperties | object,
    primary ?: boolean,
    disabled ?: boolean,
    warning ? : boolean
}

const MyButton = ({ children, style, primary, disabled = false, warning } : any) => {

    const styleMemo = useMemo(() => style,[style]);
    const themeMemo = useMemo(() => {
        return {
            primary, 
            warning,
            disabled,    
        } 
    },[primary, warning, disabled]);

    return (
        <MainButton disabled={disabled ? true : false} theme={themeMemo} style={styleMemo}>
            <div className="children">
                {children}
            </div>    
        </MainButton>
            
    )
}

export default MyButton
