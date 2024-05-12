import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResultPage() {
    const Navigate = useNavigate()
    const [result,setResult]= useState([])
    const [userDetails,setUserDetails]=useState({})
const getResult = async()=>{
    
    let userData = JSON.parse(localStorage.getItem("user"))
    try {
        let response = fetch(`http://localhost:3000/api/v1/register?id=${userData?._id}`)
        let resultData = await (await response).json()
        console.log("response",response,resultData?.bb?.result)
        setResult(resultData?.bb?.result)
        setUserDetails(resultData?.bb)
    } catch (error) {
        console.log("errr",error)
    }

}
useEffect(()=>{
    getResult()
},[])
    
  return (

      <>
      <div className='text-[24px] font-bold my-10 text-center'>Result </div>

      <div>
        <div className='flex justify-center'>
            {result?.length > 0 && result.map((object)=>{
                return(
                    <div className='border-2 px-2 py-1 w-full md:3/4 lg:w-1/2'>
                        <div>User Name : {userDetails?.firstName} {userDetails?.lastName}  </div>
                        <div>Total Attempt: {object?.totalAttempt}</div>
                        <div>Total Earn Point: {object?.totalEarnPoint} </div>
                        <div>Total Points: {object?.totalPoints}</div>
                        <div>Total Question:{object?.totalQuestions} </div>
                        <div>Results: {object?.result}</div>
                    </div>
                )
            })

            }
        </div>
        <div className='flex gap-2 w-full justify-end'>
            <button className='border-2 px-4 py-1' onClick={()=>{Navigate("/login")}}>Logout</button>
            <button className='border-2 px-4 py-1' onClick={()=>{Navigate("/")}}>Go Home</button>
        </div>
      </div>
    </>
  )
}
