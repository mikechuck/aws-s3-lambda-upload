exports.project_q_dev = {
    region: "us-east-2",
    pathToFolder: "../../ProjectQ/Services/develop/projectq-services",
    s3Bucket: "ohio-lambda-functions",
    lambdaFunction: "ProjectQ_Services_Dev",
}
exports.ar_prod = {
    region: "us-east-2",
    pathToFolder: "../../Autorest/Services/autorest-services/updatePaymentMethod",
    s3Bucket: "autorest-ohio-lambdas",
    lambdaFunction: "updatePaymentMethod",
}
exports.ar_dev = {
    region: "us-east-2",
    pathToFolder: "../../Autorest/Services/autorest-services/successfulPaymentsStripeWebhook",
    s3Bucket: "autorest-ohio-lambdas-dev",
    lambdaFunction: "successfulPaymentsStripeWebhook",
}