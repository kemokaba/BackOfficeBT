import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

<<<<<<< HEAD
  baseUrl= "http://127.0.0.1:8000/infoproducts/"
  httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor( private http: HttpClient) { }
=======
  baseUrl= "http://127.0.0.1:8000/";
  httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json'})
>>>>>>> 4d091f5565b7ab953ba875dece6135fa613d1aac

  constructor( private http: HttpClient) { }
  //il faudra ajouter withCredentials: true
  getProductsFromJson(): Observable<Product[]>{
<<<<<<< HEAD
    return this.http.get<Product[]>(this.baseUrl, { headers: this.httpHeaders });
=======
    return this.http.get<Product[]>(this.baseUrl+'infoproducts/', { headers: this.httpHeaders });
  }

  incrementStock(id: number, value:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl+'incrementStock/'+id+'/'+value+'/', { headers: this.httpHeaders });
  }

  decrementStock(id:number, value:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl+'decrementStock/'+id+'/'+value+'/', { headers: this.httpHeaders });
  }

  putOnSale(id:number, value:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl+'putonsale/'+id+'/'+value+'/', { headers: this.httpHeaders });
  }

  removeSale(id:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl+'removesale/'+id+'/', { headers: this.httpHeaders });
>>>>>>> 4d091f5565b7ab953ba875dece6135fa613d1aac
  }
}
