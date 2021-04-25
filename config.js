exports.project_q_dev = {
    region: "us-east-2",
    pathToFolder: "../../ProjectQ/Services/develop/projectq-services",
    s3Bucket: "ohio-lambda-functions",
    lambdaFunction: "ProjectQ_Services_Dev",
}
exports.ar_prod = {
    region: "us-east-2",
    pathToFolder: "../../Autorest/Services/autorest-services/updateEndpointDetails",
    s3Bucket: "autorest-ohio-lambdas",
    lambdaFunction: "updateEndpointDetails",
}
exports.ar_dev = {
    region: "us-east-2",
    pathToFolder: "../../Autorest/Services/autorest-services/createProjectbyUUID",
    s3Bucket: "autorest-ohio-lambdas-dev",
    lambdaFunction: "createProjectbyUUID",
}