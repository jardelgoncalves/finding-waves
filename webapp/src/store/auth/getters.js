export function isLoading(state) {
  return state.loading
}

export function isLoggedIn(state) {
  return !!Object.keys(state.user || {}).length
}

export function user(state) {
  return state.user || {}
}
