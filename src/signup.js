"use strict";

let config = require('./config').aws;
let AWSCognito = require('amazon-cognito-identity-js');
let AWS = require('aws-sdk');

AWS.config.region = config.region;

let userPool = new AWSCognito.CognitoUserPool(config.poolData);

let dataEmail = {
    Name: 'email',
    Value: 'vincenzo.moccia@beyondtech.it'
};

let dataPhoneNumber = {
    Name: 'phone_number',
    Value: '+3908180012312'
};

let userAttributes = [dataEmail, dataPhoneNumber];

userPool.signUp('vinmoc4', 'Password124', userAttributes, null,
    function (err, result) {
        if (err) console.log(err.stack);
        else console.log('User name is ' + result.user.getUsername() + '. ' +
            'Now confirm the signup.');
    });