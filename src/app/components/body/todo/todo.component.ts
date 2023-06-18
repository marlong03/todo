import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/Todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  constructor(private us:UserService,private ts:TodoService){}
  
  ngOnInit(): void {
    this.us.obUserBehavior$.subscribe(user =>{
      this.userConnected = user
      this.userConnected = this.us.obtenerUser()
      document.getElementById("datetimelocal").style.border = '3px solid '+this.userConnected.colorFondo
      document.getElementById("btnGuardarTodo").style.border = '3px solid '+this.userConnected.colorFondo
      document.getElementById("btnAbrirSectionCrearTodo").style.border = '3px solid '+this.userConnected.colorFondo
    })
    this.ts.obNuevaListaTodoBehavior$.subscribe((todos:any) =>{
      if(this.listaTodosFiltro.length != 0){
        this.listaTodosCoinciden = this.listaTodosFiltro
      }else {
        this.listaBuscar = todos
        this.listaTodos = this.paginacion(this.todosPorPagina,this.paginacionPaginaMostrar,todos)
        this.listaTodosCoinciden = this.paginacion(this.todosPorPagina,this.paginacionPaginaMostrar,todos)
      
      }
    })
    if(this.listaTodos.length > 0 ){
      this.textHayAlgo = ""
    }else{
      this.textHayAlgo = "No hay notas en este momento"
    }
  
    console.log(new Date(Date.parse('2023-06-17T08:31:00.000Z')));
    console.log(new Date(Date.now()));
    let listaCaducados = this.listaBuscar
    listaCaducados.forEach((todo:any)=>{
      if(new Date(Date.parse(todo.fechaFinal)) < new Date(Date.now())){
      
        console.log("sirves");
        console.log(todo);
        todo.estado = 'caducado'
        todo.fechaFinal = '0000-00-00T00:00:00.000Z'
        this.ts.actualizarListaTodos(listaCaducados)
        this.ts.cambiosEnListaTodos()
        
      }else{
        
      }
      
      console.log(listaCaducados);
      
    })
  }
  /* VARIABLES - GLOBALES */
  @Output() newItemEvent = new EventEmitter<boolean>();
  changeNewItem(estado:boolean){
    this.newItemEvent.emit(estado)
  }
  tdsOb = []
  userConnected = this.us.obtenerObUser()
  listaTodos = this.ts.obtenerTodos() 
  
  textHayAlgo = ""
  todoContentText=""
  todoFecha = "No caduca"
  dateTimeLocal:any 
  fechaPipe:any  = ''
  checkedCaduca = true

  idTodoSeleccionado = 0
  estadoTodoSeleccionado = ""
  
  accionesTresPuntos = false
  idSeleccionado = 0

  palabraBuscar = ""
  listaBuscar = []
  
  paginacionPaginaMostrar:number = 1
  todosPorPagina = 3
  listaTodosCoinciden:any 
  listaPaginacionMaxima = []
  paginacionMaximaGlobal = 1
  estadoCrearTodo = false

  estadoModificarTodo = false
  idTodoVerMasModificar = 0
  textContentModificarTodo = ''
  textoTodoNoModificado = ''

  mostrarSeccionFiltros = false
  palabraFiltro = ''
  opcionPalabraFiltro = ''
  listaTodosFiltro = []
  listaFiltros = []
  /* /VARIABLES - GLOBALES */

  /* TODO - CREAR */
  accionarSectionCrearTodo(){
    this.changeNewItem(!this.estadoCrearTodo)
    let containerTodo = document.querySelector('.container__todo')
    let sectionCrearTodo = document.getElementById('sectionCrearTodo')  
    let todosContainer = document.getElementById('todosContainer')
    let optionsCrearTodo = document.getElementById('optionsCrearTodo')
    let optionsIndexTodos = document.getElementById('optionsIndexTodos')
    containerTodo.classList.toggle('trasladarAbajo')
    if(sectionCrearTodo.style.display == "block"){
      todosContainer.style.display = "block"
      optionsIndexTodos.style.display = "flex" 
      sectionCrearTodo.style.display = "none" 
      optionsCrearTodo.style.display = "none" 
      this.estadoCrearTodo = false
      
    }else{
      todosContainer.style.display = "none"
      optionsIndexTodos.style.display = "none" 
      sectionCrearTodo.style.display = "block" 
      optionsCrearTodo.style.display = "flex" 
      this.estadoCrearTodo = true

    }
    setTimeout(() => {
      containerTodo.classList.toggle('trasladarAbajo')
    }, 300);
    
  }
  
  accionarSectionModificarTodo(id:any){
    this.changeNewItem(!this.estadoModificarTodo)
    let containerTodo = document.querySelector('.container__todo')
    let sectionModificarTodo = document.getElementById('sectionModificarTodo')  
    let todosContainer = document.getElementById('todosContainer')
    let optionsModificarTodo = document.getElementById('optionsModificarTodo')
    let inputSearchTop = document.getElementById('inputSearchTop')
    let optionsIndexTodos = document.getElementById('optionsIndexTodos')

    if(id != 0){
      this.idTodoVerMasModificar = id
      let todoText = this.ts.obtenerTodoId(id)[0].texto
      this.textContentModificarTodo = todoText
      this.textoTodoNoModificado = todoText
    }
    containerTodo.classList.toggle('trasladarAbajo')
    if(sectionModificarTodo.style.display == "block"){
      todosContainer.style.display = "block"
      optionsIndexTodos.style.display = "flex" 
      sectionModificarTodo.style.display = "none" 
      optionsModificarTodo.style.display = "none" 
      inputSearchTop.style.display = "block"
      this.accionesTresPuntos = false
      this.idSeleccionado = 0
      this.estadoModificarTodo = false
    
    }else{
      todosContainer.style.display = "none"
      optionsIndexTodos.style.display = "none" 
      sectionModificarTodo.style.display = "block" 
      optionsModificarTodo.style.display = "flex" 
      inputSearchTop.style.display = "none"
      this.estadoModificarTodo = true
    }
    setTimeout(() => {
      containerTodo.classList.toggle('trasladarAbajo')
    }, 300);
  }
  crearTodo(){
    let nuevoTodo = {
      id:0,
      texto:this.todoContentText,
      estado:'pendiente',
      fechaFinal:this.todoFecha == "No caduca" ? '0000-00-00000:00:00.000Z' : this.fechaPipe
    } 
   
      this.ts.crearTodo(nuevoTodo);
      this.ts.cambiosEnListaTodos()
      this.accionarSectionCrearTodo()
      this.quitarFiltros()
      this.todoContentText=""
      this.paginacionPaginaMostrar = 1
  }
  fechaCaducaChecked(){
    if(this.checkedCaduca == false){
      this.checkedCaduca = true
      this.todoFecha = "No caduca"
      this.fechaPipe = ''
    }else if(this.checkedCaduca == true ){
      this.checkedCaduca = false
      this.todoFecha = ""
    }
  }
  obtenerFecha(){
    this.fechaPipe = new Date(Date.parse(this.dateTimeLocal)) 
    console.log(this.fechaPipe);
 
    
    
    this.fechaCaducaChecked()
  }
  cancelarTodo(){
    this.fechaPipe = ''
    this.checkedCaduca = true
    this.todoFecha = "No caduca"
  }
  /* /TODO - CREAR */

  /* DASHBOARD -TODOS */
  cambiarAccionesTresPuntos(e:any){
    this.idSeleccionado = parseInt(e.target.id)
    this.accionesTresPuntos = !this.accionesTresPuntos
    if(this.accionesTresPuntos == false){
      this.idSeleccionado = 0
    }
  }
  borrarTodo(e:any){
    let idTodo = e.target.id
    this.ts.borrarTodo(idTodo)
    this.accionesTresPuntos = false
    this.idSeleccionado = 0
    this.ts.cambiosEnListaTodos()
  }
  actualizarTextTodo(){
    this.ts.actualizarTextoTodo(this.idTodoVerMasModificar,this.textContentModificarTodo)
    this.ts.cambiosEnListaTodos()
    this.accionarSectionModificarTodo(0)
    this.quitarFiltros()
  }
  textDecoration(todo:Todo){
      if(todo.estado == 'realizado'){
        return '#113b00'
      }else if(todo.estado == 'pendiente'){
        return '#523800'
      }
      else if(todo.estado == 'cancelado'){
        return '#680000'
      }
      else if(todo.estado == 'caducado'){
        return '#680000'
      }else{
        return 'gray'
      }
  }
  cambiarEstadoTodo(e:any){
    this.idTodoSeleccionado = parseInt(e.target.id)
    this.estadoTodoSeleccionado = e.target.value

    let listaTodos = this.ts.obtenerTodos()
    if(listaTodos.length > 0){
      listaTodos.forEach((todo:Todo)=>{
        if(todo.id == this.idTodoSeleccionado){
          todo.estado = this.estadoTodoSeleccionado
        }
      })
    }else{ return }
    this.ts.actualizarListaTodos(listaTodos)
    this.ts.cambiosEnListaTodos()
  }
  buscarTodosPorPalabras(){
  this.listaTodosCoinciden = []
    this.listaBuscar.forEach((todo:Todo) => {
      
      if(todo.texto.toLowerCase().includes(this.palabraBuscar.toLowerCase()) == true){
          this.listaTodosCoinciden.push(todo)
      }
      if(this.listaTodosCoinciden.length == 0){
        this.textHayAlgo = "No hay notas en este momento"
      }else{
        this.textHayAlgo = ""
      }
    });
  }
  mostrarFiltros(){
    this.mostrarSeccionFiltros = !this.mostrarSeccionFiltros
  }
  filtrarPor(filtro:any){
    if(filtro == 'alfabeto'){
      this.listaFiltros = ['A - Z','Z - A']
    }else if(filtro == 'estado'){
      this.listaFiltros = ['Pendiente','Realizado','Cancelado','Caducado']
    }else if(filtro == 'fecha'){
      this.listaFiltros = ['Mas antiguo','Mas nuevo','No caduca']
    }
  }
  filtrarTodos(){
    if(this.palabraFiltro == 'alfabeto'){
      if(this.opcionPalabraFiltro == 'A - Z'){
        this.listaTodosFiltro = this.listaBuscar.sort((a,b)=>a.texto.localeCompare(b.texto))
        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
      else if(this.opcionPalabraFiltro == 'Z - A'){
        this.listaTodosFiltro = this.listaBuscar.sort((a,b)=>a.texto.localeCompare(b.texto)).reverse()
        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
    }
    else if(this.palabraFiltro == 'estado'){
      this.mostrarFiltros()
      if(this.opcionPalabraFiltro == 'Pendiente'){
        
        this.listaTodosFiltro = this.listaBuscar
        .filter((todo:any) => todo.estado == 'pendiente')

        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
      else if(this.opcionPalabraFiltro == 'Realizado'){

        this.listaTodosFiltro = this.listaBuscar
        .filter((todo:any) => todo.estado == 'realizado')
       
        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
      else if(this.opcionPalabraFiltro == 'Cancelado'){

        this.listaTodosFiltro = this.listaBuscar
        .filter((todo:any) => todo.estado == 'cancelado')

        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
      else if(this.opcionPalabraFiltro == 'Caducado'){

        this.listaTodosFiltro = this.listaBuscar
        .filter((todo:any) => todo.estado == 'caducado')

        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
    }
    else if(this.palabraFiltro == 'fecha'){
      if(this.opcionPalabraFiltro == 'Mas antiguo'){
        this.listaTodosFiltro = this.listaBuscar.sort((a,b)=>b.fechaFinal.localeCompare(a.fechaFinal))
        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
      else if(this.opcionPalabraFiltro == 'Mas nuevo'){
        this.listaTodosFiltro = this.listaBuscar.sort((a,b)=>a.fechaFinal.localeCompare(b.fechaFinal))
        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
      else if(this.opcionPalabraFiltro == 'No caduca'){
        this.listaTodosFiltro = this.listaBuscar
        .filter((todo)=> todo.fechaFinal == '0000-00-00000:00:00.000Z')
        this.listaTodosCoinciden = this.listaTodosFiltro
        this.ts.cambiosEnListaTodos()
      }
    }
  }
  quitarFiltros(){
    this.listaTodosFiltro = []
    this.ts.cambiosEnListaTodos()
    this.paginacionPaginaMostrar = 1
  }
  obtenerPalabrasFiltro(evento:any){
    let opcion = evento.srcElement.defaultValue
    if(opcion == 'estado' || opcion == 'fecha' || opcion == 'alfabeto' ){
      this.palabraFiltro = opcion
    }else{
      this.opcionPalabraFiltro = opcion
      this.filtrarTodos() 
      this.ts.cambiosEnListaTodos()
    }
  }
  paginacion(cuantos:number,pagina:number,todos){
    this.listaPaginacionMaxima = []
    let objs = todos
    let empezamosEn = cuantos * (pagina - 1)
    let terminamosEn = cuantos * pagina 
    let rta = objs.slice(empezamosEn,terminamosEn)
    let paginacionMaxima = Math.ceil(objs.length / cuantos)
    this.paginacionMaximaGlobal = paginacionMaxima
  
    if(paginacionMaxima == 1){
      this.listaPaginacionMaxima = [1,2]
    }
    if(this.paginacionPaginaMostrar <= 3 && paginacionMaxima <= 3 ){
      if(paginacionMaxima == 2  ){
        this.listaPaginacionMaxima = [1,2]
      }else if(paginacionMaxima == 3){
        this.listaPaginacionMaxima = [1,2,3]
      }
    }else{
      if((this.paginacionPaginaMostrar ) <= paginacionMaxima && this.paginacionPaginaMostrar != 0 ){
      let unoMenos = this.paginacionPaginaMostrar - 1
      let unoMas = this.paginacionPaginaMostrar + 1
        this.listaPaginacionMaxima = [unoMenos,this.paginacionPaginaMostrar, unoMas]
      }else{
        this.listaPaginacionMaxima = [this.paginacionPaginaMostrar -2 ,this.paginacionPaginaMostrar - 1, this.paginacionPaginaMostrar]
      }
      if(this.listaPaginacionMaxima[0] == 0){
        this.listaPaginacionMaxima = [1,2]
      }
    }
    return rta
  }
  escogerPagina(e:any){
    let paginaNumero = e.srcElement.childNodes[0].data
    this.paginacionPaginaMostrar = parseInt(paginaNumero)
    this.ts.cambiosEnListaTodos()
  }
  /* /DASHBOARD -TODOS */
}
