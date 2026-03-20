import React, { useEffect } from 'react'
import Header from '../header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../utils/userSlice'
import { BASE_URL } from '../../utils/constants'
import axios from 'axios'

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)
  const fetcUser = async() => {
    // if(!userData) return;
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {withCredentials:true})

      dispatch(addUser(user.data))
    } catch (error) {
      if(error.status === 401){
        navigate('/login')
      }
      console.error("error logout", error.status)
    }
  }

  useEffect(() => {
    if(!userData){
      fetcUser()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
