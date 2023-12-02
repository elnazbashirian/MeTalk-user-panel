import axios from '../axios'
import store from '../store'
import router from '../router.js'
// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter(callback => callback(accessToken))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

export default {
    init() {
        const logout = this.logout
        axios.interceptors.response.use(function(response) {
            return response
        }, async function(error) {
            const { config, response } = error
            const originalRequest = config
 
            if (response && response.status === 401) {
                if (!isAlreadyFetchingAccessToken) {
                    isAlreadyFetchingAccessToken = true
                    store.dispatch('fetchAccessToken', { refreshToken: localStorage.getItem('refreshToken') }).then(response => {
                        isAlreadyFetchingAccessToken = false
                        onAccessTokenFetched(response.accessToken)
                        localStorage.setItem('refreshToken', response.refreshToken)
                    }).catch(() => {
                        isAlreadyFetchingAccessToken = false
                        logout()
                    })
                }
                const retryOriginalRequest = new Promise((resolve) => {
                    addSubscriber(accessToken => {
                        axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
                        resolve(axios(originalRequest))
                    })
                })
                return retryOriginalRequest
            }
            return Promise.reject(error)
        })
    },
    logout() {
        store.commit('LOGOUT_USER')
        const currentPath = location.pathname
        router.push({ path: '/login', query: { to: currentPath } })
    }
}