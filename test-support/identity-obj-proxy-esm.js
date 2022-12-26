// see: https://github.com/keyz/identity-obj-proxy/issues/8#issuecomment-430241345

module.exports = new Proxy(
  {},
  {
    get: function getter(_target, key) {
      if (key === '__esModule') {
        // True instead of false to pretend we're an ES module.
        return true
      }
      return key
    },
  }
)
