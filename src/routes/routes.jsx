import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import AddPost from "../pages/AddPost"
import MyPost from "../pages/MyPost"

export const publicRoute = [
    {
        name:"login",
        path:"/login",
        element: Login
    },
    {
        name:"signup",
        path:"/signup",
        element: Signup
    },
]

export const privateRoute = [
    {
        name:"home",
        path:"/",
        element: Home
    },
    {
        name:"addPost",
        path:"/addPost",
        element: AddPost
    },
    {
        name:"myPost",
        path:"/myPost",
        element: MyPost
    },
]