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

  displayedDetailCol: string[] = ['name', 'price', 'price_on_sale', 'discount', 'quantity_stock', 'quantity_sold', 'comments'];

  constructor(private productsService: ProductsService) { }

  getProducts(){
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
<<<<<<< HEAD
      this.listeProduits.sort((a, b) => (a.id < b.id ? -1 : 1));
=======
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
>>>>>>> 4d091f5565b7ab953ba875dece6135fa613d1aac
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  triTableau(numCat: number){
    let tabTri = this.listeProduits.filter(produit => produit.category == numCat);
    return tabTri;
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
