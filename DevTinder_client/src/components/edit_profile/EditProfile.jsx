import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'
import UserCard from '../cards/UserCard'

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [age, setAge] = useState(user?.age || '');
  const [about, setAbout] = useState(user?.about || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSaveProfile = async(e) => {
    e.preventDefault();
    setError('')
    setToastMessage('')
    try {
      const res = await axios.patch(`${BASE_URL}profile/edit`, {
        firstName, lastName, photoUrl, age, gender, about
      }, {withCredentials: true})
      setToastMessage(res.data?.message)
      // navigate('/')
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      dispatch(addUser(res.data?.data))
      
    } catch (error) {
      setError(error.response?.data)
      console.error("error login: ", error);
    }
    
  };

  useEffect(() => {
  if(user) {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setPhotoUrl(user.photoUrl || '');
    setAge(user.age || '');
    setAbout(user.about || '');
    setGender(user.gender || '');
  }
}, [user]);

  return (<>
  <div className='flex justify-center gap-3 my-20'>
    <div className='flex justify-center '>
      <form onSubmit={handleSaveProfile}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">First Name</label>
          <input type="text" value={firstName} className="input" placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />

          <label className="label">Last Name</label>
          <input type="text" value={lastName} className="input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />

          <label className="label">Photo URL</label>
          <input type="text" value={photoUrl} className="input" placeholder="Photo URL" onChange={(e) => setPhotoUrl(e.target.value)} />

          <label className="label">Age</label>
          <input type="text" value={age} className="input" placeholder="age" onChange={(e) => setAge(e.target.value)} />
          <label className="label">About</label>
          <input type="text" value={about} className="input" placeholder="about" onChange={(e) => setAbout(e.target.value)} />
          <label className="label">Gender</label>
          <select value={gender} className="select" onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {error && <p style={{color:'red'}}>{error}</p>}
          <button type="submit" className="btn btn-neutral mt-4">Save Profile</button>
        </fieldset>
      </form>
    </div>
    <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />
    </div>
    {showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>{toastMessage}</span>
  </div>
</div>}
    </>
  )
}

export default EditProfile
