import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { RaisonModif } from '../core/interfaces/raisonModif';

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

  selectedValue:string = ""

  valeurModif: RaisonModif[] = [
    {value: 'ajout', viewValue: 'Ajout'},
    {value: 'retrait-par-vente', viewValue: 'Vente'},
    {value: 'retrait-par-invendus', viewValue: 'Invendu'},
  ];

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
    this.nombre.length = 0
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
    this.nombre.length = 0
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
    this.promo.length = 0
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
