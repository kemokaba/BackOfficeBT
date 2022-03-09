import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient) { }

  getProductsFromJson(): Observable<Product[]>{
    return this.http.get<Product[]>("../assets/data/products.json");
  }
}
