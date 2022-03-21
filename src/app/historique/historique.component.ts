import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';  
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
 
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  title = 'chart view'
  listeProduits: Product[] = [];

  produit: Product = {
    comments: '',
    category: 0,
    availability: false,
    id: 0,
    price: 0,
    discount: 0,
    sale: false,
    owner: '',
    unit: '',
    name: '',
    quantityInStock: 0,
    quantitySold: 0,
    percentage_reduc: 0,
    tig_id: 0
  }

  nomProd: any;
  prixProd: any;
  chart : any = [];
  
  constructor(private productsService: ProductsService) { Chart.register(...registerables) }

  
  ngOnInit(): void {
    //this.getProducts();
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
      this.nomProd = this.listeProduits.map((Product:any) => Product.name);
      this.prixProd = this.listeProduits.map((Product:any) => Product.price);

      console.log(this.nomProd)
      console.log(this.prixProd)
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
     this.chart = new Chart('canvas', {
       type : 'line',
       data: {
         labels: this.nomProd,
         datasets: [
           {
             data: this.prixProd,
             borderColor: '#3e95cd',
             fill: false,
             label: 'Nom prod',
             backgroundColor: 'rgba(93, 175,89, 0.1)',
             borderWidth: 3
           }
         ]

       }
     })
   
    
  }
  

   
   


}
 

