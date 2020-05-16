require("dotenv").load();

module.exports = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        regions: {
            sqs: process.env.AWS_SQS_REGION,
            ses: process.env.AWS_SES_REGION,
            sns: process.env.AWS_SNS_REGION
        },
        queueUrlPrefix: process.env.QUEUE_URL_PREFIX,
        snsArnPrefix: process.env.SNS_TOPIC_ARN_PREFIX
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        db: process.env.REDIS_DB
    },
    bugsnagKey: process.env.BUGSNAG_KEY,
    db: process.env.DB_CONNECTION_STRING,
    queues: {
        EMAIL_EVENT: process.env.EMAIL_PROCESS_QUEUE,
        EMAIL_LOW_PRIORITY_EVENT: process.env.EMAIL_LOW_PRIORITY_PROCESS_QUEUE,
        EMAIL_TRACKER_STATUS: process.env.EMAIL_TRACKER_STATUS,
        DIGEST_EMAIL_PROCESS_QUEUE: process.env.DIGEST_EMAIL_PROCESS_QUEUE
    },
    snsTopic: {
        EMAIL_COMPLAINT_TOPIC: process.env.EMAIL_COMPLAINT_TOPIC
    },
    clientBaseUrl: process.env.CLIENT_BASE_URL,
    backendBaseurl: process.env.API_BASE_URL
};