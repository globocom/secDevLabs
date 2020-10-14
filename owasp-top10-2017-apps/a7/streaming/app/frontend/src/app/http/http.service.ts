import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
	#headers: Headers;

	constructor(protected http: HttpClient) {
		this.#headers = new Headers();
		this.#headers.append('Content-type', 'application/json');
	}

	get headers(): Object {
		return { headers: this.#headers }
	}
}
