import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {HEROES} from './mock-heroes';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';
import {Headers, RequestOptions} from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

@Injectable()
export class PollService {
	constructor(private http: Http, public authHttp: AuthHttp) { }

	private _pollsUrl = 'http://localhost:8000/polls/';  // URL to web api

	getPolls1() {
		return this.http.get(this._pollsUrl)
			.map(res => res.json())
			.do(data => console.log(data)) // eyeball results in the console
			.catch(this.handleError);
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

