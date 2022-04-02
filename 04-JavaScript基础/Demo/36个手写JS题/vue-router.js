class VueRouter {
  constructor(options) {
    this.options = options 

    this.mode = options.mode || 'hash'

    switch(this.mode) {
      case 'hash':
        this.history = new HashHistory(this) 
        break
      case 'history':
        break
      case 'abstract':
        break
    }
  }
  init(app) {

  }
}

class HashHistory {
  constructor(router) {
    this.router = router 

    ensureSlash()

    this.setupHashLister()
  }
  setupHashLister() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }

  transitionTo(location) {
    console.log(location);
  }
}

function ensureSlash() {
  if (window.location.hash) {
    return 
  }
  window.location.hash = '/'
}

function createRoute(record, location) {
  const res = []
  if (record) {
    while(record) {
      res.unshift(record)
      record = record.parent
    }
  }

  return {
    ...location,
    matched: res
  }
}