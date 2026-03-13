import React from 'react'

const UesrCard = ({user}) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  console.log('user>>>', firstName, lastName, photoUrl, age, gender, about)
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="Profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <p>{gender} {age}</p>
          <p>{about} </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UesrCard
