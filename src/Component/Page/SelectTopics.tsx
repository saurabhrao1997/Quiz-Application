import React, { useState } from 'react'
 import Categories from '../../Data'
import { useNavigate } from 'react-router-dom'
export default function SelectTopics() {
    const navigate = useNavigate()
    const [selectedTopics,setSelectedTopics] = useState([])
  const  onSelectedval = (val) =>{
     if(!selectedTopics.includes(val)){
        setSelectedTopics((pre)=> [...pre,val])
     }else{
           let aa  = [...selectedTopics]
        let indexxx =   aa.findIndex((value)=> value == val)
        if(indexxx > -1){
            aa.splice(indexxx,1)
            setSelectedTopics(aa)
        }
        
     }
  } 
  const onSubmit = async() =>{
    try {
 
        let array = Categories.filter(({label})=>  selectedTopics.includes(label))
        let userData = JSON.parse(localStorage.getItem("user"))
         console.log("user",userData)
    let responce = await fetch("http://localhost:3000/api/v1/topics",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
            
        },
        body:JSON.stringify({topics:array,userId:userData?._id})

    })
    let result = await responce.json()
    console.log("sajlfks;",result,responce)
           if(responce.ok == true){
            navigate("/")
           }
    } catch (error) {
        
    }
  }
  return (
    <>
    <div className='px-2'>
    <div className='my-10 text-[24px]'>Select Topics for exam</div>
      <div className='flex flex-wrap'>
        {Categories.length > 0 &&
            Categories.map(({label})=>{
              return(
                <span className={`cursor-pointer text-[]24px px-4 py-1 border-2 mx-2 my-2 ${selectedTopics.includes(label) && "bg-orange-800"}`} onClick={()=>{onSelectedval(label)}}>{label}</span>
              )
            })

        }
      </div>

    </div>
      
      <button className='absolute bottom-10 right-4 px-4 py-1 border-2' onClick={onSubmit}>submit</button>

    </>
  )
}
