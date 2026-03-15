import React from 'react'
import { removeUserFromFeed } from '../../utils/feedSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async(status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}request/send/${status}/${userId}`, {}, {withCredentials:true})
      console.log(res.data)
      dispatch(removeUserFromFeed(userId))
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          {photoUrl &&<img
            src={photoUrl}
            alt="Profile" />}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <p>{gender} {age}</p>
          <p>{about} </p>
          <div className="card-actions justify-center">
            <button onClick={() => handleSendRequest('ignored', _id)} className="btn btn-primary">Ignore</button>
            <button onClick={() => handleSendRequest('interested', _id)} className="btn btn-secondary">interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
