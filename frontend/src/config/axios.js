import axios from 'axios'

const success = res => res
const error = err => {
    if (401 === err.response.status) {
        // window.location = '/auth'
       //aqui seria no momento que o token expirasse iria para a página inicial
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)