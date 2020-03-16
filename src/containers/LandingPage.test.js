import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import LandingPage from './LandingPage'
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
        <LandingPage />
      </Router>
    </Provider>
  )
  const welcomeText = getByTestId('welcome-text')
  const subtitleText = getByTestId('subtitle-text')
  const tryNowBtn = getByTestId('try-now-btn')
  const imgContainer = getByTestId('img-container')


  expect(welcomeText).toBeInTheDocument()
  expect(subtitleText).toBeInTheDocument()
  expect(tryNowBtn).toBeInTheDocument()
  expect(imgContainer).toContainHTML('img')

})