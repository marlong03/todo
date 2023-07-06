import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  constructor(private us:UserService){}
  ngOnInit(): void {
    let user = this.us.obtenerUser() 
    if(user != false){
      window.location.href = window.location.href + '/todo'
    }
  }
   /* Variables globales */
  inputNombre = ""
   /* /Variables globales */

  crearUsuario(){
    let userNew ={
      nombre: this.inputNombre,
      colorFondo:"#002233",
      burbujas:true
    } 
    this.us.crearUser(userNew)
    setTimeout(() => {
      window.location.href = window.location.href
      
    }, 300);
  }
}
