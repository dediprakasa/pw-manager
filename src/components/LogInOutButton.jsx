import React from 'react'

function LogInOutButton(props) {
  return (
    <div className="mr-2 min-w-20 w-20 flex h-10 mt-1 rounded text-center">
      <button
        onClick={props.onClick}
        className="p-1 text-sm w-full rounded font-bold hover:text-green-500 text-center hover:bg-white bg-green-500 border border-green-500 text-white">
        {props.text}
      </button>
    </div>
  )
}

export default LogInOutButton