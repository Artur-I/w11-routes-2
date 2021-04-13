import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Main = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <div className="flex justify-center border rounded font-semibold m-2 p-2" id="title">
            Main
          </div>
          <div>
            <Link className="flex justify-center border rounded font-semibold m-2 p-2" to="/dashboard/profile/df592f80-bfe9-11e9-9a23-1914400a8e72">Go To Profile</Link>
          </div>
          <div>
            <Link className="flex justify-center border rounded font-semibold m-2 p-2" to="/dashboard">Go To Root</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
