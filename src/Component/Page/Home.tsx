import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import SelectDropdown from "../Comman/SelectDropdown";
import Categories from "../../Data";
import { QuestionContext } from "../Context/QuestionContext";
 interface DifficultyProps {
  label:String,
  value:String
 }
export default function Home() {
  const [form,setForm] =useState({})
  const Navigate = useNavigate();

  const [topic,setTopic] = useState([])

 const getUser = async()=>{
  try {
    let userData = JSON.parse(localStorage.getItem("user"))
  let response = await fetch(`http://localhost:3000/api/v1/register?id=${userData?._id}`)
    let result = await response.json()
    console.log("response",response,result,result?.bb?.topics)
    setTopic(result?.bb?.topics)
  } catch (error) {
    console.log("errr",error)
  }
 }

useEffect(()=>{
  getUser()

},[])





  const Difficulty : DifficultyProps[] = [
    {
      label: "Easy",
      value: "easy",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "Hard",
      value: "hard",
    },
  ];
  const {updateQuestion}  =useContext(QuestionContext);
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
   let response =  await fetch(`https://opentdb.com/api.php?amount=10&category=${form?.category}&difficulty=${form?.difficulty}&type=multiple`,{
      method:"GET",

     })
   let result = await response.json()
     console.log("response",response,result)
     if(response.ok  === false){
         alert(`Some thing went wrong`)
    }else{
      updateQuestion(result?.results)
        //  alert(`"Your registration successfully done"`)
      Navigate("/quiz")
    }
    } catch (error) {
      console.log("Error",error)
    }
  };
  const onChange =  (e) => {
   const {name,value} = e?.target
   
    setForm((pre)=> ({...pre,[name]:value}))
  };
  console.log("form",form)
  return (
  
  <div className="w-full min-h-screen flex justify-center items-center m">

 
       
        <div className="w-full bg-gray-600  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
              Question Quiz 
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={onSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  required={true}
                  onChange={onChange}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Categories
                </label>
                {/* <input type="text" name="category" id="category" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} onChange={onChange}/> */}
                {/* <SelectDropdown label="" placeholder="Categories.." array={Categories} onChange={onChange}/> */}
                <select
                name="category"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-[50px]"
                >
                  <option value=""></option>
                  {Array.isArray(topic) &&
                    topic.map(({ label, value },index) => {
                      return <option key={index} value={value}>{label}</option>;
                    })}
                    
                </select>
              </div>
              <div>
                <label
                  htmlFor="difficulty"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Difficulty
                </label>
                {/* <input
                  type="text"
                  name="difficulty"
                  id="difficulty"
                  placeholder="Difficulty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={onChange}
                /> */}
                 <select
                 name="difficulty"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-[100px]"
                >
                <option value=""></option>
                  {Array.isArray(Difficulty) &&
                    Difficulty.map(({ label, value }) => {
                      return <option value={value}>{label}</option>;
                    })}
                    
                </select>

              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Start Quiz
              </button>
           
            </form>
          </div>
        </div>
        </div>
      
  
  );
}
