# AuthJet
Dead simple SMS user verification. For more details and to sign up, go to [AuthJet.com](https://authjet.com).

## Installation
```bash
npm install --save authjet
```

## API
```javascript
const AuthJet = require('authjet');
const authjet = AuthJet('USERNAME', 'PASSWORD');

// check if login credentials are valid
authjet.checkAuth()
	.then(({authenticated}) => {
		// your logic here
	});

// get the balance of your account
authjet.balance()
	.then(({messagesPaid, messagesSent, messagesAvail}) => {
		// your logic here
	});


const recipient = '19498675309'; // 10 digit phone number with preceeding "1"
const appId = 'aHc9s'; // unique ID found in your account

// send code to recipient (https://authjet.com/docs/send)
authjet.send(appId, recipient)
	.then(({code, expires}) => {
		// your logic here
	});

// validate challenge code (https://authjet.com/docs/validate)
const challenge = '8865';
authjet.validate(recipient, challenge)
	.then(({valid, reason}) => {
		//your logic here
	});
```