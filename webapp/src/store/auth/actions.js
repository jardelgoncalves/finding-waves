import request from '../../services/request';
import { setUser, removeUserAndToken, setToken } from '../../utils/auth';
import router from '../../router'

export async function reset({ commit }) {
  commit('setLoading', false)
  commit('setUser', {})
  removeUserAndToken();
}

export async function fetchUser({ commit }) {
  try {
    const response = await request.get(`users/me`)
    const { data } = response
    commit('setUser', data)
    setUser(data)

  } catch (error) {
    commit('setUser', {})
    removeUserAndToken();
    router.push({ path:"/login" })
  }
}

export async function login({ commit, dispatch }, payload) {
  try {
    commit('setLoading', true)
    const { email, password } = payload
    const { data } = await request.post('/users/authenticate', { email, password })
    setToken(data.token);
    dispatch('fetchUser')
    return;
  } catch (error) {
    return error
  } finally {
    commit('setLoading', false)
  }
}

export async function userLogout({ dispatch }) {
  await dispatch('reset')
}

