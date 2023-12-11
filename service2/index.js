const express = require('express');
const app = express();
const amqp = require('amqplib');
var channel, connection;

connect();
async function connect(){
    try {
       const amqpServer = "amqp://localhost:5672";
       connection = await amqp.connect(amqpServer);
       channel = await connection.createChannel();
       await channel.assertQueue("rabbit");
       channel.consume("rabbit", data => {
        console.log(`Received ${Buffer.from(data.content)}`);
     channel.ack(data); //this line work if you receive data it will acknowledge other wise thay are in still queue
    
    })
    } catch (err){
console.log(err);
    }
}

app.listen(5002, () => {
    console.log('Server at 5002');
})