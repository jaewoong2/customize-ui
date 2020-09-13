import { MessageContextProvider } from 'contexts/MessageContext'
import React from 'react'
import AppContainer from './components/AppContainer'
import { BrowserRouter } from 'react-router-dom';




const App = () => {



  return (
    <div>
      <BrowserRouter>
      <MessageContextProvider>
      <AppContainer/>
      </MessageContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
