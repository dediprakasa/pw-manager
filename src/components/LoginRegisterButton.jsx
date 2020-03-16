import React from 'react'
import { ClipLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

function LoginRegisterButton(props) {
  const isLoading = useSelector(state => state.app.isLoading)
  return (
    <button
      data-testid="login-register-button"
      onClick={props.onClick}
      className="w-full mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center" type="button">
      {
        isLoading
        ? (
          <div className="flex justify-center">
            <ClipLoader
              size={20}
              color={"#fff"}
              loading={isLoading}
            />
          </div>
        )
        : props.type
      }
    </button>
  )
}

export default LoginRegisterButton