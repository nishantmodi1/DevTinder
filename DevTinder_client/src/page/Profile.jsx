import React from 'react'
import EditProfile from '../components/edit_profile/EditProfile'
import { useSelector } from 'react-redux'
import { store } from '../utils/appStore'

const Profile = () => {
  const user = useSelector((store) => store.user)

  return (
    <div>
      {user && 
      <EditProfile user={user} />}
    </div>
  )
}

export default Profile
