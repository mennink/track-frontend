import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { UserService, User } from '../shared/services/user.service';
import { ItemsService } from "../shared/utils/items.service";
import { ConfigService } from '../shared/utils/config.service';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Users` component loaded asynchronously');

@Component({
  selector: 'users',
  providers: [UserService, ConfigService, FormBuilder],
  styles: [`
  `],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  @ViewChild('usermodal')
  usermodal: ModalComponent;  
  user: FormGroup;
  localState = {
     user1: this.user
  };
  users$: Observable<User[]>;
  finished: boolean = false;
  anyErrors: boolean = false;
  constructor(public route: ActivatedRoute,
    private userService: UserService,
    private configService: ConfigService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.user = this.fb.group({
      id: '',
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: '',
      phone: '',      
      email: ['', [Validators.required]]      
    }); 

    // this.route
    //   .data
    //   .subscribe((data: any) => {
    //     // your resolved data from route
    //     this.localState = data.yourData;
    //   });

    console.log('hello `Users` component');

    this.users$ = this.userService.users$; // subscribe to entire collection


    this.userService.loadAll();    // load all users
    this.localState = {
     user1: this.user
  };


  }

  addUser({ value }: { value: User}) {
    
    //console.log(value, valid);
    this.userService.create(value);
    this.usermodal.close();

  }


  updateUser({ value }: { value: User}) {
    
    //console.log(value, valid);
    this.userService.update(value);
    this.usermodal.close();

  }

  deleteUser(id){
    this.userService.remove(id);
  }

  editUserModal(user){
    this.user = this.fb.group({
      id: user.id,
      firstName: [user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(2)]],
      dob: user.dob,
      phone: user.phone,      
      email: [user.email, [Validators.required]],      
    }); 
    //this.user = user;
    this.usermodal.open()

  }

  addUserModal(){
    this.user = this.fb.group({
      id: null,
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: '',
      phone: '',      
      email: ['', [Validators.required]],      
    }); 

    this.usermodal.open()
  }


}
