import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Head from './head'

const Profile = () => {
  const { user } = useParams()
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <div className="flex justify-center border rounded font-semibold m-2 p-2" id="title">
            Profile
          </div>
          <div>
            <Link className="flex justify-center border rounded font-semibold m-2 p-2" to="/dashboard/main">Go To Main</Link>
          </div>
          <div>
            <Link className="flex justify-center border rounded font-semibold m-2 p-2" to="/dashboard">Go To Root</Link>
          </div>
          <div id="username">
            {user}
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
