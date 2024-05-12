
import React, { useEffect } from "react";
import  {createContext, useState} from "react" ;
export const QuestionContext = createContext({
    question:[]
})

export const QuestionState = (props:any) =>{
    const [question,setQuestion] = useState<any>([])
    const updateQuestion =(val)=>{
      setQuestion(val)
    
    }
    return(
      <QuestionContext.Provider value={{question,updateQuestion}}>
          {props.children}
      </QuestionContext.Provider>
    )
  }