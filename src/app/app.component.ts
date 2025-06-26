import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app-20';

  sendMessageToServiceWorker(message: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!navigator.serviceWorker.controller) {
        return reject("No active Service Worker");
      }

      const messageChannel = new MessageChannel();

      // Listen for the response
      messageChannel.port1.onmessage = (event) => {
        if (event.data && event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };

      // Send the message along with MessagePort
      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
    });
  }

  sendMessage() {
    this.sendMessageToServiceWorker({ type: 'GET_SOMETHING', payload: { key: 'value' } })
      .then(response => console.log('Response from SW:', response))
      .catch(error => console.error('SW error:', error));
  }
}