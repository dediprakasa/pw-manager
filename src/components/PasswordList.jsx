import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PasswordRow from './PasswordRow'

function PasswordList() {
  const passwords = useSelector(state => state.password)
  const [search, setSearch] = useState('')
  function handleSearchChange(e) {
    setSearch(e.target.value)
  }
  return (
    <>
    <div
      data-testid="password-list"
      className="w-full text-left bg-white shadow-lg rounded px-8 pt-6 pb-8 border border-green-200">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold text-green-500">
          Password List
        </h3>
        <form>
        <input
          data-testid="search-form"
          value={search}
          onChange={handleSearchChange}
          className="shadow max-w-20 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search by URL" />
        </form>
      </div>
      <div className="flex w-full py-2">
        <div
          data-testid="url-head"
          className="w-1/6 px-4 ">
          Website URL
        </div>
        <div
          data-testid="username-head"
          className="w-1/6 px-4 ">
          Username
        </div>
        <div
          data-testid="password-head"
          className="w-1/6 px-4 ">
          Password
        </div>
        <div
          data-testid="createdAt-head"
          className="w-1/6 px-4 ">
          Created At
        </div>
        <div
          data-testid="updatedAt-head"
          className="w-1/6 px-4 ">
          Updated At
        </div>
        <div
          data-testid="actions-head"
          className="w-1/6 px-4 ">
        </div>
      </div>

      {
        search
        ? passwords.filter(password => {
          return password.url.includes(search)
        }).map(password => {
          return <PasswordRow payload={password} key={password.id} />
        })
        : passwords.map(password => {
          return <PasswordRow payload={password} key={password.id} />
        })
      }
    </div>
    </>
  )
}

export default PasswordList