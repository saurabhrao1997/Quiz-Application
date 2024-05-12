import {lazy,Suspense, } from 'react'
import { Routes,Route} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import fallbackRender from './Component/Comman/ErrorBoundries'
import Loader from './Component/Comman/loarder'
const Login = lazy(()=> import('./Component/Page/Login'))
const Home = lazy(()=> import('./Component/Page/Home'))
const Quiz = lazy(()=> import('./Component/Page/Quiz'))
const SelectedTopics = lazy(()=> import('./Component/Page/SelectTopics'))
const Result = lazy(()=> import('./Component/Page/ResultPage'))
const Register = lazy(()=> import('./Component/Page/Register'))
function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={fallbackRender}>
        <Suspense fallback={<div className='absolute left-0 top-0 w-full h-screen  bg-[#224952]'>    <Loader/></div>}>
          <div className="flex flex-col bg-[#224952] min-h-screen text-white">
         
            <div className='flex'>
         
              <div className={` w-full `}>
                <Routes>
                  <Route path="/login" element={<Login />}>
                    Login
                  </Route>
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/quiz" element={<Quiz />}></Route>
                  <Route path="/topic" element={<SelectedTopics />}></Route>
                  <Route path="/result" element={<Result />}></Route>
                </Routes>
             
              </div>
             
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App
