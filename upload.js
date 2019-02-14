// ****************************** //
//
// Sample call: node s3upload.js LAMBDA_FUNCTION autorest-file TEST_LAMBDA_FUNCTION us-east-2
//
// args: - folder to zip
// 			 - name of s3 bucket
// 			 - name of lambda function
// 			 - region of s3 bucket + lambda function
//
// ****************************** //

// Import your credentials however you have them saved
const credentials = require('../credentials')

const config = require ('./config')
const spawn = require('child_process')
const fs = require('fs')
const archiver = require('archiver')
var AWS = require('aws-sdk')

let zipFolder = config.zipFolder
let s3Bucket = config.s3Bucket
let lambdaFunction = config.lambdaFunction
let region = config.region

AWS.config.update({
	region: region,
	accessKeyId: credentials.aws_access_key_id,
	secretAccessKey: credentials.aws_secret_access_key
});

// Zip all of the files in the given directory
console.log('Zipping Lambda function...')
let output = fs.createWriteStream(zipFolder + '.zip')
let archive = archiver('zip', {
	zlib: { level: 9 }
})

output.on('close', () => {
	console.log(archive.pointer() + ' total bytes');
	console.log('Done.')
	uploadZipToS3()
})

archive.pipe(output)
archive.directory(zipFolder, false)
archive.finalize()

let uploadZipToS3 = () => {
	console.log('Uploading ZIP to s3...')

	fs.readFile(zipFolder +'.zip', (err, data) => {
		if (err) { throw err; }

		var s3 = new AWS.S3();
		s3.putObject({
			Body: data,
			Bucket: s3Bucket,
			Key: zipFolder
		}, (err, data) => {
			console.log('Done.')
			if (err) { throw err; }
			uploadS3ToLambda()
		})
	});
}

let uploadS3ToLambda = (s3Url) => {
	console.log('Uploading s3 object to lambda function...')

	let lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

	lambda.updateFunctionCode({
		FunctionName: lambdaFunction,
		S3Bucket: s3Bucket,
		S3Key: zipFolder
	}, (err, data) => {
		if (err) { throw err; }
		console.log('Done.')
	})
}