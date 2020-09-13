import MyAlert, { optionsProps } from "components/alert/MyAlert";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";


  type MessageContextState = (text: string, option?: optionsProps) => void;
  const defaultState = (text: string, option?: optionsProps | any) => {}
  export const MessageState = createContext<MessageContextState>(defaultState);

  export function MessageContextProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<{message ?: string; options ?: optionsProps;}[]>([]);
    const [text, setText] = useState<string>('');
    
    const intialOptions : optionsProps | any = useMemo(() => ({
                position : {
                    bottomRight : true,
                    bottomLeft : false,
                },
                info : {
                    success : false,
                    warn : false,
                    normal : true,
                },
                timeOut :  3500,
                cancleable : true,
                emoji : true,
          }),[]);

    const [newOption, setNewOption] = useState<optionsProps | undefined>(intialOptions);

    useEffect(() => {
      text !== "" && setMessages(prev => prev.concat({ message : text, options : newOption }))
    },[newOption, text])
    
    useEffect(() => {
      messages.forEach(message => {
        if(message.message === "") setMessages(prev => prev.filter(message => message.message !== ""));
      })
    },[messages])
    
    const messaging = useCallback((text : string, option ?: optionsProps | any) : void => {
          setText(text);
          setNewOption(() => {
            let returnOption : optionsProps | undefined | any = {};
            for(let key in intialOptions) {
                if(option[key] !== undefined) returnOption[key] = option[key] ;
                else if(!returnOption[key]) returnOption[key] = intialOptions[key];
            }
            return returnOption
          })
      },[intialOptions])
    
    return (
      <MessageState.Provider value={messaging}>
            {children}
            {messages.map((v, index) => (
                <MyAlert key={"aliert" + index} index={index} setMessages={setMessages} text={v?.message} options={v?.options}/>
            ))}
      </MessageState.Provider>
    );
  }

