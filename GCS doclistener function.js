const functions = require('@google-cloud/functions-framework');

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
functions.cloudEvent('helloGCS', cloudEvent => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration: ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);
});

const { Kafka } = require('kafkajs');
const fetch = require('node-fetch').default;

exports.myCloudFunction = (req, res) => {
    import('node-fetch').then(({ default: fetch }) => {
    const accessToken = '4GoElDnUrmgNMOCWf673t7waKe9TxFTCSZZ1rlZ9Nl805bKQ2RImJQu5WZMeH1UI';
    const redPandaEndpoint = 'cp5nhp6vd5pm5ndt9eq0.any.us-east-1.mpx.prd.cloud.redpanda.com:9092';

    fetch(redPandaEndpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }    
    })

.then(response => response.json())
    .then(data => {
        // Handle the response data
        res.status(200).send(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    })
    .catch(error => {
        // Handle dynamic import error
        console.error('Error importing node-fetch:', error);
        res.status(500).send('Internal Server Error');
    });

const kafka = new Kafka({ 
    clientId: 'cloud-function-producer',
    brokers: ['cp5nhp6vd5pm5ndt9eq0.any.us-east-1.mpx.prd.cloud.redpanda.com:9092'],

});

kafka.producer().connect().then(() => {
  const producer = kafka.producer();
  // Use the producer variable here
}).catch(error => {
  console.error(error);
});

const producer = kafka.producer();

const publishToRedPanda = async (event, context) => {
    const file = event;
    const fileContent = file.name; // Replace this with logic to read file content

    try {
        await producer.connect();
        await producer.send({
            topic: 'docs',
            messages: [
                { value: fileContent },
            ],
        });
        await producer.disconnect();
        console.log('Published to Red Panda:', file.name);
    } catch (error) {
        console.error('Error publishing to Red Panda:', error);
    }

};
// }); // Add this closing brace to close the myCloudFunction function
