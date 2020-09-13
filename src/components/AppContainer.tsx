import React from 'react'
import NavContainer from './nav/NavContainer'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'reducer'
import MainSection from './main/MainSection'
import Myfooter from './nav/Myfooter'

const MainDiv = styled.div`
   color :  ${props => props.theme === true? 'whitesmoke' : 'black'};
   
   width : 100%;
   /* 높이 설정이 100%, vh 면 window.addeventListener(scroll') 안됨 */
   overflow-x : hidden;

   transition : background-color 0.5s, color 0.5s;

   main {
       width : 100%;
       display : flex;
       background-color : ${props => props.theme === true ? "gray" : 'whitesmoke'};
        
       .section-1 {
            width : 20%;
            border : 1px solid black;
        }
        .section-2 {
            width : 60%;
            border : 1px solid black;
        }

        .section-3 {
            width : 20%;
            border : 1px solid black;
        }


        @media screen and (max-width : 694px) {
            flex-direction : column;
            
            .section-1 {
                width : 100%;
                border : 1px solid black;
            }
            
            .section-2 {
                width : 100%;
                border : 1px solid black;
            }
        
            .section-3 {
                width : 100%;
                border : 1px solid black;
            }
        }
   }
`

const AppContainer = () => {
    const { theme } = useSelector((state : RootState) => state.theme);
    

    return (
        <MainDiv theme={theme}>
            <nav>
                <NavContainer/>
            </nav>
            <main>
                <section className="section-1">
                    <div>
                        ㅎㅇ
                    </div>
                </section>
                <section className="section-2">
                    <MainSection/>
                </section>
                <section className="section-3">
                    3
                </section>
            </main>
            <footer>
                <Myfooter/>
            </footer>
        </MainDiv>
    )
}

export default AppContainer
