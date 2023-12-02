/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import qs from 'qs'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {},
    userLoggedIn: false,
    consultants: [],
    consultantInfo: {},
    fields: []
  },
  getters: {
    userInfo: state => {
      const userInfoStorage = localStorage.getItem('userInfo')
      return state.userInfo.id ? state.userInfo : JSON.parse(userInfoStorage) || {}
    },
    consultants: state => state.consultants,
    consultantInfo: state => state.consultantInfo,
    fields: state => state.fields,
    consultantById: (state) => (id) => {
      return state.consultants.find(consultant => consultant.id === id)
    }
  },
  mutations: {
    SET_BEARER(state, accessToken) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
    },
    UPDATE_UESR_INFO(state, userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
    LOGIN_USER(state) {
      state.userLoggedIn = true
      localStorage.setItem('userLoggedIn', 'yes')
    },
    LOGOUT_USER(state) {
      state.userLoggedIn = false
      localStorage.removeItem('userLoggedIn')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userInfo')
    },
    SET_CONSULTANTS(state, payload) {
      state.consultants = payload
    },
    SET_CONSULTANTS_INFO(state, payload) {
      state.consultantInfo = payload
    },
    SET_FEILDS(state, payload) {
      state.fields = payload
    },
  },
  actions: {
    fetchAccessToken({ commit }, { refreshToken }) {
      return new Promise((resolve, reject) => {
        axios.post(`/api/auth/user/token`, { refreshToken }).then(response => {
          resolve(response.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // getConsultants({ commit }, { params }) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`/api/consultant`, {
    //             params
    //         }).then(response => {
    //             response.data.totalItems = parseInt(response.headers['x-total-count'])
    //             resolve(response.data)
    //             console.log('ss', response.data);
    //         }).catch(err => {
    //             reject(err)
    //         })
    //     })
    // },
    getConsultantProfile({ commit }, { id, payload }) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/consultant/${id}`, payload).then(response => {
          response.data.totalItems = parseInt(response.headers['x-total-count'])
          console.log('profile', response.data.updateResult);
          resolve(response.data.updateResult)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateField({ commit }, { id, payload }) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/field/${id}`, payload).then(response => {
          console.log('updaye', response.data.field);
          resolve(response.data.field)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteField({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/field/${id}`,).then(response => {
          resolve(response.data)
          console.log('delet', response.data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    async uploadFile({ commit }, { filename, formData }) {
      return new Promise((resolve, reject) => {
        try {
          // const uploadUrl = axios.post(`/api/upload/url`, { filename })
          const response = axios
            .post('/api/upload', formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
          resolve(response.data.filename)
          console.log('response', response);
        } catch (error) {
          reject(error)
        }
      })
    },

    // getFileUrl({ commit }, fileId) {
    //   return new Promise((resolve, reject) => {
    //     axios.get(`/api/upload/file/${fileId}`).then(response => {
    //       console.log('file', response.data.url);
    //       resolve(response.data.url)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // getConsultations({ commit }, { size, page }) {
    //   return new Promise((resolve, reject) => {
    //     axios.get(`/api/consultation?size=${size}&page=${page}`).then(response => {
    //       response.data.totalItems = parseInt(response.headers['x-total-count'])
    //       resolve(response.data)
    //       console.log('Consultations', response.data);
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // website ui
    checkUserExistance({ commit }, payload) {
      return axios.get('/api/auth/user/existence', {
        params: payload
      })
    },
    register({ commit }, payload) {
      return axios.post('/api/auth/user/register', payload);
    },
    login({ commit }, payload) {
      return axios.post('/api/auth/user/login', payload);
    },
    verifyCode({ commit }, payload) {
      return axios.post('/api/auth/user/verify', payload);
    },
    getConsultants({ commit }, payload) {
      return axios.get('/api/consultant', {
        params: payload,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
    },
    getConsultations({ commit }, payload) {
      return axios.get('/api/consultation', {
        params: payload,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
    },
    getUserConsultations({ commit }, payload) {
      return axios.get('/api/user/consultations', {
        params: payload,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
    },
    requestConsultation({ commit }, payload) {
      return axios.post('/api/user/consultation/request', payload);
    },
    reserveConsultation({ commit }, { consultationId, selectedRecommendedTimes }) {
      return axios.put(`/api/consultation/reserve-consultation/${consultationId}`, { selectedRecommendedTimes });
    },
    getConsultantById({ commit }, { consultantId }) {
      return axios.get(`/api/consultant/${consultantId}`)
    },
    getConsultationById({ commit }, id) {
      return axios.get(`/api/user/consultation/${id}`)
    },
    getFields() {
      return axios.get('/api/field')
    },
  }
})