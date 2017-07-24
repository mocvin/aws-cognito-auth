"use strict";

const  envs = require('envs');
const authenticationData =  {
    Username: envs('USERNAME', 'vinmoc'),
    Password: envs('PASSWORD', 'Password123')
};

const poolData = {
    UserPoolId : envs('USER_POOL_ID', 'eu-west-1_ZyVqqWzfo'), // Your user pool id here
    ClientId : envs('CLIENT_ID','47ksvk8cl9d6455ekea5gevm66'), // Your client id here
};

const region = 'eu-west-1';

const cognitoIdpUrl = 'cognito-idp.'+ region +'.amazonaws.com/'; //EU-WEST-1;
const identityPoolId = envs('IDENTITY_POOL_ID', 'eu-west-1:36f219b6-8bd8-4275-a96d-9474b22d0028');

const aws =  {
    region: region,
    poolData: poolData,
    authenticationData: authenticationData,
    cognitoIdpUrl: cognitoIdpUrl,
    identityPoolId: identityPoolId
};

module.exports = {
    aws: aws
};









