#
Simple script to zip a file, upload it to s3, and upload that s3 object to a lambda function.

## Getting Started

Before starting, open the config file and specify the fields as you like. Examples are filled in already.

### Installing

Run an npm install to install dependencies

```
npm install
```

### Running the Code

Run the upload script to start the automation

```
npm run upload
```

## Built With

* [Node](https://nodejs.org/)
* [Archiver](https://www.npmjs.com/package/archiver) - An npm package for compressing
* [AWS SDK for NodeJS](https://aws.amazon.com/sdk-for-node-js/) - Used for connecting to AWS services

## Authors

* **Michael Joy** - *Initial work*
