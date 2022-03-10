import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  listeProduits: Product[] = [];

  temp: Product[] = [];

  displayedColumns: string[] = ['no.', 'name', 'comment', 'price', 'détail'];

  tabs= ['Poissons', 'Coquillages', 'Crustaces', 'Détail']

  selected = new FormControl(0);

  constructor(private productsService: ProductsService) { }

  getProducts(){
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
      this.listeProduits.sort((a, b) => (a.id < b.id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  triTableau(numCat: number){
    let tabTri = this.listeProduits.filter(produit => produit.category == numCat);
    return tabTri;
  }

  allerVersDetail(idProd: number){
    this.selected.setValue(this.tabs.length-1);
    this.temp = this.listeProduits.filter(produit => produit.id == idProd);
  }

  getProduit(){
    let leproduit = this.temp;
    return leproduit;
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
