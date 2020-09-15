import React, { useState, useEffect, useContext, useCallback } from 'react'
import MyModal from 'components/Modal/MyModal'
import MyInput from 'components/input/MyInput'
import MyImageSlide from 'components/ImageSlide/MyImageSlide';
import styled from 'styled-components';
import MyCard from 'components/card/MyCard';
import MyButton from 'components/button/MyButton';
import { MessageState } from 'contexts/MessageContext';
import MyMenu from 'components/menu/MyMenu';
import MyLoading from 'components/Loading/MyLoading';
import MySignUp from 'components/form/MySignUp';
import MyGrabSlider from 'components/grabSlider/MyGrabSlider';

const MainDiv = styled.div`
    width : 100%;
    height : 100%;

    .image-wrapper {
        width : 100%;
        height : 350px;
    }

    .image-contaienr-in-slider {
        width : 100%;
        height : 100%;
        display : flex;
        justify-content : center;
        align-items : center;
        flex-shrink: 0;
        margin : 0 5px 0 5px;
        img {
            /* -webkit-user-drag: none; */
            /* user-drag: none; */
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }
`

const MainSection = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [imageArray, setImageArray] = useState<string[]>([]);
    const message = useContext(MessageState);


    useEffect(() => {
        setLoading(true)
        for(let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 150);
            const Imagesrc = `https://source.unsplash.com/collection/${randomNumber}`;
            setImageArray(prev => prev.concat(Imagesrc));
        }
        setLoading(false)
        message('효림아 안녕', { emoji : false })
    },[message])

    const onClickCardButton = useCallback(() => {
        message('버튼을 눌렀습니다.', { emoji : true, position : { bottomLeft : true }, info : { success : true} })
    },[])
    
    const onClickMenuButton = useCallback(() => {
        setMenuVisible(prev => !prev)
    },[])

    
    return (
        <MainDiv>
            <MyGrabSlider height="460px">
            {imageArray.map(image => (
            <div className="image-contaienr-in-slider">
                    <img  alt="asd" src={image}/>
            </div>
            ))}
            </MyGrabSlider>
            <MyLoading height="40px" width={"20%"}/>
            <MyMenu menus={['1','2','3','4']} visible={menuVisible} setVisible={setMenuVisible} />
            <MyButton fontSize="1rem" style={{width : '90px' }} primary onClick={onClickMenuButton}>메뉴</MyButton>
            <MyButton fontSize="1rem" style={{width : '90px' }} primary onClick={() => setVisible(prev => !prev)}>모달</MyButton>
            <MyModal 
            top="회원가입"
            mask={true} 
            visible={visible} 
            setVisible={setVisible}
            >
                <MySignUp/>
            </MyModal>
            <div className="image-wrapper">
            <MyImageSlide 
            loading={loading}
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
                onClick={onClickCardButton}
                style={{ float : 'right', marginRight : "15px" }}>확인</MyButton></div>} />
            </div>
            <div style={{ width : '100%', height : '1200px'}}></div>
            {/* </div> */}
        </MainDiv>
        
    )
}

export default MainSection
