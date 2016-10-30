import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../shared/services/user.service';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { ConfigService } from '../shared/utils/config.service';
import { Observable } from 'rxjs/Observable';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  providers: [UserService, ItemsService, ConfigService],  
  styles: [`
  `],
  template: `
    <h1>About</h1>
    <div>
      JTDBS Angular Test Project
      <pre>npm run start:hmr</pre>
    </div>
    


    <div>
     <div *ngFor="let user of users$ | async">
        {{ user.firstName }} <button (click)="deleteUser(user.id)">x</button>
      </div>
    </div>
    <div>
      <h3>
        mennink@gmail.com
      </h3>
    </div>
    <div *ngIf="anyErrors">Errors!</div>
    <div >User length{{users$.length}}</div>
   
  `
})
export class AboutComponent {
  localState: any;
  users$: Observable<User[]>;
  finished: boolean = false;
  anyErrors: boolean = false;
  constructor(public route: ActivatedRoute, 
        private userService: UserService,
        private itemsService: ItemsService,
        private configService: ConfigService) {

  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');

    this.users$ = this.userService.users$; // subscribe to entire collection
  
    
    this.userService.loadAll();    // load all users
  
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    //this.asyncDataWithWebpack();
    //var response = this.loadUsers();
        //this.localState = response
  }

  // loadUsers(){
  //   this.dataService.getUsers().subscribe(
  //         (data:IUser[]) => this.localState = data,
  //         error => console.log(error),
  //         () => console.log('Get all Users complete' + this.localState));

         
    //         error => console.log(error),
    //         () => console.log('Get all Users complete' + this.users)
  // }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then(json => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}
