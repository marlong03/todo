import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private us:UserService,private cs:CookieService){}
 

}
