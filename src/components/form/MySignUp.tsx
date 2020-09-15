import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { LockOutlined, UserAddOutlined, KeyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import useInput from '../../hooks/userInput'
import useStyle from '../../hooks/useStyle'
import MyInput from '../input/MyInput'
import MyButton from 'components/button/MyButton'

const StyledDivForInputWrapper = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;

    .submit {
        position : absolute;
        bottom : 20px;
        right : 10px;
    }

    .mainDiv {
        width : 100%;
        display : flex;
        justify-content : center;
        background-color : inherit;
        form {
            width : 90%;
            display : flex;
            justify-content : center;
            flex-wrap : wrap;
        }
    }
    
            .login {
                display : flex;
                justify-content : space-between;
                align-items : center;
                margin-top : 30px;
                margin-bottom : 10px;
                font-size : 12px;
            }
            
            .loginBtn {
                background-color : #066ef7d7;
                padding : 5px;
                padding-left : 7px;
                padding-right : 7px;
                color : white;
                font-size : 14px;
                border : 1px solid #d9d9d9;
                border-radius : 3px 3px 3px 3px;
                outline : 0;
                &:hover {
                    background-color : #3986ebd7;;
                    cursor : pointer;
                    transition : background-color 0.4s;
                }
            }
            .cancelBtn {
                visibility : visible;
                opacity : 1;
                transition : visibility 0.4s, opacity 0.4s;
                &:hover {
                    cursor: pointer;
                }
            }
            .hidden {
                visibility: hidden;
                opacity : 0;
                transition : visibility 0.4s, opacity 0.4s;
            }
            .errormessage {
                color : #db0a0abd;
                font-size : 13px;
            }
`

const MySignUp = () => {
    const [watch, setWatch] = useState(true);
    const [watchConfirm, setWatchConfirm] = useState(true); 
    
    const [email, setEmail, onChangeEmail] = useInput(undefined);
    const [password, setPassword, onChangePassword] = useInput(undefined);
    const [passwordConfirm, setPasswordConfirm, onChangePasswordConfirm] = useInput(undefined);
    const [nickname, setNickname, onChangeNickname] = useInput(undefined);
    
    const errorMemoEmail = useStyle(email);
    const errorMemoPassword = useStyle(password);
    const errorMemoPasswordConfirm = useStyle(passwordConfirm);
    const errorMemoPasswordConfirmWrong = useStyle(password === passwordConfirm);
    const errorMemoNickName = useStyle(nickname);


const onClickWatch = useCallback((value) => () => {
    value === 'watch' && setWatch(prev => !prev)
    value === 'watchConfirm' && setWatchConfirm(prev => !prev)
},[])

const onClickCancelBtn = useCallback((value) => () => {
    value === email && setEmail(undefined);
    value === nickname && setNickname(undefined);
},[email, nickname, setEmail, setNickname])

const onFinish = useCallback(() => {

},[])

    return (
        <StyledDivForInputWrapper>
            <div className="mainDiv">
                <form autoComplete="on" onSubmit={onFinish}>
            <MyInput 
            icon={<UserAddOutlined/>} 
            name={"email"} 
            value={email} 
            onChange={onChangeEmail} 
            suffix={<div onClick={onClickCancelBtn(email)} className={email ? 'cancelBtn' : 'hidden'}>X</div>}
            placeholder={"이메일"} />
            <div className="error" style={errorMemoEmail}>이메일을 입력해주세요..</div>

            <MyInput
            icon={<LockOutlined/>} 
            name={watch ? "password": 'none'} 
            value={password}
            onChange={onChangePassword}
            suffix={
            <div onClick={onClickWatch('watch')} className={password ? 'cancelBtn' : 'hidden'}>
               {watch ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
            </div>}
            placeholder={"비밀번호"} />
            <div className="error" style={errorMemoPassword}>비밀번호를 입력해주세요..</div>

            <MyInput
            icon={<KeyOutlined/>} 
            name={watchConfirm ? "password": 'none'} 
            value={passwordConfirm} 
            onChange={onChangePasswordConfirm}
            suffix={<div onClick={onClickWatch('watchConfirm')} className={passwordConfirm ? 'cancelBtn' : 'hidden'}>
               {watchConfirm ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                </div>}
            placeholder={"비밀번호 확인"} />
            {passwordConfirm && passwordConfirm !== password ? 
            <div className="error" style={errorMemoPasswordConfirmWrong}>비밀번호가 틀렸습니다..</div>:
            <div className="error" style={errorMemoPasswordConfirm}>비밀번호를 확인해주세요..</div>
            } 
            <MyInput 
            icon={<UserAddOutlined/>} 
            name={"nickname"} 
            value={nickname} 
            onChange={onChangeNickname} 
            suffix={<div onClick={onClickCancelBtn(nickname)} className={nickname ? 'cancelBtn' : 'hidden'}>X</div>}
            placeholder={"닉네임"} />
            <div className="error" style={errorMemoNickName}>닉네임을 입력해주세요..</div>

            <div className="submit">
                <MyButton style={{height : "30px"}} primary type="submit">회원가입</MyButton>
            </div>
            {/* <div className="login">
                <button type="submit" className="loginBtn">{registerUserLoading ? <LoadingOutlined/> : '회원가입'}</button>
                </div>
                {<div className="errormessage">{registerUserError}</div>}
            */}
            </form>
            </div>
        </StyledDivForInputWrapper>
    )
}

export default MySignUp