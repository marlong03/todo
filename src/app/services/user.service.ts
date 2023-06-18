import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private cookieService:CookieService) {}
  private obUser = this.obtenerUser()  == false? {
    nombre:"null",
    colorFondo:"#ff0000",
    burbujas:false
  } : this.obtenerUser()
   /* OBSERVADOR */
  private obUserBehavior = new BehaviorSubject<any>(this.obUser)
  obUserBehavior$ = this.obUserBehavior.asObservable();

  modificarUser(userNow:any){
    let obUser = this.obtenerUser()
    let userReturn =  Object.assign(obUser,userNow)
    this.crearUser(userReturn)
    this.obUserBehavior.next(userReturn)
  }
  obtenerObUser(){
    return this.obUser;
  }
  /* /OBSERVADOR */
  obtenerUser(){
    try{
      return JSON.parse(this.cookieService.get('user'))
    }catch(e){
      return false
    }
  }
  crearUser(nuevoUser:User){
   this.cookieService.set('user' , JSON.stringify(nuevoUser))
  }
  eliminarUser(){
    this.cookieService.deleteAll()
    setTimeout(() => {
      window.location.href = window.location.href
    }, 1000);
  }
}
