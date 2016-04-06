import {Component} from 'angular2/core';
// import {SecuredComponent} from './secured.component';
// import {HomeComponent} from './home.component';
// import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
// import {PollService} from './poll.service';
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
	constructor(private http: Http, public authHttp: AuthHttp) {
		this.getThing();
	}


	getThing() {
			let body = JSON.stringify({ username: "masuku", password: "xolani.m89" });
			var myHeader = new Headers();
			myHeader.append('Content-Type', 'application/json');
			return this.authHttp.post("http://jsonplaceholder.typicode.com/posts/1", body, { headers: myHeader })
				.map(res => res.json())
				.catch(this._logAndPassOn);
		
	}
	private _logAndPassOn(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
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
	}
	
} 