export interface Product {
    _id:string,
    name:string,
    description:string,
    sku:string,
    image:[],
    tags:[],
    price:number,
    discount:number,
    stock:number,
    fechaCreacion:string,
    fechaModificacion:string;
}