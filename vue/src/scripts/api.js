import Vue from 'vue'
const vm = Vue.prototype
const e = process.env
const api_url = `${e.VUE_APP_API_PROTOCOL}://${e.VUE_APP_API_ROOT}`
const request = (_method, _api, _data) => {
  console.debug(_method, _api, _data)
  return new Promise((resolve, reject) => {
    vm.axios({
      method: _method,
      url: `${api_url}/${_api}`,
      crossDomain: true,
      // headers: { Authorization: `` }, // NO NEEDED FOR NOW, we don't use any auth
      data: _data
    })
      .then(function(response) {
        if (response && response.data) {
          resolve(response.data)
        } else {
          resolve(response)
        }
      })
      .catch(function(error) {
        console.log('ERROR')
        reject(error)
      })
  })
}

export default {
  Request: request
}
