import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl= "http://127.0.0.1:8000/infoproducts/"
  httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor( private http: HttpClient) { }

  getProductsFromJson(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl, { headers: this.httpHeaders });
  }
}
