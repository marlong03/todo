import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private us:UserService){}
  ngOnInit(): void {
   this.obtenerUser()
  }
   /* Observador */
   modificarUserPadre(nombreP:any ,colorFondoP:any, burbujasP:any){
    let userEdit = {
      nombre:nombreP  == undefined ? this.userConnected.nombre : nombreP,
       colorFondo:colorFondoP == undefined ? this.userConnected.colorFondo : colorFondoP,
       burbujas:burbujasP == undefined ? this.userConnected.burbujas : burbujasP
    }
     this.us.modificarUser(userEdit) 
  }
  /* /Observador */

 /* Variables globales */
  estadoSidebar = false
  estadoInputCambiarNombre = "none"
  userConnected:any;
  inputChecked:any
  nombreValue = ""
  colorFondo = ""
  inputColor = document.getElementById("inputColor")
 /* /Variables globales */
 
 obtenerUser(){
    this.userConnected = this.us.obtenerUser()
    this.inputChecked = this.userConnected.burbujas
    this.colorFondo = this.userConnected.colorFondo
  }
  borrarDatos(){
    this.us.eliminarUser()
  }
 accionarSidebar(){
    let sidebar = document.getElementById("sidebar")
    if(this.estadoSidebar == false){
      sidebar?.classList.remove("ocultarSide")
      sidebar?.classList.add("mostrarSide")
      this.estadoSidebar = true
    }else{
      sidebar?.classList.add("ocultarSide")
      sidebar?.classList.remove("mostrarSide")
      this.estadoSidebar = false
    }
  }
  accionarInputCambiarNombre(){
    this.estadoInputCambiarNombre == "none" ? 
    this.estadoInputCambiarNombre = "flex" : 
    this.estadoInputCambiarNombre = "none"
  }
  //-----------------------------------------
  cambiarNombre(){
    this.modificarUserPadre(this.nombreValue,undefined,undefined)
    this.obtenerUser()
    this.nombreValue = ""
    this.accionarInputCambiarNombre()
  }
  cambiarEstadoBurbujas(){
    if(this.inputChecked === false){
      this.modificarUserPadre(undefined,undefined,!this.inputChecked)
      this.inputChecked = true
    }else{
      this.modificarUserPadre(undefined,undefined,!this.inputChecked)
      this.inputChecked = false
    }
    this.obtenerUser()
  }
  cambiarColorFondo(e:any){
      this.modificarUserPadre(undefined,String(e.target.value),undefined)
      this.obtenerUser()
  }
}
