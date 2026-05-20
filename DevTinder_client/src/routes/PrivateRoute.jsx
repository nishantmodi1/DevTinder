import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if(!user){
    // Redirect to login, preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  // Render nested <Route> children directly, or an explicit child prop
  return children ?? null
}

export default PrivateRoute
