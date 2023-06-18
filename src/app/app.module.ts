import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { TodoComponent } from './components/body/todo/todo.component';
import { TimeagoPipe } from './pipes/timeago.pipe';
import {CookieService} from 'ngx-cookie-service';
import { CreateUserComponent } from './components/create-user/create-user.component'
import { QuicklinkModule } from 'ngx-quicklink';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    TodoComponent,
    TimeagoPipe,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuicklinkModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
