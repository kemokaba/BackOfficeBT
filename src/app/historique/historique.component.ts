import { Component, OnInit } from '@angular/core';
 
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { Transaction} from '../core/interfaces/transaction';
import {Categorie} from '../core/interfaces/categorie'
 
import { Data } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  listeProduits: Product[] = [];
  donneeHisto: Transaction[] = [];
  valeurA:number = 0
  valeurV:number = 0
  valeurI:number = 0
  saleData:Data [] = [];
 

  selectCat: Categorie[] = [

    {nameCat:'Poissons', valCat: 0},
    {nameCat: 'Coquillages', valCat: 1},
    {nameCat: 'Crustaces', valCat: 2},

  ];
  selectedValue: string= "";

  
  triTableau(numCat: number){
    let tabTri = this.donneeHisto.filter(produit => produit.category == numCat);
    return tabTri;
     
    
  }

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
 

