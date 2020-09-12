import { TodosContextProvider } from 'contexts/MessageContext'
import React from 'react'
import AppContainer from './components/AppContainer'




const App = () => {



  return (
    <div>
      <TodosContextProvider>
      <AppContainer/>
      </TodosContextProvider>
    </div>
  )
}

export default App
