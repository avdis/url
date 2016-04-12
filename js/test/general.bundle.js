var url = require('../../index');
var config = {
  protocol: 'http://',
  base: '192.168.2.231/codex/',
  path: 'foo/bar/',
  routes: {
    home: '',
    product: 'product/:sku/'
  }
};

url.setup(config);

console.assert(url.getBase() == (config.protocol + config.base), 'testGetBase');
console.assert(url.getBase('append/') == (config.protocol + config.base) + 'append/', 'testGetBaseAppend');
console.assert(url.generate() == (config.protocol + config.base), 'testGenerateHome');
console.assert(url.generate('product', {sku: 'foo-bar'}) == (config.protocol + config.base + 'product/foo-bar/'), 'testGenerateProduct');
console.log('all tests ran');
