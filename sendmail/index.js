// Importing individual clients and commands from AWS SDK v3
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Create AWS clients
const secretsManagerClient = new SecretsManagerClient({ region: 'us-west-2' });
const sesClient = new SESClient({ region: 'us-west-2' });

async function getSecret(secretName) {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const data = await secretsManagerClient.send(command);
    return JSON.parse(data.SecretString);
}

async function sendEmail(formData) {
    // Retrieve SES credentials from Secrets Manager
    const sesCredentials = await getSecret('SESCredentials');

    // Format email
    const emailBody = `Form details:\n${JSON.stringify(formData, null, 2)}`;
    const params = {
        Source: 'info@homesbyroxanne.com', // Replace with your verified SES email
        Destination: { ToAddresses: ['info@homesbyroxanne.com'] }, // Replace with recipient email
        Message: {
            Body: { Text: { Data: emailBody }},
            Subject: { Data: 'Form Submission' }
        }
    };

    // Send email
    const sendCommand = new SendEmailCommand(params);
    await sesClient.send(sendCommand);
}

exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://v7m5k9hua2.execute-api.us-west-2.amazonaws.com/Submit-Form/", // Match this with the actual origin
            // Add other necessary headers
        },
        body: JSON.stringify(yourResponse)
    };
};


