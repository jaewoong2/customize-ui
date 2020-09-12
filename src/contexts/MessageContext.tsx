import MyAlert, { optionsProps } from "components/alert/MyAlert";
import React, { createContext, useCallback, useState } from "react";

export const MessageState = createContext<any | undefined>(undefined);

  export function TodosContextProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<{message ?: string; options ?: optionsProps; render ?: boolean}[]>([]);
    const options = {
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
                cancleable : true 
            };

    const messaging = useCallback((text : string, option ?: optionsProps) => {
        const newOption = {
            cancleable : option?.cancleable || options?.cancleable,
            info : {
                normal: option?.info?.normal || options?.info?.normal ,
                success: option?.info?.success || options?.info?.success,
                warn : option?.info?.warn || options?.info?.warn
            },
            position : {
                bottomRight : option?.position?.bottomRight || options?.position?.bottomRight,
                bottomLeft : option?.position?.bottomLeft || options?.position?.bottomLeft,
            },
            timeOut : option?.timeOut || options?.timeOut 
        }
        setMessages(prev => [...prev, { message : text, options : newOption }])
    },[options])
    
    return (
      <MessageState.Provider value={messaging}>
            {children}
            {messages.map(v => (
                <MyAlert text={v?.message} options={v?.options}/>
            ))}
      </MessageState.Provider>
    );
  }

