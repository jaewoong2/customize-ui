import React, { useState } from 'react'
import MyModal from 'components/Modal/MyModal'
import MyInput from 'components/input/MyInput'
import MyImageSlide from 'components/ImageSlide/MyImageSlide';

const MainSection = () => {
    const [visible, setVisible] = useState(false);

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
            <MyImageSlide/>
        </div>
        
    )
}

export default MainSection
