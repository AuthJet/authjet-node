const https = require('https');
const url = require('url');
const bluebird = require('bluebird');

function API(username, password){
	if (!(this instanceof API)){
		return new API(username, password);
	}
	this.baseUrl = `https://${username}:${password}@authjet.com`;

	this.checkAuth()
		.then(({authenticated}) => {
			if (!authenticated){
				console.log(`${username} is NOT properly authenticated to AuthJet\nPlease check your username and password.`);
			}
		})
		.error(err => console.log('Error authenticating to AuthJet\n', err));
}

const request = (href, cb) => {
	let out = '';
	const req = https.get(url.parse(href), res => {
		res.on('data', data => out += data);
	});
	req.on('close', () => {
		try {
			return cb(null, JSON.parse(out));
		} catch (e){
			return cb(null, out);
		}
	});
	req.on('error', cb);
};

API.prototype.send = bluebird.promisify(function(appId, recipient, cb){
	const sendUrl = `${this.baseUrl}/api/send?appId=${appId}&recipient=${recipient}`;
	return request(sendUrl, cb);
});

API.prototype.validate = bluebird.promisify(function(recipient, code, cb){
	const sendUrl = `${this.baseUrl}/api/validate?code=${code}&recipient=${recipient}`;
	return request(sendUrl, cb);
});

API.prototype.checkAuth = bluebird.promisify(function(cb){
	const sendUrl = `${this.baseUrl}/api/check-auth`;
	return request(sendUrl, cb);
});

API.prototype.balance = bluebird.promisify(function(cb){
	const sendUrl = `${this.baseUrl}/api/balance`;
	return request(sendUrl, cb);
});

module.exports = API;