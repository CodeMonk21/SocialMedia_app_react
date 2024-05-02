import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoute, publicRoute } from './routes'
import Login from '../pages/Login'
import { getLoggedUser } from '../storageOperation';

function AppRouter() {
    return (
        <>
            <Routes>
                //Public Routes:- Login,Signup
                {publicRoute.map((element,index)=>
                    <Route key={index} path={element.path} element={< element.element />} ></Route>
                )}
                //Private Routes:- Home,MyPost,AddPost
                {privateRoute.map((element,index)=>
                    <Route key={index} path={element.path} element={< element.element />} ></Route>
                    
                )}
                <Route path='*' element={<Login />} ></Route>
            </Routes>
        </>
    )
}

export default AppRouter