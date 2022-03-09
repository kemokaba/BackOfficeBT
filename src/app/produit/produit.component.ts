import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  listeProduits: Product[] = [];

  displayedColumns: string[] = ['no.', 'name', 'comment', 'price'];

  constructor(public productsService: ProductsService) { }

  getProducts(){
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
      this.listeProduits.sort((a, b) => (a.id < b.id ? -1 : 1));
      console.log(this.getProduit(1))
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  getProduit(id: number){
    for(let produit of this.listeProduits){
      if(produit.id == id)
      return produit
    }
    return null
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
