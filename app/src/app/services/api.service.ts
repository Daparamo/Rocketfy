import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor() { }

  getProducts(page: number = 1) {
    const limit = 5;
    return axios.get(environment.apiUrl + `/${limit}/${page}`);

  }

  addProduct(product: any) {

    return axios.post(environment.apiUrl, product);
  }

  updateProduct(id, product) {
    return axios.put(environment.apiUrl + `/${id}`, product);
  }

  deleteProduct(id) {
    return axios.delete(environment.apiUrl + `/${id}`);
  }
}
