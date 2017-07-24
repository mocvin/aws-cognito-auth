"use strict";

let config = require('./config').aws;
let AWSCognito = require('amazon-cognito-identity-js');
let AWS = require('aws-sdk');
let jwtDecode = require('jwt-decode');

var userPool = new AWSCognito.CognitoUserPool(config.poolData);

var userData = {
    Username : config.authenticationData.Username,
    Pool : userPool
};

var cognitoUser = new AWSCognito.CognitoUser(userData);
var authenticationDetails = new AWSCognito.AuthenticationDetails(config.authenticationData);

cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        console.log('Access token + ' + result.getAccessToken().getJwtToken());

        var idpKey =  config.cognitoIdpUrl +  config.poolData.UserPoolId;
        let logins = {};
        logins[idpKey] = result.getIdToken().getJwtToken();

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = config.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.identityPoolId,
            Logins : logins
        });

        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        cognitoidentityserviceprovider.getUser({ AccessToken: result.getAccessToken().getJwtToken()}, function(err, data) {

            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response

        });

        AWS.config.credentials.get(function (err) {
            // now I'm using authenticated credentials
            if(err) console.log('Error in autheticatig AWS'+err);
            else {
                console.log('SessionKeyId: ' + AWS.config.credentials.sessionToken);
                console.log('SecretKeyId: ' + AWS.config.credentials.secretAccessKey);
                console.log('AccessKeyId: ' + AWS.config.credentials.accessKeyId) ;
            };
        });

        var cognitoUser = userPool.getCurrentUser();

        if(cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('session validity: ' + session.isValid());

                var sessionIdInfo = jwtDecode(session.getIdToken().jwtToken);
                console.log(sessionIdInfo['cognito:groups']);
            })
        };
        // Instantiate aws sdk service objects now that the credentials have been updated.
        // example: var s3 = new AWS.S3();

    },

    onFailure: function(err) {
        console.log(err);
    },

    newPasswordRequired: function(userAttributes, requiredAttributes) {
        console.log("PASSWORD_CHALLANGE")
        cognitoUser.completeNewPasswordChallenge("Password123", {}, this)
    }

});