import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Home from './Home'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../store/reducers'

const history = createMemoryHistory()
const store = createStore(
  reducers,
)

test('render Home', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Home />
      </Router>
    </Provider>
  )
  const passwordForm = getByTestId('password-form-container')
  const passwordList = getByTestId('password-list')

  expect(passwordForm).toBeInTheDocument()
  expect(passwordList).toBeInTheDocument()
})