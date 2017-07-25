"use strict";

let config = require('./config').aws;
let AWSCognito = require('amazon-cognito-identity-js');
let AWS = require('aws-sdk');

AWS.config.region = config.region;

let userPool = new AWSCognito.CognitoUserPool(config.poolData);

let params = {
    Username: 'vinmoc4',
    ConfirmationCode: '879702',
    ClientId: config.poolData.ClientId
};

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});