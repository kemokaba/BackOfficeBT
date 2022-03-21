import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  listeProduits: Product[] = [];

  displayedDetailCol: string[] = ['name', 'price', 'price_on_sale', 'discount', 'quantity_stock', 'quantity_sold', 'comments', 'input', 'input2'];

  nombre: number[] = []

  promo: number [] = []

  constructor(private productsService: ProductsService) { }

  getProducts(){
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
      
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  triTableau(numCat: number){
    let tabTri = this.listeProduits.filter(produit => produit.category == numCat);
    return tabTri;
  }

  ajoutStock(id:number,num:number){
    this.productsService.incrementForStock(id,num).subscribe((res : Product[]) => {
      this.listeProduits = res
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
    
    this.nombre[id] = 0;
  }

  reduireStock(id:number,num:number){
    this.productsService.decrementForStock(id,num).subscribe((res : Product[]) => {
      this.listeProduits = res
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
    
    this.nombre[id] = 0;
  }

  modifPromo(id:number,num:number){
    this.productsService.putonsaleForStock(id,num).subscribe((res : Product[]) => {
      this.listeProduits = res
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
    
    this.promo[id] = 0;
  }

  removePromo(id:number){
    this.productsService.removeSaleForStock(id).subscribe((res : Product[]) => {
      this.listeProduits = res
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
    
  }

  incrementAll(tab:number[]){
    for (let key in tab){
      this.productsService.incrementForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
        this.listeProduits = res
        this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
      },
      (err) => {
        alert('failed loading json data');
      });
    }
  }

  decrementAll(tab:number[]){
    for (let key in tab){
      this.productsService.decrementForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
        this.listeProduits = res
        this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
      },
      (err) => {
        alert('failed loading json data');
      });
    }
  }

  putonsaleAll(tab:number[]){
    for (let key in tab){
      this.productsService.putonsaleForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
        this.listeProduits = res
        this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
      },
      (err) => {
        alert('failed loading json data');
      });
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
