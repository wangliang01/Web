function getType(obj) {
  return Object.prototype.toString.apply(obj).slice(8, -1)
}

function stringify(params) {
  if (!params) return '' 

  const type = getType(params)
  let res = ''
  if (type === 'Object') {
    for (let [key, value] of Object.entries(params)) {
      res += `${key}=${value}&`
    }
  }
  res = res.slice(0, -1)
  return res
}

function parseUrl(url, params) {
  const querystring =  stringify(params)
  if (!querystring) return url
  if (url.includes('?')) {
    return url + querystring
  } 
  return url + '?' + querystring
}

function setHeader(config) {
  for (let [key, value] of Object.entries(config)) {
    xhr.setRequestHeader[key] = value
  }
}
const xhr = new XMLHttpRequest()

const ajax = {
  get(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      const newUrl = parseUrl(url, params)
      setHeader(config)
      xhr.open('GET', newUrl, true)
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          resolve(xhr.responseText)
        }
      }
      xhr.send()
    })
  },
  post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      setHeader(config)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          resolve(xhr.responseText)
        }
      }

      xhr.send(data)
    })
  }
}


ajax.get('http://127.0.0.1:4523/mock/714894/getUserList').then(res => {
  console.log(res)
})

ajax.post('http://127.0.0.1:4523/mock/714894/user/create', {name: 'wangliang', age: 18}, {withCredentials: true}).then(res => {
  console.log(res)
})






