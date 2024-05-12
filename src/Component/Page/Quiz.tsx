import React, { useContext, useEffect, useState } from 'react'
import { QuestionContext } from '../Context/QuestionContext';
import { input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
    const Navigate = useNavigate()
    const {question}  =useContext(QuestionContext);
   
   const [arrayAnswer,setArrayAnswer] = useState([])
   const [ArrayResult,setArrayResult] = useState(Array(10).fill(""))
   console.log("kalLKFLK",ArrayResult)
    const [Next,setNext] =useState(0)
   
    const createArray =(object)=>{
       let newFKlK = [...object?.incorrect_answers,object?.correct_answer]
        

setArrayAnswer(newFKlK.sort())
        return newFKlK.sort()
    }
    useEffect(()=>{
        if(question.length > 0){
            if(question[Next]){
                createArray(question[Next])
            }
        }
    },[Next,question])

    const chengeArray =(index,val)=>{
        let aa = [...ArrayResult]
          aa.splice(index,1,val)
          setArrayResult(aa)
    }


const onSubmit = async()=>{
    let rtnPint = question.reduce((acc,cur)=>{     
        acc +=  ArrayResult.includes(cur.correct_answer)  ? 1 : 0
        return acc
         },0)
         console.log("rtnPint",rtnPint)
    let data = {
        totalAttempt:ArrayResult.length,
        totalPoints:question.length * 2,
        totalQuestions:question.length,
        totalEarnPoint:rtnPint *2,
        result:rtnPint *2 > 10 ? "passed" : "failed",
    }
    let userData = JSON.parse(localStorage.getItem("user"))
    try {
        const response = await fetch("http://localhost:3000/api/v1/result",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({data:data,userId:userData?._id})
         })
         if(response.ok  === true){
            Navigate("/result")
        
          }
       
        console.log("response",response)
    } catch (error) {
        console.log("errr",error)
    }

}
  
  return (
    <>
    <div className='text-[24px] font-bold text-center my-10'>Questions</div>
    
    {
        question?.length > 0 ?  question.map((object,ii)=>{
            return(
                
               <div className='flex justify-center mb-2'>
                <div className='border-2 w-3/4 px-2 my-1'>
                <div className='my-4'>{object?.question}</div>
                 <div className='flex'>
                    {arrayAnswer &&
                        [...object.incorrect_answers,object.correct_answer].sort()?.map((val)=>{
                            return(
                                <div className='w-1/2 my-2' onClick={()=>{chengeArray(ii,val)}}>
                                    <input type="radio" name={`radio${ii}`} />
                                    <label className='ml-2' htmlFor="">{val}</label>
                                </div>
                            )
                        })
                    }
                 </div>
                 </div>
                
               </div>
            )
        })
       
        :
        <div className='w-full min-h-[500px] flex justify-center items-center flex-col gap-y-4'>
            <div className='text-[24px] font-bold my-4'>No Data available</div>
            <button className='py-1 px-4 border-2' onClick={()=>{Navigate("/")}}>Go Home Page</button>
        </div>
    }
     <div className='flex justify-between px-10 fixed bottom-10 right-0'>
                {/* <button className='px-4 py-1 border-2 border-white' type='button' onClick={()=>{setNext(Next > 0 ? Next -1 : 0 )}}>Previous</button> */}
                <button className='px-4 py-1 border-2 border-white' type='button' onClick={onSubmit}>submit</button>
            </div>
   
    
    
    </>
  )
}

