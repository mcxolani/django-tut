import {Component} from 'angular2/core';
import {SecuredComponent} from './secured.component';
import {HomeComponent} from './home.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {PollService} from './poll.service';
import {WikipediaComponent} from './wiki/wikipedia.component';

import {Http, HTTP_PROVIDERS}    from 'angular2/http';

@RouteConfig([{
	path: '/secured',
	name: 'Secured',
	component: SecuredComponent
}, {
		path: '/',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	}])
@Component({
	selector: 'my-app',
	template: `
		<button (click)="login()">login</button>
		<wiki></wiki>
	`,
	providers: [ROUTER_PROVIDERS, PollService, HTTP_PROVIDERS],
	directives: [ROUTER_DIRECTIVES, WikipediaComponent]
})
export class AppComponent {
	public title = 'Auth test';
	polls = null;
	errorMessage = null;
	constructor(private _pollService: PollService, private http: Http) {
		this.getPolls2();
	}

	postPoll1(){
		this._pollService.getPolls2()
		.then(
		polls => this.polls = polls,
		error => this.errorMessage = <any>error);
	}

	postPoll2() {
		this._pollService.getPolls1()
			.subscribe(
			polls => this.polls = polls,
			error => this.errorMessage = <any>error);
	}
	login(){
		return this.http.get("http://jsonplaceholder.typicode.com/posts/1")
			.map(res => res.json().data)
			.do(data => console.log(data));
	}

	getPolls2() {
		this._pollService.getPolls2()
			.then(
			polls => this.polls = polls,
			error => this.errorMessage = <any>error);
	}

	addPoll1(name: string) {
		if (!name) { return; }
		this._pollService.addPoll1(name)
			.then(
			hero => this.polls.push(hero),
			error => this.errorMessage = <any>error);
	}
	
} 