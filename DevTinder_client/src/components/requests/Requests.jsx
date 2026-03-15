import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../utils/constants'
import axios from 'axios'
import { addRequest, removeRequest } from '../../utils/requestSlice'

const Requests = () => {
  const requests = useSelector(store=> store.request)
  const dispatch =useDispatch()
  

  const handleReviewRequests = async(status, requestId) => {
    try {
      const res = await axios.post(`${BASE_URL}request/review/${status}/${requestId}`, {}, {withCredentials:true})
      dispatch(removeRequest(requestId))
      console.log(res.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  const fetchRequests = async() => {
    try {
      const res= await axios.get(`${BASE_URL}user/requests/received`, {withCredentials:true})
      dispatch(addRequest(res.data?.data))
      console.log(res.data?.data)
    } catch (error) {
      console.error('error', error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])
  console.log('requests>>>', requests)
  if(!requests) return;
  if(requests.length === 0) return <div className='flex justify-center items-center my-20'>No Requests Found</div>

  return (
    <div className='text-center my-10 '>
      <h1 className='text-xl'>Requests</h1>
      {requests.map((request) => {
        const {firstName, lastName, photoUrl, age, gender, about} = request?.fromUserId
      return(
        <div className='flex items-center gap-4 p-4 m-4 bg-base-200 rounded-lg shadow-md w-1/1 mx-6'
        key={request._id}>
          <img src={photoUrl} alt="user" className='w-16 h-16 rounded-full object-cover' />
          <div className='flex flex-col'>
            <h2 className='text-lg font-bold text-start'>{firstName} {lastName}</h2>
            <p className='text-sm text-left'>{age && age + ", "}{gender}</p>
            <p className='text-sm text-left'>{about}</p>
          </div>
          <div className='flex gap-2 justify-end ml-auto'>
            <button onClick ={() => handleReviewRequests('accepted', request._id)} className="btn btn-secondary">Accept</button>
            <button onClick ={() =>handleReviewRequests('rejected', request._id)} className="btn btn-primary">Reject</button>
          </div>
        </div>
      )
      
      })}
      
    </div>
  )
}

export default Requests
