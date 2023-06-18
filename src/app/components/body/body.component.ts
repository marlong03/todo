import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  constructor(private us:UserService,private ts:TodoService){}
  ngOnInit(): void {
    this.obtenerUser() 
    let user:any = this.userConnected
    user == false ? window.location.href = window.location.href.replace('todo','') : this.obtenerUser()  
    this.us.obUserBehavior$.subscribe(user =>{
      this.userConnected = user
      this.obtenerUser()
    })
    this.ts.obNuevaListaTodoBehavior$.subscribe(todos =>{
      this.todosLength = this.ts.numeroTodosPendientes()
    })
  }
  /* OUTPUT */
  changeNewItem(e:any){
    this.newItem = e
  }
   /* /OUTPUT */
  newItem:any = false
  todosLength:number
  userConnected:any;
  estadoBurbujas = "none"
  colorFondo = ""
  burbujasId = document.getElementById("burbujasId")
  containerBanner = document.getElementById("containerBanner")
  backgroundColorFondo:any;

  obtenerUser(){
    this.userConnected = this.us.obtenerUser()
    this.estadoBurbujas = this.userConnected.burbujas == false ? "none" : "block"
    this.colorFondo = this.userConnected.colorFondo
    this.backgroundColorFondo = 'linear-gradient('+this.colorFondo+',92%,white';
  }
}
