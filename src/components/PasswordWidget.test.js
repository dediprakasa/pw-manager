import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../store/reducers'
import PasswordWidget from './PasswordWidget'
import '@testing-library/jest-dom'

jest.mock('../store/actions/passwordActions')

const history = createMemoryHistory()
const store = createStore(
  reducers,
)

const password = 'dummyPassword1!'

test('renders row display widget', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <PasswordWidget password={password} display="row"/>
      </Router>
    </Provider>
  )

  const lowerCaseContainer = getByTestId('lowercase-container')
  const upperCaseContainer = getByTestId('uppercase-container')
  const specialContainer = getByTestId('special-container')
  const numberContainer = getByTestId('number-container')
  const charsContainer = getByTestId('chars-container')

  expect(lowerCaseContainer).toBeInTheDocument()
  expect(upperCaseContainer).toBeInTheDocument()
  expect(specialContainer).toBeInTheDocument()
  expect(numberContainer).toBeInTheDocument()
  expect(charsContainer).toBeInTheDocument()
  
})