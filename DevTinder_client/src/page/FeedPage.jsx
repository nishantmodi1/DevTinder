import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import UesrCard from '../components/cards/UserCard'

const FeedPage = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)
  const getFeed = async() => {
    if(feed && feed.length > 0) return;
    try {
      const res = await axios.get(`${BASE_URL}user/feed`, {withCredentials: true})
      dispatch(addFeed(res.data.data))
    } catch (error) {
      console.error("error fetching feed data", error)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if(!feed || feed.length === 0) return <div>No more users found</div>
  
  return (
    <div className='flex justify-center my-10 gap-4'>
      <UesrCard user={feed[0]} />
    </div>
  )
}

export default FeedPage
