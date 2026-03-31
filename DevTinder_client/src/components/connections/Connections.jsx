import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../../utils/connectionSlice'
import { Link } from 'react-router-dom'

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
        const {_id, firstName, lastName, photoUrl, age, gender, about} = connection
      return(
        <div className='flex items-center justify-between gap-4 p-4 m-4 bg-base-200 rounded-lg shadow-md w-1/2 mx-auto'
        key={connection._id}>
          <div className='flex items-center justify-between gap-4 p-4 m-4 '>
            <img src={photoUrl} alt="user" className='w-16 h-16 rounded-full object-cover' />
            <div className='flex flex-col'>
              <h2 className='text-lg font-bold'>{firstName} {lastName}</h2>
              <p className='text-sm text-left'>{age && age + ", "}{gender}</p>
              <p className='text-sm text-left'>{about}</p>
            </div>
          </div>
          <Link to={'/chat/'+_id}>
            <button className="btn bg-[#03C755] text-white border-[#00b544] whitespace-nowrap">
              <svg aria-label="Kakao logo" width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"></path></svg>
              Chat with {firstName}
            </button>
          </Link>
        </div>
      )
      })}
    </div>
  )
}

export default Connections
