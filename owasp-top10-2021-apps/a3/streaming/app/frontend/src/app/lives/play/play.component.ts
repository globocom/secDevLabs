
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserUtil } from 'src/app/user/user-utils';
import { LiveService } from '../lives.service';
import { Message } from '../message';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  #selectedLive;
  #message;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private liveService: LiveService) {
    this.#message = "";

    setInterval(() => {
      this.getMessages();
    }, 3000)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let username = params.username;

      this.liveService.findByUsername(username).subscribe(
        response => {
          this.#selectedLive = response;
          this.populateLiveMessage(this.#selectedLive.messages)
        },
        error => {
          console.log('Unable to load live! :(');
        }
      );
    });
  }

  getMessages() {
    this.liveService.getMessages(this.#selectedLive.id).subscribe(
      response => {
        let responseArray = (response as object[]);
        let newMessages = []

        for(let i = this.#selectedLive.messages.length; i < responseArray.length; i++) {
          newMessages.push(responseArray[i]);
        }

        this.#selectedLive.messages = [...this.#selectedLive.messages, ...newMessages];
        this.populateLiveMessage(newMessages);
      },
      error => {
        console.log('Unable to load messages! :(');
      }
    );
  }

  removeHTMLMessages() {
    let htmlMessages = document.getElementById("messages");
    while (htmlMessages.firstChild) {
      htmlMessages.removeChild(htmlMessages.lastChild);
    }
  }

  populateLiveMessage(messages) {
    this.waitForElm("#messages").then(htmlMessages => {
      messages.forEach(message => {
        let htmlMessage = this.buildLiveHTMLMessage(message);
        (htmlMessages as HTMLElement).appendChild(htmlMessage);
      })
    })
  }

  waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  }


  buildLiveHTMLMessage(message) {
    let newMessageBox = document.createElement("span");
    newMessageBox.className="example-item";
    
    let labelUserMessage = document.createElement("label");
    labelUserMessage.className = "user-message-label";

    let usernameUserMessage = document.createElement("b");
    usernameUserMessage.className = "user-message";
    usernameUserMessage.innerHTML = message.user.username;

    labelUserMessage.appendChild(usernameUserMessage);

    let contentMessage = document.createElement("p");
    contentMessage.className = "message";
    contentMessage.style.marginLeft="10px";
    contentMessage.style.marginTop="10px";
    contentMessage.style.padding="10px";
    contentMessage.style.maxWidth="100%";
    contentMessage.style.backgroundColor="rgb(222, 230, 245)";
    contentMessage.style.color="rgba(0, 0, 0, 0.8);";
    contentMessage.style.borderRadius="5px";

    newMessageBox.appendChild(labelUserMessage);

    contentMessage.innerHTML = message.content;
    newMessageBox.appendChild(contentMessage);

    return newMessageBox;
  }

  populateLastLiveMessage(message) {
    let messages = document.getElementById("messages");
    let htmlMessage = this.buildLiveHTMLMessage(message);
    messages.appendChild(htmlMessage);
  }

  addMessage() {
    if(this.#message.trim() == "") {
      return;
    }

    let username = UserUtil.user;
    let message = new Message(username, this.#message);
    this.liveService.addMessage(this.#selectedLive.id, message).subscribe(
      newMessage => {
        this.#message = "";
        this.#selectedLive.messages = [ ... this.#selectedLive.messages, newMessage];
        this.populateLastLiveMessage(newMessage);
      },
      error => {
        alert('Unable to add message! :(');
      }
    );
  }

  removeMessages() {
    this.liveService.deleteMessages(this.#selectedLive.id).subscribe(
      response => {
        this.#selectedLive.messages = [];
        this.removeHTMLMessages();
      },
      error => {
        alert('Unable to remove messages! :(');
      }
    );
  }

  get live() {
    return this.#selectedLive;
  }

  get message() {
    return this.#message;
  }

  set message(message) {
    this.#message = message;
  }

}
