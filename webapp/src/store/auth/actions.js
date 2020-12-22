import request from '../../services/request';
import { setUser, removeUserAndToken, setToken } from '../../utils/auth';
import notify from '../../utils/notify';
import router from '../../router'

export async function reset({ commit }) {
  commit('setLoading', false)
  commit('setUser', {})
  removeUserAndToken();
}

export async function fetchUser({ commit }) {
  try {
    const { data } = await request.get(`users/me`)
    commit('setUser', data.user)
    setUser(data.user)

  } catch (error) {
    commit('setUser', {})
    removeUserAndToken();
  }
}

export async function login({ commit, dispatch }, payload) {
  try {
    commit('setLoading', true)
    const { email, password } = payload
    const { data } = await request.post('/users/authenticate', { email, password })
    setToken(data.token);

    notify({
      type: 'success',
      title: 'Authentication',
      text: 'Login successfully'
    })

    dispatch('fetchUser')

    router.push({ path: '/' })
    return;
  } catch (error) {
    if(error.response) {
      notify({
        type: 'error',
        title: 'Authentication Error',
        text: error.response.data.message
      })
      return
    }

    return error;
  } finally {
    commit('setLoading', false)
  }
}

export async function register({ commit }, payload) {
  try {
    commit('setLoading', true)
    const { name, email, password } = payload
    await request.post('/users', { name, email, password })

    notify({
      type: 'success',
      title: 'User registration',
      text: 'Your registration was successful'
    })

    router.push({ path: '/login' })
    return;
  } catch (error) {
    if(error.response) {
      notify({
        type: 'error',
        title: 'User registration Error',
        text: error.response.data.message
      })
      return
    }

    return error;
  } finally {
    commit('setLoading', false)
  }
}

export async function logout({ dispatch }) {
  await dispatch('reset')
  router.push({ path: '/login' })
}

