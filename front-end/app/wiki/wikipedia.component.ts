import {Component} from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable'
import {WikiService} from './wikipedia.service';
import {Subject}          from 'rxjs/Subject';
@Component({
	selector: 'wiki',
	template:`
		<h1>Wikipedia search</h1>
		<input #term (keyup)="getItems(term.value)"/>
		<ul>
			<li *ngFor="#item of items | async">{{item }}</li>
		</ul>
	`,
	providers: [JSONP_PROVIDERS, WikiService]
})
export class WikipediaComponent{
	constructor(private _wikiService:WikiService){}
	items: Observable<string[]>;
	private _searchTermStream = new Subject<string>();
	getItems(term:string){
		// this._searchTermStream.next(term);
	 	this.items = this._wikiService.search(term)
	}

	// items: Observable<string[]> = this._searchTermStream
	// 	.debounceTime(300)
	// 	.distinctUntilChanged()
	// 	.switchMap((term: string) => this._wikiService.search(term));
}
