import React from 'react'

const UserCard = ({user}) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
