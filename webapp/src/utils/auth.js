import { TOKEN, USER } from './constants'

export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null
export const getToken = () => localStorage.getItem(TOKEN)
export const getUser = () => localStorage.getItem(USER)

export const setUser = (user) => {
  localStorage.setItem(USER, JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email
  }))
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token)
}

export const removeUserAndToken = () => {
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER)
}
