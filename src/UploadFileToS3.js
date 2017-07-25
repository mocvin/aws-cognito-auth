"use strict";

let AWS = require('aws-sdk');
let config = require('./config').aws;
let fs = require('fs');

let albumBucketName = 'bucketName';
let bucketRegion = config.region;
let IdentityPoolId = config.identityPoolId;

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
        accessKeyId: '****************',
        secretAccessKey: '*********************'
    }),
});

let s3 = new AWS.S3();

fs.readFile('../image.png', function (err, data) {

    let buffer = new Buffer(data);
    s3.putObject({
        Key: 'assist.png',
        Body: buffer,
        Bucket: albumBucketName
    }, function (err, data) {
        if (err) {
            return console.log(err.message);
        }
        console.log('Successfully uploaded photo.');
    });

});
