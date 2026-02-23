import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [emailId, setEmailId] = useState('priya.reddy22@example.com')
  const [password, setPassword] = useState('Priya@456')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async() => {
    const res = await axios.post("http://localhost:8000/login", {
      emailId, password 
    }, {withCredentials: true})
    console.log(res) 
    navigate('/')
    dispatch(addUser(res.data))
  }

  console.log(emailId, password)
  return (
    <div className='flex justify-center my-20'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmailId(e.target.value)} />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login
