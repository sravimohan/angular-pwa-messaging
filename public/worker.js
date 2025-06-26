importScripts('ngsw-worker.js');

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  // Optional: you can validate the origin, event.ports, etc.
  if (!event.ports || event.ports.length === 0) return;

  const port = event.ports[0];

  if (type === 'GET_SOMETHING') {
    // Perform your logic (e.g., fetch from cache or IndexedDB)
    const result = { result: 'Here is your data', received: payload };

    // Send the response
    port.postMessage(result);
  } else {
    port.postMessage({ error: 'Unknown message type' });
  }
});
