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

  displayedColumns: string[] = ['name', 'détail'];

  tabs= ['Poissons', 'Détail']

  selected = new FormControl(0);

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
  
  allerVersDetail(idProd: number): void{
    this.selected.setValue(this.tabs.length-1);
    this.temp = this.listeProduits.filter(produit => produit.tig_id == idProd);
  }

  getProduit(){
    let leproduit = this.temp;
    return leproduit;
  }

  ifOnsale(){
    if(this.temp[0].sale){
      return true
    }
    return false
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
