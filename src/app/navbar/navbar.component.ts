import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../app.routes';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
   
  }

  public get menuIcon(): string {
    return this.isCollapsed ? '☰' : '✖';
  }
 
}
