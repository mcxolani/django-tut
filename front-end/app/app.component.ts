import {Component} from 'angular2/core';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent {

	constructor(public authHttp: AuthHttp) {}

}
