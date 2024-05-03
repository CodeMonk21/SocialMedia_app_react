import React from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom';
import { removeLoggedUser } from '../storageOperation';

function Home({ setUpdate }) {
  const navigate = useNavigate()

  // Handle Logout 
  const handleLogout = () => {
    removeLoggedUser()
    setUpdate(0)
    navigate("/login")
  }

  return (
    <>
      <Navbar handleLogout={handleLogout} />
    </>
  )
}

export default Home