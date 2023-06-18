import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private cookieService:CookieService) { }
 
  /* OBSERVABLE */
  private obTodos = this.obtenerTodos()
  private obNuevaListaTodosBehavior = new BehaviorSubject<any>(this.obTodos)
  obNuevaListaTodoBehavior$ = this.obNuevaListaTodosBehavior.asObservable();
  cambiosEnListaTodos(){
    this.obTodos  = this.obtenerTodos()// a que sera igual a la nueva lista de todos
    this.obNuevaListaTodosBehavior.next(this.obTodos)
    
  }
  obtenerListaTodos(){
    return this.obTodos
  }
  /* OBSERVABLE */

  numeroTodosPendientes(){
    return this.obtenerListaTodos().filter( todo => todo.estado == 'pendiente').length
  }
  obtenerTodos(){
    let nuevalista = []
    let todos = this.cookieService.get('listaTodos')
    if(todos){
      let todosJson = JSON.parse(todos)
        if(todosJson.length > 0){
          for(let count:number = 0;count <= todosJson.length ;count++){
            
            
            todosJson[0].id = count
          }
          
          

          
            return todosJson
          }else{
          return todosJson
        }
    }else{
       this.cookieService.set('listaTodos',JSON.stringify([]))
    }
  }
  crearTodo(nuevoTodo:any){
    let listaTodos = this.obtenerTodos()
    nuevoTodo.id = listaTodos + 1
    listaTodos.unshift(nuevoTodo) 
    this.cookieService.set('listaTodos',JSON.stringify(listaTodos))
  }
  obtenerTodoId(id:number){
    let todo = this.obtenerTodos().filter(todo =>todo.id == id)
    return todo
  }
  actualizarTodo(idTodo:number, datosNuevosTodo:any){
    let obTodo = this.obtenerTodoId(idTodo)
    let todoReturn =  Object.assign(obTodo,datosNuevosTodo)
    this.crearTodo(todoReturn)
    let listaTodos = JSON.parse(this.cookieService.get('listaTodos'))
    this.cookieService.set('listaTodos',JSON.stringify(listaTodos))
  }
  actualizarTextoTodo(id:number,textoActualizar:string){
    let todoModificar = this.obtenerTodoId(id)
    todoModificar[0].texto = textoActualizar
    console.log(todoModificar);

    let todosLista = this.obtenerTodos().filter((todo:any)=>todo.id != id)
    todosLista.unshift(todoModificar[0])
    console.log(todosLista);
    this.actualizarListaTodos(todosLista)
  }
  actualizarListaTodos(lista:any){
    this.cookieService.set('listaTodos',JSON.stringify(lista))
  }
  borrarTodo(id:number){
    let listaTodos = this.obtenerTodos().filter(todo =>{
      if(todo.id != id){
        return todo
      }
    })
    this.actualizarListaTodos(listaTodos)
  }
}
