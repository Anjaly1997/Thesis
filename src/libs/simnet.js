/* eslint-disable no-undef, no-unused-expressions, no-restricted-globals */
import { Client } from "@stomp/stompjs";

"use strict";

function SimNet() {
  const _simnet = {};

  let _stompClient = null;
  let _topic = {};
  let _onConnectedCallbacks = [];
  let _connected = false;

  // Default configuration
  let _config = {
    url: "wss://localhost:15674/ws",
    user: "guest",
    pass: "guest",
    exchange: "",
  };

  // Handle successful connection
  function onConnect(frame) {
    console.log("Connected to RabbitMQ:", frame);
    _connected = true;

    // Subscribe to all previously defined topics
    for (const topic in _topic) {
      _stompClient.subscribe(`${_config.exchange}${topic}`, (message) => {
        _topic[topic].forEach((callback) => callback(JSON.parse(message.body)));
      });
    }

    // Trigger all connection callbacks
    _onConnectedCallbacks.forEach((callback) => callback(frame));
  }

  // Handle connection error
  function onError(error) {
    console.error("Connection error:", error);
    _connected = false;
    _stompClient = null;
  }

  // Public function: Check if connected
  _simnet.isConnected = function () {
    return _connected;
  };

  // Public function: Connect to RabbitMQ
  _simnet.connect = function (options = {}) {
    if (!_stompClient) {
      // Merge user-supplied options with defaults
      _config = { ..._config, ...options };

      if (!_config.url) {
        _config.url = `${_config.protocol || "wss"}://${_config.server || "localhost"}:${
          _config.port || "15674"
        }/ws`;
      }

      // Create StompJS Client
      _stompClient = new Client({
        brokerURL: _config.url,
        connectHeaders: {
          login: _config.user,
          passcode: _config.pass,
        },
        heartbeatIncoming: 30000,
        heartbeatOutgoing: 30000,
        onConnect,
        onStompError: onError,
      });

      console.log("Connecting to RabbitMQ...");
      _stompClient.activate();
    }
  };

  // Public function: Add onConnected callback
  _simnet.onConnected = function (callback) {
    if (_connected) {
      callback();
    } else {
      _onConnectedCallbacks.push(callback);
    }
  };

  // Public function: Subscribe to a topic
  _simnet.subscribe = function (topic, callback) {
    if (!_topic[topic]) {
      _topic[topic] = [];
    }

    _topic[topic].push(callback);

    if (_connected) {
      _stompClient.subscribe(`${_config.exchange}${topic}`, (message) => {
        _topic[topic].forEach((cb) => cb(JSON.parse(message.body)));
      });
    }
  };

  // Public function: Send message to a topic
  _simnet.send = function (topic, data) {
    if (_connected && _stompClient) {
      _stompClient.publish({
        destination: `${_config.exchange}${topic}`,
        body: JSON.stringify(data),
        headers: { "content-type": "text/plain" },
      });
      console.log(`Message sent to ${topic}:`, data);
    } else {
      console.warn("Client not connected. Unable to send message.");
    }
  };

  return _simnet;
}

// Singleton instance for simnet
const simnet = window.parent.simnet === undefined ? SimNet() : window.parent.simnet;

export default simnet;
