# rackcat

[![Join the chat at https://gitter.im/mikedevita/rackcat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mikedevita/rackcat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

a node/[Sails](http://sailsjs.org) powered Data Center asset tracking application that exposes a full REST API, comes with a responsive mobile friendly web interface.

This is definitely a work in progress.

## Database
The repo is setup to use MySQL as the database via the `sails-mysql` adapter. Mongodb, postgres, and other db's should work fine but they haven't been tested yet.

To read more about sails adapters, check out the documentation [here](http://sailsjs.org/#!/documentation/concepts/extending-sails/Adapters/adapterList.html)


## Installation
Until the front-end is compiled into `dist/` you need to follow the Development Installation guide unfortunately. Once the front end is a bit more stable i'll add
in steps to install without all the development dependency bloat.

## Development Installation

```shell
npm install -g bower grunt-cli sails mocha;
git clone https://github.com/mikedevita/rackcat;
cd rackcat && npm install && cd assets && bower install;
```

edit `config/local.example.js` and rename it to `config/local.js`

visit `http://localhost:1337` and start hacking away.

To run tests, run `npm test` or `mocha -R spec -b --recursive --timeout 5000` from the rackcat folder.


## Authentication Methods
Authentication is handled with a mix between client side and server side. Client-side has all the forms and view logic for authentication (login forms, registration, authorizations). Server side has protection built onto the routes `config/policies.js` as well as an api endpoint for logging in, and registering.

### Registration
To register a username..   

```
'POST /api/auth/register'
```
with the following json request payload, you can see that controller over [here](https://github.com/mikedevita/rackcat/blob/master/api/controllers/AuthController.js#L40)

```json
{
  "username"        : "",
  "email"           : "",
  "firstName"       : "",
  "lastName"        : "",
  "password"        : "",
  "confirmPassword" : ""
}
```

### Login
Login expects a `username` and `password`, and returns the `user` object, and a [JWT]() token that is used to continue making API calls.

```
'POST /api/auth/login'
```

```json
{
  "username" : "",
  "password" : ""
}
```

if the login is successful this is the user object you'll get back.

```
{
 ...
}
```

### Further API calls
Once logged in further API calls require an `Authorization` header with the `bearer + $token` to be sent along with the request. the client-side does this automatically via the Auth service, you can see that snippet of code right [here](https://github.com/mikedevita/rackcat/blob/master/assets/src/common/services/auth.js#L37-L39).

the backend applies the policy `jwtAuth` (based on config/policies.js) to check for that Authorization token, decrypt, and validate it against the users table. The policy is located under [api/policies/jwtAuth.js](https://github.com/mikedevita/rackcat/blob/master/api/policies/jwtAuth.js) and it uses a service for Token decryption, and encryption. The TokenAuth service is located under  [api/services/TokenAuth.js](https://github.com/mikedevita/rackcat/blob/master/api/services/TokenAuth.js).
