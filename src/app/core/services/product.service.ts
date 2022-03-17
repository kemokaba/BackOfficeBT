import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl= "http://127.0.0.1:8000/";
  httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor( private http: HttpClient) { }
  //il faudra ajouter withCredentials: true
  getProductsFromJson(): Observable<Product[]>{
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
  }

  incrementForStock(id:number, value:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'incrementForStock/'+id+'/'+value+'/', { headers: this.httpHeaders });
  }

  decrementForStock(id:number, value:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'decrementForStock/'+id+'/'+value+'/', { headers: this.httpHeaders });
  }

  putonsaleForStock(id:number, value:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'putonsaleForStock/'+id+'/'+value+'/', { headers: this.httpHeaders })
  }

  removeSaleForStock(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'removesaleForStock/'+id+'/', { headers: this.httpHeaders })
  }
}
