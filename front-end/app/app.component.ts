import {Component} from 'angular2/core';
// import {SecuredComponent} from './secured.component';
// import {HomeComponent} from './home.component';
// import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {PollService} from './poll.service';
import {WikipediaComponent} from './wiki/wikipedia.component';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';
import {Headers, RequestOptions} from 'angular2/http';

@Component({
	selector: 'my-app',
	template: `
		<button (click)="login()">login</button>
		<wiki></wiki>
	`,
	providers: [JwtHelper],
	directives: [WikipediaComponent]
})
export class AppComponent {
	public title = 'Auth test';
	polls = null;
	errorMessage = null;
	constructor(private http: Http) {
		this.getThing();
		// this.getData();
	}


	getThing() {
			let body = JSON.stringify({ username: "masuku", password: "xolani.m89" });
			var token = localStorage.getItem('id_token');
			// var jwtHelper = new JwtHelper();
			// token = jwtHelper.decodeToken(token);
			let body2 = JSON.stringify({ token: token }) 
			var myHeader = new Headers();
			myHeader.append('Content-Type', 'application/json');
			this.http.post("http://localhost:8000/api-token-auth/", body, { headers: myHeader })
				.subscribe(
				data => {
					console.log(data.json());
					localStorage.setItem('id_token',data.json().token)
					// this.quote = data.json();
				},
				err => console.log("dsfdfdf" + err),
				() => console.log('Complete')
				);

			this.http.post("http://localhost:8000/api-token-verify/", body2, { headers: myHeader })
				.subscribe(
				data => {
					console.log(data.json());
					// localStorage.setItem('id_token', data.json().token)
					// this.quote = data.json();
				},
				err => console.log("dsfdfdf" + err),
				() => console.log('Complete')
				);
			// curl - X POST - H "Content-Type: application/json" - d '{"token":"<EXISTING_TOKEN>"}' 
	}
	private _logAndPassOn(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
	getData(){
		var authHeader = new Headers();
		var token = localStorage.getItem('id_token');
		var jwtHelper = new JwtHelper();
		token = jwtHelper.decodeToken(token);
		console.log(token);
		// token = window.jwt_decode(token);
			authHeader.append('Authorization', 'JWT ' + token);
			this.http.get('http://localhost:8000/polls', { headers: authHeader })
			.subscribe(
			data => {
				console.log(data.json());
				// this.quote = data.json();
			},
			err => console.log(err),
			() => console.log('Complete')
			);
	}
	// getPoll2(){
	// 	this._pollService.getPolls2()
	// 	.then(
	// 	polls => console.log(polls),
	// 	error => this.errorMessage = <any>error);
	// }

	// getPollsAuth(){
	// 	this._pollService.getPollsAuth()
	// 		.subscribe(
	// 			polls => console.log(polls),
	// 			error => console.log(error)
	// 		);
	// }

	// getPoll1() {
	// 	this._pollService.getPolls1()
	// 		.subscribe(
	// 		polls => this.polls = polls,
	// 		error => this.errorMessage = <any>error);
	// }
	// login(){
	// 	this._pollService.login()
	// 		.subscribe(
	// 		data => console.log("sdfsf"),
	// 		err => console.log("sdfsf"),
	// 		() => console.log('Request Complete')
	// 		);
		

	// }

	// getPolls2() {
	// 	this._pollService.getPolls2()
	// 		.then(
	// 		polls => this.polls = polls,
	// 		error => this.errorMessage = <any>error);
	// }

	// addPoll1(name: string) {
	// 	if (!name) { return; }
	// 	this._pollService.addPoll1(name)
	// 		.then(
	// 		hero => this.polls.push(hero),
	// 		error => this.errorMessage = <any>error);
	// }
	
} 