import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoute, publicRoute } from './routes'
import Login from '../pages/Login'
import { getLoggedUser } from '../storageOperation';

function AppRouter() {
    const [update, setUpdate] = useState(0)

    return (
        <>
            <Routes>
                //Private Routes:- Home,MyPost,AddPost
                {getLoggedUser() && privateRoute.map((element,index)=>
                    <Route key={index} path={element.path} element={< element.element setUpdate={setUpdate} />} ></Route>
                )}
                //Public Routes:- Login,Signup
                {publicRoute.map((element,index)=>
                    <Route key={index} path={element.path} element={< element.element setUpdate={setUpdate} />} ></Route>
                )}
                <Route path='*' element={<Login />} ></Route>
            </Routes>
        </>
    )
}

export default AppRouter