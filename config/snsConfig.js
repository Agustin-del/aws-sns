require('dotenv').config();
const { SNSClient } = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({
    region: process.env.REGION_AWS,
    credentials: {
        accessKeyId: process.env.CLAVE_PUBLICA_AWS,
        secretAccessKey: process.env.CLAVE_SECRETA_AWS
    }
})

module.exports = snsClient;
