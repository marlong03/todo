import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { QuicklinkStrategy } from 'ngx-quicklink';
const routes: Routes = [
  {
    component:BodyComponent,
    path:'todo'
  },
  {
    component:CreateUserComponent,
    path:''
  },
  {
    component:CreateUserComponent,
    path:'**'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
