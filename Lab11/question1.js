const dns = require('dns');
dns.resolve4('miu.edu', (err, address) => console.log('address: %j', address));