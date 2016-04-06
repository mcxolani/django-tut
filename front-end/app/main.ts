// import {bootstrap}    from 'angular2/platform/browser';
// import {AppComponent} from './app.component';
import {Http, HTTP_PROVIDERS}    from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {bind, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

// bootstrap(AppComponent, [
//   HTTP_PROVIDERS,
//   provide(AuthHttp, {
//     useFactory: (http) => {
//       return new AuthHttp(new AuthConfig(), http);
//     },
//     deps: [Http]
//   })
// ]);

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import 'rxjs/Rx';

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	bind(LocationStrategy).toClass(HashLocationStrategy),
	provide(AuthConfig, {
		useFactory: () => {
			return new AuthConfig();
		}
	}),
	AuthHttp
]);