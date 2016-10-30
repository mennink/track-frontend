import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ItemsService } from '../utils/items.service';
import {ConfigService} from '../utils/config.service';
import 'rxjs/add/operator/map';

export interface User {
    id: any;   
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    avatar: string;
} 

@Injectable()
export class UserService {
  private _users$: Subject<User[]>;
  private baseUrl: string;
  private dataStore: {
    users: User[]
  };
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(
      private http: Http,
      private configService: ConfigService      
      ) {
    this.baseUrl  = this.configService.getApiURI();
    this.dataStore = { users: [] };
    this._users$ = <Subject<User[]>>new Subject();
  }

  get users$() {
    return this._users$.asObservable();
  }

  loadAll() {
    this.http.get(`${this.baseUrl}/users`).map(response => response.json()).subscribe(data => {
      this.dataStore.users = data;
      this._users$.next(this.dataStore.users);
    }, error => console.log('Could not load users.'));
  }

  load(id: any) {
    this.http.get(`${this.baseUrl}/users/${id}`).map(response => response.json()).subscribe(data => {
      let notFound = true;

      this.dataStore.users.forEach((item, index) => {
        if (item.id === data.id) {
          this.dataStore.users[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.users.push(data);
      }

      this._users$.next(this.dataStore.users);
    }, error => console.log('Could not load user.'));
  }

  create(user: User) {
    this.http.post(`${this.baseUrl}/users`, JSON.stringify(user), this.options)
      .map(response => response.json()).subscribe(data => {
        this.dataStore.users.push(data);
        this._users$.next(this.dataStore.users);
      }, error => console.log('Could not create user.'));
  }

  update(user: User) {
    this.http.put(`${this.baseUrl}/users/${user.id}`, JSON.stringify(user), this.options)
      .map(response => response.json()).subscribe(data => {
        this.dataStore.users.forEach((todo, i) => {
          if (todo.id === data.id) { this.dataStore.users[i] = data; }
        });

        this._users$.next(this.dataStore.users);
      }, error => console.log('Could not update user.'));
  }

    remove(userId: number) {
    this.http.delete(`${this.baseUrl}/users/${userId        }`).subscribe(response => {
      this.dataStore.users.forEach((t, i) => {
        if (t.id === userId) { this.dataStore.users.splice(i, 1); }
      });

      this._users$.next(this.dataStore.users);
    }, error => console.log('Could not delete user.'));
  }
}

