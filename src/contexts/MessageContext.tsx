import React, { createContext, Dispatch, useReducer } from 'react'

type MessageState = {
    message ?: string;
}

const MessageContext = createContext<MessageState | undefined>(undefined);

type Action = 
    | { type : 'MESSAGE'; message : string }

type MessageDispatch = Dispatch<Action>;

const MessageDispathContext = createContext<MessageDispatch | undefined>(undefined);


function messageReducer(state : MessageState, action : Action) : MessageState {
    switch(action.type) {
        case 'MESSAGE' :
            return {
                ...state,
                message : action.message,
            }
        default :
            return state
    }
}

export function MessageContextProvider({ children } : { children : React.ReactNode }) {
    const [message, dispatch] = useReducer(messageReducer, {message : ""});
    return (
        <MessageDispathContext.Provider value={dispatch}>
        <MessageContext.Provider value={message}>
          {children}
        </MessageContext.Provider>
      </MessageDispathContext.Provider> 
    )
}