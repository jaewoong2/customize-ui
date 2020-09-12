import React, { useState, useEffect, useContext } from 'react'
import MyModal from 'components/Modal/MyModal'
import MyInput from 'components/input/MyInput'
import MyImageSlide from 'components/ImageSlide/MyImageSlide';
import styled from 'styled-components';
import MyCard from 'components/card/MyCard';
import MyButton from 'components/button/MyButton';
import { MessageState } from 'contexts/MessageContext';

const MainDiv = styled.div`
    width : 100%;
    height : 100%;

    .image-wrapper {
        width : 100%;
        height : 350px;
    }
`

const MainSection = () => {
    const [visible, setVisible] = useState(false);
    const [imageArray, setImageArray] = useState<string[]>([]);
    const message = useContext(MessageState)


    useEffect(() => {
        for(let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 150);
            const Imagesrc = `https://source.unsplash.com/collection/${randomNumber})}`;
            setImageArray(prev => prev.concat(Imagesrc));
        }
    },[])
    
    
    return (
        <MainDiv>
            <button onClick={() => setVisible(prev => !prev)}>모달</button>
            <MyModal 
            top={'로그인'}
            mask={true} 
            visible={visible} 
            setVisible={setVisible}
            >
                <MyInput
                    icon={'1'}
                    suffix={'등록'}
                />
                <MyInput
                 icon={'12'}
                 suffix={'등록하기'}/>
                <MyInput/>
                <MyInput/>
                <MyInput/>
            </MyModal>
            <div className="image-wrapper">
            <MyImageSlide 
            interval={false}
            draggable={false}
            imageArray={imageArray}/>
            </div>
            {/* <div style={{ left : '0px', top: '0px', width : '100vw', height : '100vh', position : 'absolute', display : 'flex', justifyContent : 'center', alignItems : 'center', backgroundColor : 'rgba(255, 255, 255, 0.2)' }}> */}
            {/* <MyLoading/> */}
            <div style={{ width : '280px', marginLeft : "30%" }}>
                <MyCard 
                title="카드 컴포넌트" 
                main={<h3 style={{ height : "220px"}}>안녕</h3>} 
                bottom={<div style={{ width: '100%'}}>
                <MyButton 
                onClick={() => {
                message('메시지 띄우기 성공', { position : { bottomLeft : true }, info : { warn : true }, timeOut : 3500 })
            }}
                style={{ float : 'right', marginRight : "15px" }}>확인</MyButton></div>} />
            </div>
            <div style={{ width : '100%', height : '1200px'}}></div>
            {/* </div> */}
        </MainDiv>
        
    )
}

export default MainSection
