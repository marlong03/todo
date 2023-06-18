export interface Todo{
    id:number,
    texto:string,
    estado:string,
    fechaFinal?:string
}
export interface TodoDTO{
    id?:number,
    texto?:string,
    estado?:string,
    fechaFinal?:string
}