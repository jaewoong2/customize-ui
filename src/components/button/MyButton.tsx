import React, { useMemo } from 'react'
import styled from 'styled-components'

const MainButton = styled.button`
    border : 0;
    box-shadow: 0 3px 6px -2px;
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
        cursor : pointer;
        filter : brightness(120%);
        transition-property: filter;
    }

    text-decoration : ${props => props.theme.disabled === true ? 'line-through' : 'none'};
    
    &:active {
        font-size: 0.85rem;
        transform: scale(0.95);
    }
`

const MyButton = ({ children, style, primary, disabled, warning } : any) => {

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
