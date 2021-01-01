const spawn = require('child_process')
const fs = require('fs')
const archiver = require('archiver')
var AWS = require('aws-sdk')
let config

var account = process.env.npm_config_account

// Get the right credentials based on the account
if (account === 'arprod'){
	var credentials = require('../credentials_ar_prod')
} else if (account === 'ardev') {
	var credentials = require('../credentials_ar_dev')
} else {
	var credentials = require("../credentials")
}

// Get the right config based on the account
if (account === 'arprod') {
	const {ar_prod} = require ('./config')
	config = ar_prod
} else if (account === 'ardev') {
	const {ar_dev} = require ('./config')
	config = ar_dev
} else if (account === 'projectqdev') {
	const {project_q_dev} = require ('./config')
	config = project_q_dev
}

let pathToFolder = config.pathToFolder
let zipFolder =	pathToFolder.split('/').pop()
let s3Bucket = config.s3Bucket
let lambdaFunction = config.lambdaFunction
let region = config.region

AWS.config.update({
	region: region,
	accessKeyId: credentials.default.aws_access_key_id,
	secretAccessKey: credentials.default.aws_secret_access_key
});

let uploadZipToS3 = () => {
	console.log('Uploading ZIP to s3...')

	fs.readFile(zipFolder +'.zip', (err, data) => {
		if (err) { throw err; }

		var s3 = new AWS.S3();
		s3.putObject({
			Body: data,
			Bucket: s3Bucket,
			Key: zipFolder + '.zip'
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
	console.log("lambdaFunction:", lambdaFunction)
	console.log("S3Bucket:", s3Bucket)
	console.log("zipFolder:", zipFolder)
	lambda.updateFunctionCode({
		FunctionName: lambdaFunction,
		S3Bucket: s3Bucket,
		S3Key: zipFolder + '.zip'
	}, (err, data) => {
		if (err) { throw err; }
		console.log('Done.')
		fs.unlinkSync(zipFolder + '.zip')
	})
}

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
archive.directory(pathToFolder, false)
archive.finalize()
