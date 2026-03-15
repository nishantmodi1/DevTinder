import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async() => {
    try {
      if(isLogin){
        const res = await axios.post("http://localhost:8000/login", {
          emailId, password 
        }, {withCredentials: true})
        navigate('/feed')
        dispatch(addUser(res.data))
      }else{
        const res = await axios.post("http://localhost:8000/signup", {
          firstName, lastName, emailId, password 
        }, {withCredentials: true})
        navigate('/profile')
        dispatch(addUser(res.data))
        setIsLogin(true)
      }
    } catch (error) {
      setError("Invalid credentials")
      console.error("error: ", error);
    }
  }

  return (
    <div className='flex justify-center my-20'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">{isLogin ? 'Login' : 'signup'}</legend>

        {!isLogin && <><label className="label">First Name</label>
        <input type="text" className="input" placeholder="firstName" onChange={(e) => setFirstName(e.target.value)} />
        <label className="label">Last Name</label>
        <input type="text" className="input" placeholder="lastName" onChange={(e) => setLastName(e.target.value)} /></>}
        
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmailId(e.target.value)} />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{color:'red'}}>{error}</p>}
        <p className='mt-1'>{isLogin ? <span>New User? <button className="text-primary cursor-pointer" onClick={() => setIsLogin(false)}>Signup</button></span> : <span>already a user? <button className="text-primary cursor-pointer" onClick={() => setIsLogin(true)}>Login</button></span>}</p>
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>{isLogin?'Login':'Signup'}</button>
      </fieldset>
    </div>
  )
}

export default Login
