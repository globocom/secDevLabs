import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Message } from './message';

@Injectable({
	providedIn: 'root'
})
export class LiveService extends HttpService {

	private path = "http://localhost:8080/live";

	listAll() {
		return this.http.get(this.path);
	}

	findByUsername(username: string) {
		username = username.replace("@", "");
		return this.http.get(`${this.path}/username/${username}`);
	}

	getMessages(liveId: number) {
		return this.http.get(`${this.path}/${liveId}/messages`);
	}

	addMessage(liveId: number, message: Message) {
		return this.http.put(`${this.path}/${liveId}/messages`, message, this.headers);
	}

	deleteMessages(liveId: number) {
		return this.http.delete(`${this.path}/${liveId}/messages`);
	}

}
