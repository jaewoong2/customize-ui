import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import styled from 'styled-components';

const MainDiv = styled.div`
position : relative;
    width : 100%;
    height : 350px;
    display : flex;
    align-items : center;

    .left, .right, .bottom {
        opacity : 0;
        transition : all 0.5s;
    }

    &:hover {
    .left, .right, .bottom {
        opacity : 1;
        transition : all 0.5s;
    }       
}
.left, .right {
            display : flex;
            align-items : center;
            position : absolute;
            color : rgba(255, 255, 255, 0.7);
            text-shadow : 2px 2px 6px rgba(0, 0, 0, 0.7); 
            font-size : 24px;

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
                display : none;
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
        z-index : 2;
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
        transform : ${props => `translateX(-${props.theme.nowImage}%) scale(${props.theme.animationScale})`};
        transition : transform 0.5s;
    }

    transition : transform 0.5s;
`

type MyImageSlideProps = {
    imageArray : string[];
}


const MyImageSlide = ({ imageArray } : MyImageSlideProps) => {
    const [imageLength, setImageLength] = useState<number>(0);
    // 이미지 총 길이

    const [mouseMove, setMouseMove] = useState<number>(0);
    // 드래그 시작 커서위치

    const [nowImage, setNowImage] = useState('0');
    // 이미지 순서 ( translateX(0) => translateX(-100))

    const [animationScale, setAnimationScale] = useState(0);
    // 이미지가 바뀔 때, scale 애니메이션 주기 위함
    

    useEffect(() => {
        setImageLength(imageArray.length -1)
    },[imageArray, imageLength])

    useEffect(() => {
        setAnimationScale(0.9);
        setTimeout(() => {
            setAnimationScale(1);
        },500)
    },[nowImage])

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

    const onDragStartImage = useCallback((e : React.DragEvent<HTMLDivElement>) => {
        setMouseMove(e.clientX)
    },[])

    const onDragEndImage = useCallback((e : React.DragEvent<HTMLDivElement>) => {
        if(e.clientX - mouseMove < -150) {
            // NestImage
            setNowImage((prev) => parseInt(prev[0], 10) + 1 > imageLength ? '0' : `${parseInt(prev[0], 10) + 1}`);        
            setNowImage((prev) => `${prev[0]}00`);
        }
        if(e.clientX - mouseMove > 150) {
            // PrevImage
            setNowImage((prev) => parseInt(prev[0], 10) - 1 < 0 ? `${imageLength}` : `${parseInt(prev[0], 10) - 1}`);
            setNowImage((prev) => `${prev[0]}00`);
        }
        setMouseMove(0)
    },[mouseMove])
    
    const themeMemo = useMemo(() => {
        return {
            nowImage : nowImage,
            animationScale : animationScale
        }
    },[nowImage, animationScale])


    return (
        <MainDiv>
            <span className="left" onClick={onClickLeft}>◀︎</span>
            <ImageWrapper  theme={themeMemo}>
            {imageArray.map(images => (
                <img onDragEnd={onDragEndImage} onDragStart={onDragStartImage} src={images}/>
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
