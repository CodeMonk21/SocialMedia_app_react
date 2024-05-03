import React, { useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import { Avatar } from '@mui/material';
import { getLoggedUser} from '../storageOperation';
import { Link} from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';

function Navbar({handleLogout}) {
    // Hooks
    const [userLogged, setUserLogged] = useState({name:""})
    
    useEffect(() => {
        setUserLogged(getLoggedUser())
    }, [])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center shadow py-1 px-3 text-white Navbar-container' style={{}}>
                <div className='d-flex'>
                    <AdbIcon style={{ width: "50px", height: "40px" }} />
                    <h2>Social Connect</h2>
                </div>
                <div className='d-flex align-items-center mx-5 gap-3'>
                    <Avatar sx={{ bgcolor: "#6894e0" }}> {userLogged.name.charAt(0).toUpperCase()} </Avatar>
                    <select className="Navbar-select">
                        <option className='text-bold' defaultValue>{userLogged.name}</option>
                        {/* <option ><Link to="/myPost"> MyPost</Link></option> */}
                        <option >MyPost</option>
                    </select>
                    {/* Add Post */}
                    <Link className='Navbar-link' to="/addPost" title = "Add Post"><PostAddIcon  style={{height:"50px",width:"40px",color:"white"}} /></Link>

                    <button className='Navbar-button' onClick={handleLogout}>Logout</button>
                </div>


            </div>
        </>
    )
}

export default Navbar