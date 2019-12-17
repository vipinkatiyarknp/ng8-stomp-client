import { Component } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-socket-client';
  private serverUrl = 'http://10.133.90.52:8080/ip-portal-websocket';
  private stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const user = 'abc';
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(`/queue/reply-${user}`, (message) => {
        console.log('MESSAGE RECEIVED', message);
      });
    });
  }

  sendMessage(message) {
    // this.stompClient.send(`/app/send/message`, {}, message);
  }
}
