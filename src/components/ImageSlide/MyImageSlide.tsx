import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components';

const MainDiv = styled.div`
    position : relative;
    width : 100%;
    height : 350px;
    display : flex;
    align-items : center;

    .left, .right {
        display : flex;
        align-items : center;
        position : absolute;
        color : rgba(255, 255, 255, 0.7);
        text-shadow : 2px 2px 6px rgba(0, 0, 0, 0.7); 
        font-size : 24px;
        z-index : 2;

        
        &:hover {
            cursor : pointer;
            color : rgba(40, 60, 144, 0.7);
            transition : color 0.4s;
        }
        transition : color 0.4s;

    }

    .bottom {
        display : flex;
        width : 100%;
        justify-content : center;
        position : absolute;
        bottom : 0;

        input[type="checkbox" i] {
            background-color: initial;
            appearance: checkbox;
            box-sizing: none;
            padding: initial;
            border-radius : 50%;
            display : none;
            margin : 0px 3px 0px 3px;
            transition : transform 0.4s, background-color 0.4s;
        }
        

        input[type="checkbox" i] + span {
            margin-right : 5px;
            margin-left : 5px;
            width : 20px;
            height : 20px;
            background-color : rgba(255, 255, 255, 0.7);
            box-shadow : 2px 2px 6px rgba(0, 0, 0, 0.7); 
            position : realtive;
            border-radius : 50%;
                &:hover {
                    cursor : pointer;
                    transform : scale(1.2);
                }
        }

        input[type="checkbox" i]:checked + span {
            margin-right : 5px;
            margin-left : 5px;
            width : 20px;
            height : 20px;
            background-color : rgba(40, 60, 144, 0.9);
            box-shadow : 2px 2px 6px rgba(0, 0, 0, 0.7); 
            position : realtive;
            border-radius : 50%;
            transform : scale(1.3);
                &:hover {
                    cursor : pointer;
                }
        }
        
    }

    .left {
        left : 0;
    }
    .right {
        right : 0;
    }


`

const ImageWrapper = styled.div`
    width : 100%;
    height : 100%;
    max-height : 350px;
    display : flex;
    overflow-x : hidden;

    img {
        max-width : 100%;
        transform : ${props => `translateX(-${props.theme.nowImage}%)`};
        transition : transform 0.5s;
    }


    transition : transform 0.5s;

`


const MyImageSlide = () => {
    const [imageArray, setImageArray] = useState<string[]>([]);
    const [imageLength, setImageLength] = useState<number>(0);
    const [nowImage, setNowImage] = useState('0');
    const bottomRef = useRef(null);
    
    useEffect(() => {
        for(let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 150);
            const Imagesrc = `https://source.unsplash.com/collection/${randomNumber})}`;
            setImageArray(prev => prev.concat(Imagesrc));
        }
    },[])

    useEffect(() => {
        setImageLength(imageArray.length -1)
    },[imageArray, imageLength])

    const onClickLeft = useCallback(() => {
        setNowImage((prev) => parseInt(prev[0], 10) - 1 < 0 ? `${imageLength}` : `${parseInt(prev[0], 10) - 1}`);
        setNowImage((prev) => `${prev[0]}00`);
    },[nowImage, imageLength])
    
    const onClickRight = useCallback(() => {
        setNowImage((prev) => parseInt(prev[0], 10) + 1 > imageLength ? '0' : `${parseInt(prev[0], 10) + 1}`);        
        setNowImage((prev) => `${prev[0]}00`);
    },[nowImage, imageLength])

    const onClickBottom = useCallback((number) => () => {
        setNowImage(`${number}00`);
    },[])

    const onDragImage = useCallback((e : React.DragEvent<HTMLDivElement>) => {
        setNowImage((prev) => `${parseInt(prev, 10) + 1}`);
    },[])

    return (
        <MainDiv>
            <span className="left" onClick={onClickLeft}>◀︎</span>
            <ImageWrapper  theme={{nowImage : nowImage}}>
            {imageArray.map(images => (
                <img onDrag={onDragImage} src={images}/>
            ))}
            </ImageWrapper>
            <span className="right" onClick={onClickRight}>▶︎</span>
            <div className="bottom">
            {imageArray.map((images, i) => (
                <>
                <input className="bottom-toggle" checked={i === parseInt(nowImage[0], 10)}  type="checkbox"/>
                <span onClick={onClickBottom(i)}></span>
                </>
            ))}
            </div>
        </MainDiv>
    )
}

export default MyImageSlide
