import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom'
import { getRegisterUsers, setRegisterUsers } from '../storageOperation'

function Signup() {
  const navigate = useNavigate()
  //Use states
  const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", terms: false })
  const [previousUsers, setPreviousUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  //Handle Input data
  const handleInput = (e) => {
    if (e.target.name == "terms") {
      setUserData({ ...userData, [e.target.name]: e.target.checked })
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value })
    }
  }
  // Handle Signup button
  const handleSignup = () => {
    if (verifyInput()) {
      let message = verifyUser()
      if (message.length == 0) {
        setErrorMessage("")
        setUserData({ name: "", email: "", password: "", confirmPassword: "", terms: false })
        setRegisterUsers(previousUsers.concat(userData))
        navigate("/login")
      } else {
        setErrorMessage(message)
      }
    }
  }

  // It verify user is valid or not
  function verifyUser() {
    let message = ""
    for (let i = 0; i < previousUsers.length; i++) {
      const user = previousUsers[i]
      if (user.email == userData.email) {
        message = "Email already exist"
        break
      }
      else if (user.name == userData.name) {
        message = "UserName already exist"
        break
      }
    }
    return message
  }

  //It verify input conditions
  function verifyInput() {
    let verify = false
    if (userData.name.length > 0 && userData.email.length > 0 && userData.password.length > 0 && userData.confirmPassword.length > 0) {
      // check password and confirm password
      if (userData.password != userData.confirmPassword) {
        setErrorMessage("Password don't match")
      }
      // check email is valid gmail or not
      else if (!userData.email.includes("@gmail.com")) {
        setErrorMessage("Please enter valid email id")
      }
      // check terms and conditions
      else if (userData.terms == false) {
        setErrorMessage("Please agree to terms & conditions")
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

  useEffect(() => {
    if (getRegisterUsers()) {
      setPreviousUsers(getRegisterUsers())
    } else {
      setRegisterUsers([])
    }
  }, [])

  return (
    <>
      <div className='vh-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: "whitesmoke" }}>
        <div className='border shadow' style={{ backgroundColor: "white", borderRadius: "20px", padding: "50px 100px", width: "950px" }}>
          <div className='d-flex justify-content-between gap-5'>
            {/* Signup container */}
            <div className='w-50'>
              <h1 className='text-bold mb-5 text-center'>SignUp</h1>
              {errorMessage.length > 0 && <h3 className='text-center text-danger'>{errorMessage}</h3>}
              {/* UserName Input */}
              <div className="Form-input">
                <PersonIcon className='Form-icon' />
                <input type="text" className='' placeholder='Your Username' name='name' onChange={handleInput} value={userData.name}/>
              </div>
              {/* Email Input */}
              <div className="Form-input">
                <EmailIcon className='Form-icon' />
                <input type="email" className='' placeholder='Your Email id' name='email' onChange={handleInput} value={userData.email} />
              </div>
              {/* Password Input */}
              <div className="Form-input">
                <LockIcon className='Form-icon' />
                <input type="password" className='' placeholder='Your Password' name='password' onChange={handleInput} value={userData.password} />
              </div>
              {/* Confirm Password Input */}
              <div className="Form-input">
                <LockOutlinedIcon className='Form-icon' />
                <input type="password" className='' placeholder='Repete Your Password' name='confirmPassword' onChange={handleInput} value={userData.confirmPassword} />
              </div>
              {/* Terms and conditions */}
              <div className="d-flex gap-2 align-items-center">
                <input type="checkbox" id='checkbox' className='' style={{ height: "15px", width: "20px" }} name='terms' onChange={handleInput} />
                <label htmlFor="checkbox" className='text-body cursor-pointer'>I agree all statements in <a href="" className='text-body'>Terms of service</a></label>
              </div>
              {/* Register button */}
              <div className="">
                <button type="" className="Form-button" onClick={handleSignup}>Register</button>
              </div>
            </div>
            {/* Image container */}
            <div className='d-flex flex-column justify-content-center'>
              <img src="./assets/signup.jpg" alt="" className='' /> <br />
              <Link className='text-center mt-5 fs-6  text-body' to="/login" >I am already a member</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup