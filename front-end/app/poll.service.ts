import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {HEROES} from './mock-heroes';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';
import {Headers, RequestOptions} from 'angular2/http';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';

@Injectable()
export class PollService {
	constructor(private http: Http, private _auth: AuthHttp, private jwtHelper: JwtHelper) { }

	private _pollsUrl = 'http://jsonplaceholder.typicode.com/posts/1';  // URL to web api

	getPolls1() {
		return this.http.get(this._pollsUrl)
			.map(res => res.json())
			.do(data => console.log(data)) // eyeball results in the console
			.catch(this.handleError);
	}

	getPollsAuth(){
		// localStorage.setItem('id_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hc3VrdSIsInVzZXJfaWQiOjMsImVtYWlsIjoibWFzdWt1QG1hc3VrdS5jb20iLCJleHAiOjE0NTk5MjUwODZ9.CunC6r4kcqoT7DgmgQoBZXxU9grhJohrWs3XV6M4myc');
		return this._auth.get('http://127.0.0.1:8000/polls');
	}

	login(){
		// "username=masuku&password=xolani.m89" http://localhost:8000/api-token-auth/
		let username = "masuku";
		let password = "xolani.m89"
		let body = JSON.stringify({ username, password });
		var myHeader = new Headers();
		myHeader.append('Content-Type', 'application/json');
		return this._auth.post('http://127.0.0.1:8000/api-token-auth/', body, { headers: myHeader });

	}

	getPolls2() {
		return this.http.get(this._pollsUrl)
			.toPromise()
			.then(res => <Hero[]>res.json().data, this.handleError)
			.then(data => { console.log(data); return data; }); // eyeball results in the console
	}

	addPoll2(name: string): Observable<Hero> {
		let body = JSON.stringify({ name });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this._pollsUrl, body, options)
			.map(res => <Hero>res.json().data)
			.catch(this.handleError)
	}
	addPoll1(name: string): Promise<Hero> {
		let body = JSON.stringify({ name });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._pollsUrl, body, options)
			.toPromise()
			.then(res => <Hero>res.json().data)
			.catch(this.handleError);
	}
	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}

