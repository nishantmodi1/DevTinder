import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../../utils/connectionSlice'

const Connections = () => {
  const connection = useSelector(store=> store.connection)
  const dispatch = useDispatch()
  const fetchUserConnection = async() => {
    try {
      const res= await axios.get(`${BASE_URL}user/connections`, {withCredentials:true})
      console.log(res.data?.data)
      dispatch(addConnection(res.data?.data))
    } catch (error) {
      console.error('error', error)
    }
  }
  console.log('connection>>>', connection)
  useEffect(() => {
    fetchUserConnection()
  }, [])

  if(!connection) return;
  if(connection.length === 0) return <div>No Connections Found</div>

  return (
    <div className='text-center my-10 '>
      <h1 className='text-xl'>Connections</h1>
      {connection.map((connection) => {
        const {firstName, lastName, photoUrl, age, gender, about} = connection
      return(
        <div className='flex items-center gap-4 p-4 m-4 bg-base-200 rounded-lg shadow-md w-1/2 mx-auto'
        key={connection._id}>
          <img src={photoUrl} alt="user" className='w-16 h-16 rounded-full object-cover' />
          <div className='flex flex-col'>
            <h2 className='text-lg font-bold'>{firstName} {lastName}</h2>
            <p className='text-sm text-left'>{age && age + ", "}{gender}</p>
            <p className='text-sm text-left'>{about}</p>
          </div>
        </div>
      )
      })}
        
    </div>
  )
}

export default Connections
