import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';  
import { ProductsService } from '../core/services/product.service';
 
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

   
   


}
