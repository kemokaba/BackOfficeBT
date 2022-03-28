import { Component, OnInit } from '@angular/core';
 
import { ProductsService } from '../core/services/product.service';
import { Transaction } from '../core/interfaces/transaction';
import { DataT } from '../core/interfaces/dataTransaction';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  donneeHisto: Transaction[] = [];

 
  
  saleData: DataT [] = [];
  selected: number = -1


  constructor(private productsService: ProductsService){}

  triTableau(numCat: number){
    if(numCat == -1){
      this.createSaleData(this.donneeHisto)
    }
    else {
      let tabTri = this.donneeHisto.filter(transa => transa.category == numCat);
      this.createSaleData(tabTri)
    }
  }

  getDonneesHisto(){
    this.productsService.donneesHisto().subscribe((res : Transaction[]) => {
      this.donneeHisto = res;
      //console.log(this.donneeHisto)
      this.createSaleData(this.donneeHisto)
       
    },
    (err) => {
      alert('failed loading json data');
    });

   console.log(this.saleData)
  };



  createSaleData(tab:Transaction[]){
      this.saleData.length = 0
      let valeurA:number = 0
      let valeurV:number = 0
      let valeurI:number = 0
      for (let donn of tab ) {
        //console.log(donn.typeT)
        if (donn.typeT == 'ajout'){
          valeurA = valeurA + donn.valeurT
          
          continue
        }
        if (donn.typeT == 'retrait-par-vente'){
          valeurV = valeurV + donn.valeurT
      
          continue
        }
        if (donn.typeT == 'retrait-par-invendus'){
          valeurI = valeurI + donn.valeurT
          
          continue
        }
    }
    this.saleData = [
      { name: 'Ajout en €', value: valeurA },
      { name: 'Vente en €', value: valeurV },
      { name: 'Perte en €', value: valeurI }
    ]
  }
  
  ngOnInit(): void {
    this.getDonneesHisto()
    
  }
   

}
 

