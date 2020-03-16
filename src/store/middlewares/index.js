export const thunk = store => next => action => {
  console.log(typeof action, '**')
  typeof action === 'function'
    ? action(store.dispatch)
    : next(action)
}