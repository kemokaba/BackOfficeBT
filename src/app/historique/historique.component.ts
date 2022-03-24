import { Component, OnInit } from '@angular/core';
 
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { Transaction } from '../core/interfaces/transaction';
import { Chart, registerables } from 'chart.js';
import { RaisonModif } from '../core/interfaces/raisonModif';
import { Data } from '@angular/router';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  donneeHisto: Transaction[] = [];
  valeurA:number = 0
  valeurV:number = 0
  valeurI:number = 0
 
  
  saleData:Data [] = [];
  ARV: any = [];


  constructor(private productsService: ProductsService){}
  getDonneesHisto(){
    this.productsService.donneesHisto().subscribe((res : Transaction[]) => {
      this.donneeHisto = res;
      //console.log(this.donneeHisto)
       for (let donn of this.donneeHisto ) {
          //console.log(donn.typeT)
          if (donn.typeT == 'ajout'){
            this.valeurA = this.valeurA + donn.valeurT
             
            continue
          }
          if (donn.typeT == 'retrait-par-vente'){
            this.valeurV = this.valeurV + donn.valeurT
             
            continue
          }
          if (donn.typeT == 'retrait-par-invendus'){
            this.valeurI = this.valeurI + donn.valeurT
             
            continue
          }
       }
      this.saleData = [
        { name: 'ajout', value: this.valeurA },
        { name: 'vente', value: this.valeurV },
        { name: 'invendu', value: this.valeurI}
      ]
       
    },
    (err) => {
      alert('failed loading json data');
    });

   console.log(this.saleData)
  };
  
  ngOnInit(): void {
    this.getDonneesHisto()
    


    
    
  }
   

}
 

