import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl= "https://16fcwr67g9.execute-api.eu-west-3.amazonaws.com/backend_BT_YMK/";
  httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor( private http: HttpClient) { }
  //il faudra ajouter withCredentials: true
  getProductsFromJson(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'infoproducts/', { headers: this.httpHeaders });
  }

  incrementStock(id: number, value:number): Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'infoproduct/'+id+'/',{ quantityInStock: value }, { headers: this.httpHeaders });
  }

  decrementForVente(id:number, value:number, quantitévendu:number): Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'infoproduct/'+id+'/', { quantityInStock:value, quantitySold:quantitévendu }, { headers: this.httpHeaders });
  }
  decrementStock(id:number, value:number): Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'infoproduct/'+id+'/',{ quantityInStock: value }, { headers: this.httpHeaders });
  }

  putOnSale(id:number, sale:boolean, discount:number, pourcentage:number): Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'infoproduct/'+id+'/', { sale:sale, discount: discount, percentage_reduc: pourcentage } , { headers: this.httpHeaders });
  }

  removeSale(id:number): Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'infoproduct/'+id+'/', { sale:false }, { headers: this.httpHeaders });
  }

  incrementForStock(id:number, value:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'incrementForStock/'+id+'/'+value+'/', { headers: this.httpHeaders });
  }

  decrementForStock(id:number, value:number, vente:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'decrementForStock/'+id+'/'+value+'/'+vente+'/', { headers: this.httpHeaders });
  }

  putonsaleForStock(id:number, value:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'putonsaleForStock/'+id+'/'+value+'/', { headers: this.httpHeaders })
  }

  removeSaleForStock(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'removesaleForStock/'+id+'/', { headers: this.httpHeaders })
  }

  addTransaction(type:string, prix:number, nom:string, quantité:number, category:number, id:number): Observable<Transaction>{
    return this.http.post<Transaction>(this.baseUrl+'donneesHisto/', { nameProd: nom, category: category, quantityT:quantité,typeT: type, valeurT:prix  } , { headers: this.httpHeaders })
  }

  donneesHisto(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.baseUrl+'donneesHisto/', { headers: this.httpHeaders });
  }

}
