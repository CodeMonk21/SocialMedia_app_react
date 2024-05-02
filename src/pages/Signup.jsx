import React, { useEffect, useState } from 'react'
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
      if(message.length==0){
        setErrorMessage("")
        setUserData({ name: "", email: "", password: "", confirmPassword: "", terms: false })
        setRegisterUsers(previousUsers.concat(userData))
        navigate("/login")
      }else{
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
      <div >
        <div className='border w-50 m-auto shadow my-5'>
          <h1 className='text-center mb-4 bg-warning p-3 text-white'>SignUp</h1>
          {errorMessage.length > 0 && <h3 className='text-center text-danger'>{errorMessage}</h3>}
          <div className='px-5 py-3'>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label fs-5">Name</label>
              <input type="text" className="form-control" id="nameInput" name='name' onChange={handleInput} value={userData.name} />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label fs-5">Email address</label>
              <input type="email" className="form-control" id="emailInput" name='email' onChange={handleInput} value={userData.email} />
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label fs-5">Password</label>
              <input type="password" className="form-control" id="passwordInput" name='password' onChange={handleInput} value={userData.password} />
            </div>
            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPasswordInput" className="form-label fs-5">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPasswordInput" name='confirmPassword' onChange={handleInput} value={userData.confirmPassword} />
            </div>
            {/* Terms and conditions */}
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input fs-5" id="exampleCheck1" name='terms' onChange={handleInput} />
              <label className="form-check-label fs-5" htmlFor="exampleCheck1">Agree to Terms and Conditions?</label>
            </div>
            {/* SignUp button */}
            <button type="submit" className="btn btn-primary w-50 d-block m-auto" onClick={handleSignup}>Sign Up</button>
            <div>
              <p className='my-3 text-primary fs-5 text-center'>Already have an Account:- <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup