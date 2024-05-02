import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { getRegisterUsers, setLoggedUser } from '../storageOperation';

function Login() {

  const navigate = useNavigate()

  //Use State
  const [userDetail, setUserDetail] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [registerUsers, setRegisterUsers] = useState([])

  const handleChange = (e) => setUserDetail({ ...userDetail, [e.target.name]: e.target.value })

  //Login User
  const handleLogin = () => {
    if (verifyInput()) {
      let user = verifyUser();
      if (user) {
        setLoggedUser(user)
        setUserDetail({ email: "", password: "" })
        navigate('/')
      }
    }
  }

  //It verify input conditions
  function verifyInput() {
    let verify = false
    if (userDetail.email.length > 0 && userDetail.password.length > 0) {
      // check email is valid gmail or not
      if (!userDetail.email.includes("@gmail.com")) {
        setErrorMessage("Please enter valid email id")
      }
      // check password length
      else if (userDetail.password.length < 4) {
        setErrorMessage("Password should be greater than 4")
      }
      else {
        verify = true
        setErrorMessage("")
      }
    } else {
      setErrorMessage("Please enter details")
    }
    return verify
  }

  // Return register user details if user exist
  function verifyUser() {
    let userReturn = ""
    for (let i = 0; i < registerUsers.length; i++) {
      const user = registerUsers[i]
      if (user.email == userDetail.email) {
        if (user.password != userDetail.password) {
          setErrorMessage("Password is incorrect")
          break
        }
        setErrorMessage("")
        userReturn = user
        break
      }
      else {
        setErrorMessage("Email id not exist")
      }
    }
    return userReturn
  }

  useEffect(() => {
    setRegisterUsers(getRegisterUsers())
  }, [])

  return (
    <>
      <div className='vh-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: "whitesmoke" }}>
        <div className='border shadow' style={{ backgroundColor: "white", borderRadius: "20px", padding: "50px 100px", width: "950px" }}>
          <div className='d-flex justify-content-between gap-5'>
            {/* Image container */}
            <div className='d-flex flex-column justify-content-center'>
              <img src="./assets/signin.jpg" alt="" className='' /> <br />
              <Link className='text-center mt-5 fs-6  text-body' to="/signup" >Create an account</Link>
            </div>
            {/* Login container */}
            <div className='w-50'>
              <h1 className='text-bold mb-5 text-center'>Sign In</h1>
              {errorMessage.length > 0 && <h3 className='text-center text-danger'>{errorMessage}</h3>}
              {/* Email Input */}
              <div className="Form-input">
                <EmailIcon className='Form-icon' />
                <input type="email" className='' placeholder='Your Email id' name='email' onChange={handleChange} value={userDetail.email} />
              </div>
              {/* Password Input */}
              <div className="Form-input">
                <LockIcon className='Form-icon' />
                <input type="password" className='' placeholder='Your Password' name='password' onChange={handleChange} value={userDetail.password} />
              </div>
              {/* Register button */}
              <div className="">
                <button type="" className="Form-button" onClick={handleLogin}>Login</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login