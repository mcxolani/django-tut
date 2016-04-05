// import {bootstrap}    from 'angular2/platform/browser';
// import {AppComponent} from './app.component';
// import {Http, HTTP_PROVIDERS}    from 'angular2/http';
// import {AuthHttp, AuthConfig} from 'angular2-jwt';
// import {provide} from 'angular2/core';


// bootstrap(AppComponent, [
//   HTTP_PROVIDERS,
//   provide(AuthHttp, {
//     useFactory: (http) => {
//       return new AuthHttp(new AuthConfig(), http);
//     },
//     deps: [Http]
//   })
// ]);
import 'rxjs/Rx';
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent);
