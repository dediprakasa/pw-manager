import React, { useEffect } from 'react'
import PasswordForm from '../components/PasswordForm'
import PasswordList from '../components/PasswordList'
import { fetchPasswords } from '../store/actions/passwordActions'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
  const userId = useSelector(state => state.user.userId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (userId) {
      dispatch(fetchPasswords())
    }
  }, [userId])
  return (
    <div className="mt-24 container mx-auto mb-8">
      <PasswordForm />
      <PasswordList />
    </div>
  )
}

export default Home