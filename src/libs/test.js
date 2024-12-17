const Stomp = require('stompjs'); // Ensure stompjs is installed
const WebSocket = require('websocket').w3cwebsocket; // Ensure websocket library is installed

// Create a WebSocket connection to RabbitMQ
const socket = new WebSocket('ws://127.0.0.1:15674/ws'); // Replace 127.0.0.1 with the actual RabbitMQ server if needed
const stompClient = Stomp.over(socket);

// Connect to RabbitMQ via WebSocket
stompClient.connect(
  {
    login: 'guest', // Default RabbitMQ username
    passcode: 'guest', // Default RabbitMQ password
  },
  function (frame) {
    console.log('Connected: ' + frame);

    // Subscribe to a test queue
    stompClient.subscribe('/queue/test', function (message) {
      console.log('Message received: ', message.body);
    });

    // Send a test message
    stompClient.send('/queue/test', {}, JSON.stringify({ test: 'Hello, RabbitMQ!' }));
  },
  function (error) {
    console.error('Error connecting to WebSocket: ', error);
  }
);
