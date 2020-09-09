import React, { useState, useEffect } from 'react'
import MyModal from 'components/Modal/MyModal'
import MyInput from 'components/input/MyInput'
import MyImageSlide from 'components/ImageSlide/MyImageSlide';

const MainSection = () => {
    const [visible, setVisible] = useState(false);
    const [imageArray, setImageArray] = useState<string[]>([]);

    useEffect(() => {
        for(let i = 0; i < 2; i++) {
            const randomNumber = Math.floor(Math.random() * 150);
            const Imagesrc = `https://source.unsplash.com/collection/${randomNumber})}`;
            setImageArray(prev => prev.concat(Imagesrc));
        }
    },[])

    return (
        <div>
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
            <MyImageSlide imageArray={imageArray}/>
        </div>
        
    )
}

export default MainSection
