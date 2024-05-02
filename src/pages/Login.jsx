import React from 'react'

function Login() {
  return (
    <>
      <div className='vh-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: "whitesmoke" }}>
        <div className='w-50 border shadow p-5' style={{ backgroundColor: "white", borderRadius: "20px" }}>
          <div className='d-flex justify-content-between'>
            {/* Signup container */}
            <div className='border w-50'>
              <h1 className='text-bold mb-5'>SignUp</h1>
              {/* UserName Input */}
              <div className="mb-3">
                <input type="text" className='Form-input' placeholder='UserName'  />
              </div>
            </div>
            {/* Image container */}
            <div>
              <img src="./assets/signup.jpg" alt="" />
            </div>
          </div>
          {/* <button type="" class="btn btn-primary">Submit</button> */}
        </div>
      </div>
    </>
  )
}

export default Login